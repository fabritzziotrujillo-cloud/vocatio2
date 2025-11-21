
    lucide.createIcons();


// =========================
//   Crear Modal Dinámico
// =========================
const modalHTML = `
  <div id="customModal" style="
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  ">
    <div style="
      background: #fff;
      padding: 25px;
      width: 350px;
      border-radius: 14px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      animation: fadeIn 0.25s ease;
      text-align: center;
      font-family: inherit;
    ">
      <h3 style="margin-bottom: 10px; font-size: 20px; color:#222;">
        Confirmar eliminación
      </h3>

      <p style="margin-bottom: 20px; font-size: 15px; color:#555;">
        ¿Estás seguro que deseas eliminar esta lista?
      </p>

      <div style="display: flex; justify-content: space-between;">
        <button id="cancelModal" style="
          flex: 1;
          margin-right: 8px;
          padding: 10px 0;
          border-radius: 8px;
          background: #e3e3e3;
          border: none;
          font-size: 15px;
          cursor: pointer;
        ">Cancelar</button>

        <button id="confirmDelete" style="
          flex: 1;
          margin-left: 8px;
          padding: 10px 0;
          border-radius: 8px;
          background: #e53935;
          color: #fff;
          border: none;
          font-size: 15px;
          cursor: pointer;
        ">Eliminar</button>
      </div>
    </div>
  </div>

  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.93); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>
`;

// Insertar modal al final del body
document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("customModal");
const cancelBtn = document.getElementById("cancelModal");
const confirmBtn = document.getElementById("confirmDelete");

let targetList = null;

// =========================
//   Abrir Modal al clickar "Eliminar"
// =========================
document.querySelectorAll(".list-action-btn.delete").forEach(btn => {
  btn.addEventListener("click", () => {
    targetList = btn.closest(".list-item");
    modal.style.display = "flex";
  });
});

// =========================
//   Cerrar Modal
// =========================
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  targetList = null;
});

// =========================
//   Confirmar Eliminación
// =========================
confirmBtn.addEventListener("click", () => {
  if (targetList) {
    targetList.style.opacity = "0";
    targetList.style.transform = "scale(0.95)";
    setTimeout(() => {
      targetList.remove();
    }, 200);
  }
  modal.style.display = "none";
});
