/* ===========================
   UNIVERSIDADES - JS ROBUSTO
   - Modal (inyectado)
   - Validación modal
   - Auto-detector de data-*
   - Filtros: región / tipo / presupuesto (con mapeo)
   - Contador de resultados (si existe element)
   =========================== */

try { lucide.createIcons(); } catch(e){ /* no crítico */ }

/* -------------------
   Modal inyectado
   ------------------- */
const modalCode = `
<div id="alertaDecorada" class="alert-overlay" style="display:none">
  <div class="alert-box">
    <h3 class="alert-title">Validar Formulario</h3>
    <p class="alert-text">¿Deseas validar el formulario antes de continuar?</p>
    <div class="alert-buttons">
      <button id="btnSi" class="alert-btn-primary">Sí, validar</button>
      <button id="btnNo" class="alert-btn-secondary">No, continuar</button>
    </div>
  </div>
</div>
<style>
/* (estilos resumidos para evitar duplicar demasiado) */
.alert-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center;z-index:20000}
.alert-box{background:#fff;width:90%;max-width:360px;padding:20px;border-radius:12px;text-align:center;box-shadow:0 8px 25px rgba(0,0,0,.18);border:2px solid #4f46e5}
.alert-title{color:#4f46e5;font-weight:700;margin-bottom:6px}
.alert-text{color:#444;margin-bottom:14px}
.alert-buttons{display:flex;flex-direction:column;gap:8px}
.alert-btn-primary,.alert-btn-secondary{padding:10px;border-radius:8px;color:#fff;border:0;cursor:pointer}
.alert-btn-primary{background:#4f46e5} .alert-btn-secondary{background:#06b6d4}
.error-msg{color:#e11d48;margin-top:6px;font-size:13px}
</style>
`;
document.body.insertAdjacentHTML("beforeend", modalCode);

/* -------------------
   Helper seguro para añadir evento si existe elemento
   ------------------- */
function onIfExists(selector, event, fn, parent = document) {
  const el = parent.querySelector(selector);
  if (el) el.addEventListener(event, fn);
  return el;
}

/* -------------------
   DOM ready: todo dentro para evitar race conditions
   ------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // ---------- modal / validación ----------
  const generateBtn = document.querySelector(".btn-generate");
  const modalEl = document.getElementById("alertaDecorada");
  const inputTitulo = document.querySelector(".form-input");

  if (generateBtn && modalEl) {
    generateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modalEl.style.display = "flex";
    });

    onIfExists("#btnSi", "click", () => {
      // si no hay inputTitulo no hacemos validación y seguimos
      if (inputTitulo && inputTitulo.value.trim() === "") {
        // mostrar error simple
        let err = modalEl.querySelector(".error-msg");
        if (!err && inputTitulo) {
          inputTitulo.insertAdjacentHTML("afterend", `<p class="error-msg">Debes completar el título del reporte.</p>`);
        } else if (err) {
          err.textContent = "Debes completar el título del reporte.";
        }
        modalEl.style.display = "none";
        return;
      }
      window.location.href = "vista-previa-reporte.html";
    });

    onIfExists("#btnNo", "click", () => {
      window.location.href = "vista-previa-reporte.html";
    });
  } else {
    // no hay btn-generate o modal (no crítico)
    // console.warn("generateBtn o modal no encontrados (opcional)");
  }

  // ---------- AUTO-DETECT: añadir data-* si faltan ----------
  const cardsNodeList = document.querySelectorAll(".university-card");
  const cards = Array.from(cardsNodeList);

  cards.forEach(card => {
    const texto = (card.innerText || "").toLowerCase();

    // tipo (privada / publica)
    if (!card.dataset.tipo) {
      if (texto.includes("privada")) card.dataset.tipo = "privada";
      else if (texto.includes("pública") || texto.includes("publica") || texto.includes("nacional")) card.dataset.tipo = "publica";
    }

    // region (busca después de palabras comunes)
    if (!card.dataset.region) {
      const m = texto.match(/(región|region|ubicación|ubicacion|ciudad|lugar|ubicado en)\s*[:\-]?\s*([a-záéíóúñ0-9\s]+)/i);
      if (m && m[2]) {
        card.dataset.region = m[2].trim().toLowerCase();
      } else {
        // fallback: buscar nombres de ciudades comunes en el texto
        ["lima","arequipa","trujillo","piura","cusco","ica","chiclayo","huancayo","ayacucho"].some(c => {
          if (texto.includes(c)) { card.dataset.region = c; return true; }
        });
      }
    }

    // presupuesto: si ya hay texto tipo "$700/mes" o "s/700" -> convertir a categorias bajo/medio/alto
    if (!card.dataset.presupuesto) {
      // buscar S/ o $ seguido de número
      const m2 = texto.match(/s\/\.?\s*([0-9]{2,6})|([$]\s*([0-9]{2,6}))/i);
      if (m2) {
        const num = parseInt(m2[1] || m2[3]);
        if (!isNaN(num)) {
          // regla simple: <500 -> bajo, 500-800 -> medio, >800 -> alto (ajustable)
          let cat = "medio";
          if (num < 500) cat = "bajo";
          else if (num >= 800) cat = "alto";
          else cat = "medio";
          card.dataset.presupuesto = cat;
        }
      } else {
        // si no hay número, intentar detectar palabras "bajo", "medio", "alto"
        if (texto.includes("bajo")) card.dataset.presupuesto = "bajo";
        else if (texto.includes("medio")) card.dataset.presupuesto = "medio";
        else if (texto.includes("alto")) card.dataset.presupuesto = "alto";
      }
    }
  });

  // ---------- FILTROS ----------
  const regionSelect = document.getElementById("region-select");
  const tipoSelect = document.getElementById("type-select");
  const presupuestoSelect = document.getElementById("budget-select");
  const resultadosFiltradosSpan = document.getElementById("resultados-filtrados"); // opcional

  // si no existen los selects, no hacemos nada para evitar errores
  if (!regionSelect || !tipoSelect || !presupuestoSelect) {
    console.warn("Filtros no inicializados: revisa IDs region-select / type-select / budget-select");
    return;
  }

  // Helper para comprobar presupuesto: mapea rangos a categorias
  function presupuestoCoincide(selectValue, cardValue) {
    if (!selectValue || selectValue === "") return true; // no filtrar
    if (!cardValue) return false;

    const s = selectValue.trim();
    const c = cardValue.trim().toLowerCase();

    // casuística: si card ya tiene "bajo/medio/alto"
    if (["bajo","medio","alto"].includes(c)) {
      if (s === "0-500") return c === "bajo";
      if (s === "500-1000") return c === "medio";
      if (s === "1000") return c === "alto";
      // si el select usa los mismos nombres:
      return s === c;
    }

    // si cardValue es numérico
    const num = parseInt(c.replace(/\D/g,""), 10);
    if (!isNaN(num)) {
      if (s === "0-500") return num <= 500;
      if (s === "500-1000") return num > 500 && num <= 1000;
      if (s === "1000") return num > 1000;
    }

    // fallback: comparar igualdad
    return s === c;
  }

  function filtrar() {
    const region = (regionSelect.value || "").trim().toLowerCase();
    const tipo = (tipoSelect.value || "").trim().toLowerCase();
    const presupuesto = (presupuestoSelect.value || "").trim().toLowerCase();

    let contador = 0;

    cards.forEach(card => {
      const cardRegion = (card.dataset.region || "").trim().toLowerCase();
      const cardTipo = (card.dataset.tipo || "").trim().toLowerCase();
      const cardPresupuesto = (card.dataset.presupuesto || "").trim().toLowerCase();

      const coincideRegion = !region || region === cardRegion;
      const coincideTipo = !tipo || tipo === cardTipo;
      const coincidePresupuesto = presupuestoCoincide(presupuesto, cardPresupuesto);

      if (coincideRegion && coincideTipo && coincidePresupuesto) {
        card.style.display = ""; // mostrar según CSS
        contador++;
      } else {
        card.style.display = "none";
      }
    });

    if (resultadosFiltradosSpan) resultadosFiltradosSpan.textContent = contador;
  }

  // listeners
  regionSelect.addEventListener("change", filtrar);
  tipoSelect.addEventListener("change", filtrar);
  presupuestoSelect.addEventListener("change", filtrar);

  // init
  filtrar();

}); // DOMContentLoaded end
