
    lucide.createIcons();

// ================================
//  MODAL BONITO SIN MODIFICAR TU HTML
// ================================

// Inyectamos el modal (NO toca tu estructura HTML)
const modalCode = `
<div id="alertaDecorada" class="alert-overlay">
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
/* Fondo oscuro */
.alert-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 20000;
}

/* Caja principal */
.alert-box {
  background: #fff;
  width: 90%;
  max-width: 360px;
  padding: 25px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.18);
  animation: fadeIn .25s ease;
  border: 2px solid #4f46e5;
}

/* Animación */
@keyframes fadeIn {
  from { transform: scale(.85); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* Título */
.alert-title {
  color: #4f46e5;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 700;
}

/* Texto */
.alert-text {
  color: #444;
  font-size: 15px;
  margin-bottom: 20px;
}

/* Botones */
.alert-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert-btn-primary {
  background: #4f46e5;
  border: none;
  padding: 12px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

.alert-btn-secondary {
  background: #06b6d4;
  border: none;
  padding: 12px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

/* Error rojo debajo del input */
.error-msg {
  color: #e11d48;
  margin-top: 5px;
  font-size: 13px;
  font-weight: 600;
}
</style>
`;

document.body.insertAdjacentHTML("beforeend", modalCode);

// Detectamos el botón sin modificar tu HTML
const generateBtn = document.querySelector(".btn-generate");
const modal = document.querySelector("#alertaDecorada");
const inputTitulo = document.querySelector(".form-input");

// Abrir modal
generateBtn.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "flex";
});

// Botones modal
document.querySelector("#btnSi").addEventListener("click", () => {
  if (inputTitulo.value.trim() === "") {
    mostrarError("Debes completar el título del reporte.");
    modal.style.display = "none";
  } else {
    window.location.href = "vista-previa-reporte.html";
  }
});

document.querySelector("#btnNo").addEventListener("click", () => {
  window.location.href = "vista-previa-reporte.html";
});

// Mostrar error debajo del input sin tocar HTML
function mostrarError(msg) {
  let error = document.querySelector(".error-msg");
  if (!error) {
    inputTitulo.insertAdjacentHTML("afterend", `<p class="error-msg">${msg}</p>`);
  } else {
    error.textContent = msg;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // IDs que sí tienes en el HTML
  const regionSelect = document.getElementById("region-select");
  const tipoSelect = document.getElementById("type-select");
  const presupuestoSelect = document.getElementById("budget-select");

  // seguridad: si alguno falta, no seguir para no fallar
  if (!regionSelect || !tipoSelect || !presupuestoSelect) return;

  const universidades = Array.from(document.querySelectorAll(".university-card"));

  function filtrar() {
    const region = regionSelect.value.trim();        // "" cuando está "Seleccione"
    const tipo = tipoSelect.value.trim();            // ""
    const presupuesto = presupuestoSelect.value.trim(); // ""

    universidades.forEach(card => {
      const cardRegion = (card.dataset.region || "").toString().trim();
      const cardTipo = (card.dataset.tipo || "").toString().trim();
      const cardPresupuesto = (card.dataset.presupuesto || "").toString().trim();

      // Si el select está vacío -> no filtrar por ese campo
      const coincideRegion = !region || region === cardRegion;
      const coincideTipo = !tipo || tipo === cardTipo;
      const coincidePresupuesto = !presupuesto || presupuesto === cardPresupuesto;

      if (coincideRegion && coincideTipo && coincidePresupuesto) {
        // restaurar comportamiento por defecto definido en CSS
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // aplicar filtro inicial (por si hay valores / cache)
  filtrar();

  regionSelect.addEventListener("change", filtrar);
  tipoSelect.addEventListener("change", filtrar);
  presupuestoSelect.addEventListener("change", filtrar);
});
