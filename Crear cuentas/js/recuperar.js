// ============================
// MODAL BONITO — REUTILIZABLE
// ============================
function showModal(titulo, mensaje) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal-box">
      <h2>${titulo}</h2>
      <p>${mensaje}</p>
      <div class="modal-buttons">
        <button class="modal-btn modal-btn-confirm">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".modal-btn-confirm").onclick = () => overlay.remove();
}

// ============================
// 1. ENVIAR CÓDIGO AL CORREO
// ============================
const formRestablecer = document.getElementById("formRestablecer");

if (formRestablecer) {
  formRestablecer.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailRecuperar").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      showModal("Error", "El correo ingresado no está registrado.");
      return;
    }

    // Crear código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("codigoRecuperacion", codigo);
    localStorage.setItem("emailRecuperacion", email);

    showModal("Código enviado",
      "Hemos enviado un código a tu correo. Ingresa el código para continuar.");

    setTimeout(() => {
      window.location.href = "verificar-codigo.html";
    }, 1000);
  });
}

// ============================
// 2. VERIFICAR CÓDIGO
// ============================
const formVerificar = document.getElementById("formVerificar");

if (formVerificar) {

  formVerificar.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigoIngresado = document.getElementById("codigoIngresado").value.trim();
    const codigoReal = localStorage.getItem("codigoRecuperacion");

    if (codigoIngresado !== codigoReal) {
      showModal("Código incorrecto", "El código ingresado no es válido.");
      return;
    }

    // Aprobado
    localStorage.setItem("codigoValidado", "true");

    window.location.href = "nueva-password.html";
  });

}

// ============================
// 3. GUARDAR NUEVA CONTRASEÑA
// ============================
const formNuevaPass = document.getElementById("formNuevaPass");

if (formNuevaPass) {

  formNuevaPass.addEventListener("submit", (e) => {
    e.preventDefault();

    const nueva = document.getElementById("passwordNueva").value.trim();
    const confirmar = document.getElementById("passwordConfirmar").value.trim();

    if (nueva.length < 6) {
      showModal("Error", "La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (nueva !== confirmar) {
      showModal("Error", "Las contraseñas no coinciden.");
      return;
    }

    const email = localStorage.getItem("emailRecuperacion");
    let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    const index = usuarios.findIndex(u => u.email === email);

    if (index !== -1) {
      usuarios[index].password = nueva;
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
    }

    // Limpiar temporales
    localStorage.removeItem("codigoRecuperacion");
    localStorage.removeItem("codigoValidado");
    localStorage.removeItem("emailRecuperacion");

    showModal("Contraseña actualizada", "Tu contraseña se cambió exitosamente.");

    setTimeout(() => {
      window.location.href = "iniciar-sesion.html";
    }, 1000);
  });

}
