document.addEventListener("DOMContentLoaded", () => {

  // ---------- Helpers ----------
  const qs = (sel, ctx=document) => ctx.querySelector(sel);
  const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const safeJSON = (s, fallback) => { try { return JSON.parse(s); } catch(e){ return fallback; } };

  const K_USERS = "usuariosRegistrados";
  const K_SESSION = "usuarioActual";

  // ---------- MIGRACIÓN ----------
  (function migrateOldKeys(){
    const oldSingle = localStorage.getItem("usuarioRegistrado");
    if (oldSingle) {
      const parsed = safeJSON(oldSingle, null);
      if (parsed) {
        const users = safeJSON(localStorage.getItem(K_USERS), []);
        if (!users.some(u => u.email === parsed.email)) users.push(parsed);
        localStorage.setItem(K_USERS, JSON.stringify(users));
        localStorage.setItem(K_SESSION, JSON.stringify(parsed));
      }
    }
  })();

  // ---------- Read / Write ----------
  const readUsers = () => safeJSON(localStorage.getItem(K_USERS), []);
  const writeUsers = (arr) => localStorage.setItem(K_USERS, JSON.stringify(arr));
  const getSession = () => safeJSON(localStorage.getItem(K_SESSION), null);
  const setSession = (obj) => {
    if (!obj) return localStorage.removeItem(K_SESSION);
    localStorage.setItem(K_SESSION, JSON.stringify(obj));
  };
  const upsertUserByEmail = (oldEmail, obj) => {
    const users = readUsers();
    const idx = users.findIndex(u => u.email === oldEmail);
    if (idx === -1) users.push(obj);
    else users[idx] = obj;
    writeUsers(users);
  };

  // ---------- UI Elements ----------
  const avatarEl = qs("#userAvatar") || qs(".user-avatar");
  const navUserEl = qs("#nav-user");
  const greetingEl = qs(".cta-title");
  const profileNameSpan = qs("#nombre-display");
  const photoCircle = qs(".current-photo");
  const logoutLink = qs('#logoutBtn') || qs('a[href$="logout.html"]');

  // ---------- Iniciales ----------
  function getIniciales(nombre="U") {
    const partes = nombre.trim().split(" ");
    if (partes.length === 1) return partes[0].substring(0,2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
  }

  // ---------- Avatar + Nombre ----------
// ---------- Avatar + Nombre (Navbar) ----------
const applyAvatarAndName = (user = {}) => {

  // Obtener iniciales
  const initials = getIniciales(user.nombre || "U");

  // ======= NAVBAR =======
  const navUserEl = document.getElementById("nav-user");
  if (navUserEl) {
    navUserEl.innerHTML = `
      <div class="nav-user-circle" style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: white;
      ">
        ${user.photo ? "" : initials}
      </div>
      <span class="nav-user-name">${user.nombre || "Usuario"}</span>
    `;

    const circle = navUserEl.querySelector(".nav-user-circle");
    if (user.photo) circle.style.backgroundImage = `url('${user.photo}')`;
  }

  // ======= FOTO GRANDE (perfil) =======
  if (avatarEl) {
    if (user.photo) {
      avatarEl.style.backgroundImage = `url('${user.photo}')`;
      avatarEl.textContent = "";
    } else {
      avatarEl.style.backgroundImage = "";
      avatarEl.textContent = initials;
    }
  }

  // ======= Otros textos =======
  if (greetingEl)
    greetingEl.textContent = `¡Hola ${user.nombre || "Usuario"}! ¿Listo para descubrir tu vocación?`;

  if (profileNameSpan)
    profileNameSpan.textContent = user.nombre || "";

  if (photoCircle) {
    if (user.photo) {
      photoCircle.style.backgroundImage = `url('${user.photo}')`;
      photoCircle.textContent = "";
    } else {
      photoCircle.style.backgroundImage = "";
      photoCircle.textContent = initials;
    }
  }
};


  // ---------- Load session ----------
  let usuario = getSession();
  if (!usuario) {
    const users = readUsers();
    if (users.length === 1) {
      usuario = users[0];
      setSession(usuario);
    }
  }

  // ---------- Require auth ----------
  const requireAuth = document.body.dataset.requireAuth === "true" || qs("#require-auth");
  if (!usuario && requireAuth) {
    window.location.href = "/Crear cuentas/iniciar-sesion.html";
    return;
  }

  applyAvatarAndName(usuario || {});

  // ---------- Fill inputs ----------
  function fillInputs(user={}) {
    if (qs("#email")) {
      const el = qs("#email");
      el.value = user.email || "";
      el.readOnly = true;
      el.style.cursor = "not-allowed";
    }
    if (qs("#nombre")) qs("#nombre").value = user.nombre || "";
    if (qs("#telefono")) qs("#telefono").value = user.telefono || "";
    if (qs("#fecha-nacimiento")) qs("#fecha-nacimiento").value = user.fechaNacimiento || "";
    if (qs("#bio")) qs("#bio").value = user.bio || "";
    if (qs("#genero")) qs("#genero").value = user.genero || "";
  }
  fillInputs(usuario);

  // ---------- FOTO ----------
  qsa(".btn-upload input[type=file]").forEach(input => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;

      const fr = new FileReader();
      fr.onload = () => {
        usuario.photo = fr.result;
        setSession(usuario);
        upsertUserByEmail(usuario.email, usuario);
        applyAvatarAndName(usuario);
        // Si el navbar aparece después (HTML cargado por componentes), esperar 100ms
setTimeout(() => {
  const again = document.getElementById("nav-user");
  if (again) applyAvatarAndName(usuario);
}, 120);

      };
      fr.readAsDataURL(file);
    });
  });

  // ---------- Guardar perfil ----------
  qsa(".config-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const oldEmail = usuario.email;

      usuario.nombre = form.querySelector("#nombre")?.value.trim() || usuario.nombre;
      usuario.telefono = form.querySelector("#telefono")?.value.trim() || usuario.telefono;
      usuario.fechaNacimiento = form.querySelector("#fecha-nacimiento")?.value || usuario.fechaNacimiento;
      usuario.bio = form.querySelector("#bio")?.value.trim() || usuario.bio;
      usuario.genero = form.querySelector("#genero")?.value || usuario.genero;

      upsertUserByEmail(oldEmail, usuario);
      setSession(usuario);

      alert("Cambios guardados correctamente ✔️");

      applyAvatarAndName(usuario);
      fillInputs(usuario);
    });
  });

  // ---------- Descargar datos ----------
  qsa(".btn-download").forEach(btn => {
    btn.addEventListener("click", () => {
      const exportObj = {...usuario};
      delete exportObj.password;

      const blob = new Blob([JSON.stringify(exportObj, null, 2)], {type:"application/json"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "mis_datos.json";
      a.click();
    });
  });

  // ---------- Eliminar cuenta ----------
  qsa(".btn-danger:not(#logoutBtn)").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("¿Seguro que deseas eliminar tu cuenta?")) return;

      let users = readUsers();
      users = users.filter(u => u.email !== usuario.email);
      writeUsers(users);

      setSession(null);
      window.location.href = "/Crear cuentas/iniciar-sesion.html";
    });
  });

 // ---------- Logout (Cerrar sesión) ----------
const logoutBtn = document.querySelector("#logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", e => {
        e.preventDefault();

        // borrar sesión
        setSession(null);

        // enviar al login
        window.location.href = "/Crear cuentas/iniciar-sesion.html";
    });
} else {
    console.warn("⚠️ No se encontró el botón #logoutBtn en el DOM.");
}


 // ---------- MENU AVATAR SIMPLE Y 100% COMPATIBLE ----------
(function setupAvatarMenu() {

  // El contenedor correcto para tu HTML
  const navUser = qs("#nav-user");
  const menu = qs("#user-menu");

  if (!navUser || !menu) {
    console.warn("No se encontró el avatar o el menú.");
    return;
  }

  // Asegurar que el menú inicia oculto
  menu.classList.add("hidden");

  // Click para abrir/cerrar
  navUser.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  // Cerrar si clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#nav-user"))
      menu.classList.add("hidden");
  });

  // Reinstalar cuando se actualiza el avatar
  const original = applyAvatarAndName;
  applyAvatarAndName = function(user) {
    original(user);

    setTimeout(() => {
      const newNavUser = qs("#nav-user");
      if (!newNavUser) return;

      newNavUser.addEventListener("click", (ev) => {
        ev.stopPropagation();
        menu.classList.toggle("hidden");
      });
    }, 30);
  };

})();


});
