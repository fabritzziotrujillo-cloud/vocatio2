// configuracion-perfil.js
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  /* ---------------------------
     Helpers / Keys / Session
     --------------------------- */
  const K_USERS = "usuariosRegistrados";
  const K_SESSION = "usuarioActual";

  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const safeJSON = (s, fallback) => { try { return JSON.parse(s); } catch(e){ return fallback; } };

  const readUsers = () => safeJSON(localStorage.getItem(K_USERS), []);
  const writeUsers = arr => localStorage.setItem(K_USERS, JSON.stringify(arr));
  const getSession = () => safeJSON(localStorage.getItem(K_SESSION), null);
  const setSession = obj => {
    if (!obj) return localStorage.removeItem(K_SESSION);
    localStorage.setItem(K_SESSION, JSON.stringify(obj));
  };

  // Obtener usuario actual (fuente de verdad)
  let usuarioActual = getSession();

  // Intentar compatibilidad: si no hay usuarioActual buscar "sesionActiva" (si usabas otra key)
  if (!usuarioActual) {
    const alt = safeJSON(localStorage.getItem("sesionActiva"), null);
    if (alt) {
      // buscar en usuariosRegistrados por id o email
      const usuarios = readUsers();
      usuarioActual = usuarios.find(u => u.id === alt.id || u.email === alt.email) || null;
      if (usuarioActual) setSession(usuarioActual);
    }
  }

  // Si no hay sesión → forzar login
  if (!usuarioActual) {
    window.location.href = "/Crear cuentas/iniciar-sesion.html";
    return;
  }

  // KEY única por usuario (usar email porque es único en tu sistema)
  const PROFILE_KEY = "perfilUsuario_" + (usuarioActual.email || usuarioActual.id || "sin-id");

  /* ---------------------------
     Elementos del DOM
     --------------------------- */
  const form = qs("#configForm");
  const nombreInput = qs("#nombre");
  const emailInput = qs("#email");
  const telefonoInput = qs("#telefono");
  const fechaInput = qs("#fecha-nacimiento");
  const generoSelect = qs("#genero");
  const ubicacionInput = qs("#ubicacion");
  const bioInput = qs("#bio");
  const achievementList = qs("#achievementList"); // si existe
  const addAchievementBtn = qs("#addAchievementBtn"); // si existe

  const filePhotoInput = qs("#file-photo"); // input dentro de .btn-upload
  const currentPhoto = qs("#current-photo");
  const nombreDisplay = qs("#nombre-display");

  const btnGuardarPass = qs("#btnGuardarPassword");
  const passActual = qs("#password-actual");
  const passNueva = qs("#password-nueva");
  const passConfirm = qs("#password-confirmar");

  const btnEliminarCuenta = qs(".btn-danger:not(#logoutBtn)"); // botón eliminar
  const modalEliminar = qs("#modalEliminarCuenta");
  const btnConfirmarEliminar = qs("#btnConfirmarEliminar");
  const btnCancelarEliminar = qs("#btnCancelarEliminar");

  const logoutBtnNav = qs("#logoutBtn");
  const logoutBtnConfig = qs("#logoutBtnConfig");

  /* ---------------------------
     Utilidades UI: modal bonito
     --------------------------- */
  function showModal(title, message, opts = {}) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
      <div class="modal-box">
        <h2>${title}</h2>
        <p>${message}</p>
        <div class="modal-buttons">
          <button class="modal-btn modal-btn-confirm">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector(".modal-btn-confirm").onclick = () => overlay.remove();
  }

  function showConfirmModal(title, message, onConfirm) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
      <div class="modal-box">
        <h2>${title}</h2>
        <p>${message}</p>
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
      onConfirm && onConfirm();
    };
  }

  /* ---------------------------
     Cargar perfil (solo del usuarioActual)
     --------------------------- */
  function loadProfile() {
    const saved = safeJSON(localStorage.getItem(PROFILE_KEY), null);

    // Preferir perfil guardado para campos por separado (si existe), si no, usar usuarioActual
    const source = saved || usuarioActual || {};

    if (currentPhoto) {
      if (source.photo) {
        currentPhoto.style.backgroundImage = `url('${source.photo}')`;
        currentPhoto.textContent = "";
      } else {
        const initials = (source.nombre || usuarioActual.nombre || "U")
          .split(/\s+/).map(p => p[0]).join("").substring(0,2).toUpperCase();
        currentPhoto.style.backgroundImage = "";
        currentPhoto.textContent = initials;
      }
    }

    if (nombreDisplay) nombreDisplay.textContent = source.nombre || usuarioActual.nombre || "";

    if (nombreInput) nombreInput.value = source.nombre || usuarioActual.nombre || "";
    if (emailInput) {
      emailInput.value = source.email || usuarioActual.email || "";
      // Mantener email de usuario como readonly
      emailInput.readOnly = true;
      emailInput.style.cursor = "not-allowed";
    }
    if (telefonoInput) telefonoInput.value = source.telefono || usuarioActual.telefono || "";
    if (fechaInput) fechaInput.value = source.fechaNacimiento || usuarioActual.fechaNacimiento || "";
    if (ubicacionInput) ubicacionInput.value = source.ubicacion || usuarioActual.ubicacion || "";
    if (bioInput) bioInput.value = source.bio || usuarioActual.bio || "";
    if (generoSelect) generoSelect.value = source.genero || usuarioActual.genero || "";

    // intereses y logros (si tienes checkboxes o lista)
    qsa("input[data-interest]").forEach(cb => {
      const interests = (saved && saved.intereses) || usuarioActual.intereses || [];
      cb.checked = interests.includes(cb.dataset.interest);
    });

    // logros
    if (achievementList) {
      achievementList.innerHTML = "";
      const logs = (saved && saved.logros) || usuarioActual.logros || [];
      logs.forEach(text => {
        const item = document.createElement("div");
        item.className = "achievement-item";
        item.innerHTML = `
          <i data-lucide="award"></i>
          <span class="ach-text">${text}</span>
          <button type="button" class="btn-icon-remove"><i data-lucide="x"></i></button>
        `;
        item.querySelector(".btn-icon-remove").onclick = () => item.remove();
        achievementList.appendChild(item);
      });
      if (window.lucide) lucide.createIcons();
    }
  }

  loadProfile();

  /* ---------------------------
     Subir foto (si existe input)
     --------------------------- */
  if (filePhotoInput) {
    filePhotoInput.addEventListener("change", () => {
      const f = filePhotoInput.files?.[0];
      if (!f) return;
      const fr = new FileReader();
      fr.onload = () => {
        // guardar en usuarioActual y en perfil key
        usuarioActual.photo = fr.result;
        setSession(usuarioActual);

        // sincronizar usuariosRegistrados
        const usuarios = readUsers();
        const idx = usuarios.findIndex(u => u.email === usuarioActual.email);
        if (idx !== -1) {
          usuarios[idx].photo = fr.result;
          writeUsers(usuarios);
        }

        // guardar también en PROFILE_KEY
        const saved = safeJSON(localStorage.getItem(PROFILE_KEY), {});
        saved.photo = fr.result;
        localStorage.setItem(PROFILE_KEY, JSON.stringify(saved));

        loadProfile();
      };
      fr.readAsDataURL(f);
    });
  }

  /* ---------------------------
     Añadir logro (si existe botón)
     --------------------------- */
  if (addAchievementBtn) {
    addAchievementBtn.addEventListener("click", () => {
      const texto = prompt("Escribe el nombre del logro o certificación:");
      if (!texto || !texto.trim()) return;
      const item = document.createElement("div");
      item.className = "achievement-item";
      item.innerHTML = `
        <i data-lucide="award"></i>
        <span class="ach-text">${texto.trim()}</span>
        <button type="button" class="btn-icon-remove"><i data-lucide="x"></i></button>
      `;
      item.querySelector(".btn-icon-remove").onclick = () => item.remove();
      achievementList && achievementList.appendChild(item);
      if (window.lucide) lucide.createIcons();
    });
  }

 
