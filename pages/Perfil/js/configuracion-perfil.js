document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();

    const KEY = "perfilUsuario";
    const qs = s => document.querySelector(s);
    const qsa = s => [...document.querySelectorAll(s)];

    // ===============================
    // ELEMENTOS GENERALES
    // ===============================
    const form = qs("#configForm");
    const achievementList = qs("#achievementList");
    const addAchievementBtn = qs("#addAchievementBtn");

    // ===============================
    // CREAR ITEM DE LOGRO
    // ===============================
    function createAchievementItem(text) {
        const item = document.createElement("div");
        item.className = "achievement-item";
        item.innerHTML = `
            <i data-lucide="award"></i>
            <span class="ach-text">${text}</span>
            <button type="button" class="btn-icon-remove"><i data-lucide="x"></i></button>
        `;

        item.querySelector(".btn-icon-remove").addEventListener("click", () => item.remove());
        return item;
    }

    // ===============================
    // CARGAR DATOS GUARDADOS
    // ===============================
    const saved = JSON.parse(localStorage.getItem(KEY) || "null") || {
        nombre: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
        genero: "",
        ubicacion: "",
        bio: "",
        nivel: "",
        grado: "",
        institucion: "",
        promedio: "",
        anoGraduacion: "",
        intereses: [],
        logros: []
    };

    const safeSet = (selector, value) => {
        const el = qs(selector);
        if (el) el.value = value;
    };

    safeSet("#nombre", saved.nombre);
    safeSet("#email", saved.email);
    safeSet("#telefono", saved.telefono);
    safeSet("#fecha-nacimiento", saved.fechaNacimiento);
    safeSet("#genero", saved.genero);
    safeSet("#ubicacion", saved.ubicacion);
    safeSet("#bio", saved.bio);

    safeSet("#nivel-educativo", saved.nivel);
    safeSet("#grado-actual", saved.grado);
    safeSet("#institucion", saved.institucion);
    safeSet("#promedio", saved.promedio);
    safeSet("#ano-graduacion", saved.anoGraduacion);

    qsa("input[data-interest]").forEach(cb => {
        cb.checked = saved.intereses.includes(cb.dataset.interest);
    });

    if (Array.isArray(saved.logros)) {
        saved.logros.forEach(text => {
            achievementList.appendChild(createAchievementItem(text));
        });
    }

    if (window.lucide) lucide.createIcons();

    // ===============================
    // AÑADIR LOGRO
    // ===============================
    if (addAchievementBtn) {
        addAchievementBtn.addEventListener("click", () => {
            const texto = prompt("Escribe el nombre del logro o certificación:");
            if (!texto || !texto.trim()) return;

            const item = createAchievementItem(texto.trim());
            achievementList.appendChild(item);
            if (window.lucide) lucide.createIcons();
        });
    }

    // ===============================
    // GUARDAR PERFIL COMPLETO
    // ===============================
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const dataToSave = {
                nombre: qs("#nombre")?.value || "",
                email: qs("#email")?.value || "",
                telefono: qs("#telefono")?.value || "",
                fechaNacimiento: qs("#fecha-nacimiento")?.value || "",
                genero: qs("#genero")?.value || "",
                ubicacion: qs("#ubicacion")?.value || "",
                bio: qs("#bio")?.value || "",

                nivel: qs("#nivel-educativo")?.value || "",
                grado: qs("#grado-actual")?.value || "",
                institucion: qs("#institucion")?.value || "",
                promedio: qs("#promedio")?.value || "",
                anoGraduacion: qs("#ano-graduacion")?.value || "",

                intereses: qsa("input[data-interest]:checked").map(cb => cb.dataset.interest),
                logros: qsa(".achievement-item .ach-text").map(s => s.textContent)
            };

            localStorage.setItem(KEY, JSON.stringify(dataToSave));

            try {
                const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");

                if (usuarioActual) {
                    usuarioActual.nombre = dataToSave.nombre;
                    usuarioActual.intereses = dataToSave.intereses;

                    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

                    // Actualizar usuariosRegistrados
                    const users = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
                    const idx = users.findIndex(u => u.email === usuarioActual.email);
                    if (idx !== -1) {
                        users[idx] = usuarioActual;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(users));
                    }
                }
            } catch (err) {
                console.warn("No se pudo sincronizar usuarioActual:", err);
            }

            showModal("Éxito", "✔ Cambios guardados correctamente.");
        });
    }
}); // DOMContentLoaded end


// ===================================================================
// ==========     CAMBIO DE CONTRASEÑA — VERSIÓN FINAL     ===========
// ===================================================================

const inputPassActual = document.getElementById("password-actual");
const inputPassNueva = document.getElementById("password-nueva");
const inputPassConfirm = document.getElementById("password-confirmar");
const btnGuardarPass = document.getElementById("btnGuardarPassword");

if (btnGuardarPass) {
    btnGuardarPass.addEventListener("click", () => {
        const actual = inputPassActual.value.trim();
        const nueva = inputPassNueva.value.trim();
        const confirmar = inputPassConfirm.value.trim();

        const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
        const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

        if (!actual || !nueva || !confirmar) {
            showModal("Error", "Todos los campos son obligatorios.");
            return;
        }

        if (!usuarioActual) {
            showModal("Error", "No se encontró la sesión del usuario.");
            return;
        }

        if (actual !== usuarioActual.password) {
            showModal("Error", "La contraseña actual no es correcta.");
            return;
        }

        if (nueva.length < 2) {
            showModal("Error", "La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (nueva !== confirmar) {
            showModal("Error", "La nueva contraseña y la confirmación no coinciden.");
            return;
        }

        // Guardar nueva contraseña
        usuarioActual.password = nueva;
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

        const index = usuarios.findIndex(u => u.email === usuarioActual.email);
        if (index !== -1) {
            usuarios[index].password = nueva;
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
        }

        showModal("Éxito", "✔ Contraseña actualizada correctamente.");

        // Limpiar campos
        inputPassActual.value = "";
        inputPassNueva.value = "";
        inputPassConfirm.value = "";
    });
}

// ======================================================
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
function showConfirmModal(titulo, mensaje, onConfirm) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal-box">
            <h2>${titulo}</h2>
            <p>${mensaje}</p>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-cancel">Cancelar</button>
                <button class="modal-btn modal-btn-danger">Eliminar</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".modal-btn-cancel").onclick = () => overlay.remove();
    overlay.querySelector(".modal-btn-danger").onclick = () => {
        overlay.remove();
        onConfirm(); // Ejecuta la acción
    };
}
