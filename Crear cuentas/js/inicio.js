// Recuperar la sesión actual
const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

// Buscar el usuario logueado
const usuarioActual = usuarios.find(u => u.id === sesion?.id);

// Si no hay usuario logueado → mandar al login
if (!usuarioActual) {
    window.location.href = "/Crear cuentas/iniciar-sesion.html";
}
