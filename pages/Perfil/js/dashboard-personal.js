
  lucide.createIcons();

  document.addEventListener("DOMContentLoaded", () => {
    const enlaces = [
      { selector: 'a[href="/pages/Perfil/generar-reporte.html"]', mensaje: "¿Deseas generar tu reporte ahora?" },
      { selector: 'a[href="/pages/ExplorarCarreras/explorar-carreras-seccion.html"]', mensaje: "¿Deseas explorar más carreras ahora?" },
      { selector: 'a[href="/pages/Perfil/configuracion-perfil.html"]', mensaje: "¿Deseas completar tu perfil antes de continuar?" }
    ];

    // Crear modal dinámico
    function mostrarModal(mensaje, callback) {
      const overlay = document.createElement("div");
      overlay.className = "custom-modal-overlay";
      overlay.innerHTML = `
        <div class="custom-modal">
          <h3>Confirmar acción</h3>
          <p>${mensaje}</p>
          <div class="custom-modal-buttons">
            <button class="custom-btn btn-confirm">Sí</button>
            <button class="custom-btn btn-cancel">No</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const btnConfirm = overlay.querySelector(".btn-confirm");
      const btnCancel = overlay.querySelector(".btn-cancel");

      btnConfirm.addEventListener("click", () => {
        document.body.removeChild(overlay);
        callback(true);
      });

      btnCancel.addEventListener("click", () => {
        document.body.removeChild(overlay);
        callback(false);
      });
    }

    // Asignar a cada enlace
    enlaces.forEach(({ selector, mensaje }) => {
      const link = document.querySelector(selector);
      if (link) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          mostrarModal(mensaje, (confirmado) => {
            if (confirmado) {
              window.location.href = link.getAttribute("href");
            }
          });
        });
      }
    });
  });
