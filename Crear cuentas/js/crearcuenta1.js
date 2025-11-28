const form = document.getElementById("formRegistro");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;

    const campos = [
        { id: "nombres", errorId: "error-nombres" },
        { id: "email", errorId: "error-email" },
        { id: "password", errorId: "error-password" },
        { id: "confirmar-password", errorId: "error-confirmar" },
    ];

    // Reset errores
    campos.forEach(({ id, errorId }) => {
        document.getElementById(id).classList.remove("error-input");
        document.getElementById(errorId).style.display = "none";
    });

    // Validar campos vacíos
    campos.forEach(({ id, errorId }) => {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            document.getElementById(errorId).style.display = "block";
            input.classList.add("error-input");
            valid = false;
        }
    });

    const pass = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmar-password").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validar contraseñas iguales
    if (pass && confirm && pass !== confirm) {
        const errorConfirm = document.getElementById("error-confirmar");
        errorConfirm.textContent = "⚠️ Las contraseñas no coinciden";
        errorConfirm.style.display = "block";
        document.getElementById("confirmar-password").classList.add("error-input");
        valid = false;
    }

    if (!valid) return;

    // Obtener usuarios registrados anteriormente
    let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    // Validar si el correo ya se registró
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        alert("⚠️ Este correo ya está registrado. Intenta con otro.");
        return;
    }

    // Nuevo usuario
const nuevoUsuario = {
    id: Date.now(), // ID único
    nombre: document.getElementById("nombres").value.trim(),
    email: email,
    password: pass
};


    // Guardar en array y luego en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

    alert("Cuenta creada exitosamente 🎉");
    window.location.href = "iniciar-sesion.html";
});