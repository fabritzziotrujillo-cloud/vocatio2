
    lucide.createIcons();
 
// ======================================================
// EFECTO SUAVE EN TARJETAS DE HERRAMIENTAS DE EXPLORACIÓN
// ======================================================
document.querySelectorAll(".tool-explore-card").forEach(card => {
  card.style.transition = "transform .25s ease, box-shadow .25s ease";
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px)";
    card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
  });
});

// ======================================================
// EFECTO DESTACAR TARJETAS DE COMPATIBILIDAD (#1, #2, #3)
// ======================================================
document.querySelectorAll(".compatibility-card").forEach(card => {
  card.style.transition = "transform .25s ease, box-shadow .25s ease";

  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.04)";
    card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "none";
  });
});

// ======================================================
// MODAL MINIMALISTA PARA “Herramientas de Exploración”
// (Cuando haces clic en cualquier card)
// ======================================================

// Insertamos modal al final del body sin tocar tu HTML
const modalHTML = `
  <div id="exploreModal" style="
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  ">
    <div style="
      background: #fff;
      width: 340px;
      padding: 24px;
      border-radius: 16px;
      text-align: center;
      animation: modalIn .25s ease;
      font-family: inherit;
      box-shadow: 0 10px 28px rgba(0,0,0,0.22);
    ">

      <h3 style="font-size: 20px; margin-bottom: 8px; color:#333;">
        ¿Quieres abrir esta herramienta?
      </h3>

      <p id="modal-tool-name" style="
        margin-bottom: 20px;
        font-size: 15px;
        color:#666;
      ">
        <!-- JS coloca aquí el nombre -->
      </p>

      <div style="display:flex; gap:10px; justify-content:center;">
        <button id="modalCancel" style="
          flex:1;
          padding: 10px 0;
          border: none;
          background: #eaeaea;
          border-radius: 8px;
          cursor:pointer;
          font-size:15px;
        ">Cancelar</button>

        <button id="modalOpen" style="
          flex:1;
          padding: 10px 0;
          border: none;
          background: #2563eb;
          color:white;
          border-radius: 8px;
          cursor:pointer;
          font-size:15px;
        ">Abrir</button>
      </div>
    </div>

    <style>
      @keyframes modalIn {
        from { opacity:0; transform: scale(.92); }
        to   { opacity:1; transform: scale(1); }
      }
    </style>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

const exploreModal = document.getElementById("exploreModal");
const modalCancel = document.getElementById("modalCancel");
const modalOpen   = document.getElementById("modalOpen");
const modalTitle  = document.getElementById("modal-tool-name");

let targetURL = "";

// Abre modal al hacer clic en cualquier card de herramientas
document.querySelectorAll(".tool-explore-card").forEach(card => {
  const link = card.querySelector(".tool-explore-link");

  card.addEventListener("click", (e) => {
    e.preventDefault(); // evita abrir directamente

    modalTitle.textContent = card.querySelector(".tool-explore-title").textContent;
    targetURL = link.getAttribute("href");

    exploreModal.style.display = "flex";
  });
});

// Cerrar modal
modalCancel.addEventListener("click", () => {
  exploreModal.style.display = "none";
});

// Abrir enlace
modalOpen.addEventListener("click", () => {
  window.location.href = targetURL;
});
