
document.addEventListener("DOMContentLoaded", () => {

  function showModal(message, onConfirm) {
    const overlay = document.createElement("div");
    overlay.className = "custom-modal-overlay";

    overlay.innerHTML = `
      <div class="custom-modal">
        <h3>Confirmar acción</h3>
        <p>${message}</p>
        <div class="custom-modal-buttons">
          <button class="modal-btn modal-confirm">Sí</button>
          <button class="modal-btn modal-cancel">No</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".modal-confirm").addEventListener("click", () => {
      overlay.remove();
      onConfirm(true);
    });

    overlay.querySelector(".modal-cancel").addEventListener("click", () => {
      overlay.remove();
      onConfirm(false);
    });
  }

  // botones que usarán el modal
  const buttons = document.querySelectorAll(".btn-primary");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const url = btn.getAttribute("href");

      showModal("¿Deseas continuar a este enlace externo?", (ok) => {
        if (ok) window.location.href = url;
      });
    });
  });

});
