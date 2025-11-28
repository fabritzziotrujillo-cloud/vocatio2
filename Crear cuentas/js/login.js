document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // limpiar errores
        document.getElementById("email").classList.remove("error-input");
        document.getElementById("password").classList.remove("error-input");
        document.getElementById("error-email").style.display = "none";
        document.getElementById("error-password").style.display = "none";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Leer ARRAY de usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

        // No hay usuarios
        if (usuarios.length === 0) {
            mostrarError("email", "No existe ninguna cuenta registrada.");
            return;
        }

        // Buscar usuario por email
        const usuario = usuarios.find(u => u.email === email);

        if (!usuario) {
            mostrarError("email", "Este correo no está registrado.");
            return;
        }

        // Validar contraseña
        if (usuario.password !== password) {
            mostrarError("password", "La contraseña ingresada es incorrecta.");
            return;
        }

        // Guardar sesión del usuario (sin mezclar cuentas)
        localStorage.setItem("sesionActiva", JSON.stringify({
            id: usuario.id
        }));

        // REDIRECCIÓN (esto faltaba)
        window.location.href = "/pages/inicio.html";
    });

    // Función para mostrar errores
    function mostrarError(campo, mensaje) {
        const input = document.getElementById(campo);
        const error = document.getElementById("error-" + campo);

        error.textContent = "⚠️ " + mensaje;
        error.style.display = "block";
        input.classList.add("error-input");
    }
});
