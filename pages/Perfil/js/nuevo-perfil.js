// =======================
// UTILIDADES
// =======================
function qs(sel) {
    return document.querySelector(sel);
}

// =======================
// CARGAR USUARIO ACTUAL
// =======================
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;

// Elementos visuales
const nombreSpan = qs("#user-name");
const avatarImg = qs("#user-avatar");
const avatarCircle = qs("#user-avatar-circle");
const userMenu = qs("#user-menu");
const logoutBtn = qs("#logoutBtn");

// Campos del perfil
const inputNombre = qs("#input-nombre");
const inputEmail = qs("#input-email");
const inputTelefono = qs("#input-telefono");
const inputDireccion = qs("#input-direccion");
const inputAvatar = qs("#input-avatar");
const btnGuardar = qs("#btn-guardar");

// =======================
// MOSTRAR DATOS EN PERFIL
// =======================
function applyAvatarAndName(user) {
    if (!user) return;

    if (nombreSpan) nombreSpan.textContent = user.nombre || "Usuario";

    if (user.avatar) {
        avatarImg.src = user.avatar;
        avatarImg.classList.remove("hidden");
        avatarCircle.classList.add("hidden");
    } else {
        avatarImg.classList.add("hidden");
        avatarCircle.classList.remove("hidden");

        const iniciales = (user.nombre || "U")
            .split(/\s+/)
            .map(p => p[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

        avatarCircle.textContent = iniciales;
    }
}

// =======================
// MOSTRAR INFO EN FORMULARIO
// =======================
function loadProfileFields() {
    if (!usuarioActual) return;

    inputNombre.value = usuarioActual.nombre || "";
    inputEmail.value = usuarioActual.email || "";
    inputTelefono.value = usuarioActual.telefono || "";
    inputDireccion.value = usuarioActual.direccion || "";
    inputAvatar.value = usuarioActual.avatar || "";
}

// =======================
// GUARDAR CAMBIOS
// =======================
if (btnGuardar) {
    btnGuardar.addEventListener("click", () => {
        const actualizado = {
            ...usuarioActual,
            nombre: inputNombre.value.trim(),
            telefono: inputTelefono.value.trim(),
            direccion: inputDireccion.value.trim(),
            avatar: inputAvatar.value.trim()
        };

        localStorage.setItem("usuarioActual", JSON.stringify(actualizado));
        applyAvatarAndName(actualizado);

        alert("¡Cambios guardados!");
    });
}

// =======================
// MENU DEL AVATAR
// =======================
const avatarClickArea = qs(".nav-user-container") || qs("#nav-user");

if (avatarClickArea && userMenu) {
    avatarClickArea.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
        userMenu.classList.add("hidden");
    });
}

// =======================
// LOGOUT
// =======================
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActual");
        window.location.href = "/Crear cuentas/iniciar-sesion.html";
    });
}

// =======================
// INICIAR
// =======================
applyAvatarAndName(usuarioActual);
loadProfileFields();
