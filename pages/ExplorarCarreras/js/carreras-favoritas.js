
    lucide.createIcons();
 

// Animación inicial de entrada para todas las cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".favorite-card");

  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 150);
  });
});

// Efecto hover dinámico bonito
document.querySelectorAll(".favorite-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "0.3s";
    card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.18)";
    card.style.transform = "scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    card.style.transform = "scale(1)";
  });
});

// Animación al presionar "Quitar"
document.querySelectorAll(".remove-favorite").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".favorite-card");

    card.style.transition = "0.4s ease";
    card.style.opacity = "0.4";
    card.style.transform = "scale(0.97)";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    }, 400);
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // 1. OBTENER FAVORITOS
  // ============================
  const favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
  const careers = JSON.parse(localStorage.getItem("careersDB")) || []; // la lista completa
  const container = document.querySelector(".favorites-grid");
  const countText = document.querySelector(".favorites-count");

  // Si no tienes careersDB aún, lo creo automáticamente la primera vez
  if (careers.length === 0) {
    // Importar desde el archivo donde tienes "careers"
    // Si ya tienes esto en una variable global, ignora esta parte
    console.warn("⚠ No existe careersDB en localStorage");
  }

  // ============================
  // 2. FILTRAR LAS CARRERAS GUARDADAS
  // ============================
  const savedCareers = careers.filter(c => favorites.includes(c.id));

  // ============================
  // 3. SI NO HAY FAVORITOS
  // ============================
  if (savedCareers.length === 0) {
    container.innerHTML = `
      <div class="no-favorites">
        <i data-lucide="heart-off" style="width:48px;height:48px;color:#999"></i>
        <p>No tienes carreras en favoritos</p>
        <a href="explorar-carreras-seccion.html" class="btn-action primary" style="margin-top:20px;">
          Explorar Carreras
        </a>
      </div>
    `;
    countText.textContent = "0 carreras favoritas";
    lucide.createIcons();
    return;
  }

  countText.textContent = `${savedCareers.length} carreras favoritas`;

  // ============================
  // 4. PINTAR LAS TARJETAS
  // ============================
  container.innerHTML = "";

  savedCareers.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("favorite-card");
    card.setAttribute("data-id", c.id);

    card.innerHTML = `
      <div class="favorite-card-image">
        <img src="${c.img}" alt="${c.nombre}">
      </div>

      <div class="favorite-card-content">
        <h3 class="favorite-card-title">${c.nombre}</h3>
        <p class="favorite-card-category">${c.area}</p>

        <div class="favorite-card-meta">
          <span class="meta-item">
            <i data-lucide="check"></i>
            Compatibilidad: <strong>${c.compatibilidad}</strong>
          </span>
        </div>

        <div class="favorite-card-actions">
          <a href="../ExplorarCarreras/detalle-carrera.html?id=${c.id}" 
             class="btn-favorite primary">
            <i data-lucide="eye"></i> Ver Detalles
          </a>

          <button class="btn-favorite secondary remove-favorite">
            <i data-lucide="x"></i> Quitar
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();

  // ============================
  // 5. ANIMACIÓN DE ENTRADA
  // ============================
  const cards = document.querySelectorAll(".favorite-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 120);
  });

  // ============================
  // 6. EFECTO HOVER (igual que antes)
  // ============================
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "0.3s";
      card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.18)";
      card.style.transform = "scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
      card.style.transform = "scale(1)";
    });
  });

  // ============================
  // 7. QUITAR FAVORITO
  // ============================
  document.querySelectorAll(".remove-favorite").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".favorite-card");
      const id = parseInt(card.getAttribute("data-id"));

      // quitar del localStorage
      const updated = favorites.filter(f => f !== id);
      localStorage.setItem("favoritos", JSON.stringify(updated));

      // animación para quitar
      card.style.transition = "0.3s";
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";

      setTimeout(() => {
        card.remove();
        if (updated.length === 0) location.reload();
      }, 300);
    });
  });

});

// ===========================
//  CARGAR FAVORITOS Y MOSTRAR TARJETAS
// ===========================
document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".favorite-careers");
  let favorites = JSON.parse(localStorage.getItem("careerFavorites")) || [];

  // Si no hay favoritos → mensaje
  if (favorites.length === 0) {
    container.innerHTML = `
      <p class="no-favorites">No has agregado carreras a favoritos aún.</p>
    `;
    return;
  }

  // Generar tarjetas
  favorites.forEach(c => {

    const card = document.createElement("div");
    card.classList.add("favorite-card");

    card.innerHTML = `
      <div class="favorite-img">
        <img src="${c.imagen}" alt="${c.nombre}">
      </div>

      <div class="favorite-content">
        <h3>${c.nombre}</h3>
        <p class="favorite-area">${c.area}</p>
        <span class="favorite-compat">${c.compatibilidad}</span>

        <div class="favorite-actions">
          <a href="${c.url}" class="favorite-btn-details">Ver Detalles</a>

          <button class="remove-fav-btn" data-id="${c.id}">
            <i data-lucide="trash-2"></i> Quitar
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Activar iconos
  lucide.createIcons();

  // ===========================
  //  BOTÓN QUITAR FAVORITO
  // ===========================
  document.querySelectorAll(".remove-fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      favorites = favorites.filter(f => f.id !== id);

      localStorage.setItem("careerFavorites", JSON.stringify(favorites));

      // Refrescar la página
      location.reload();
    });
  });

});

/* ===================================================
   Renderizar página "Mis Carreras Favoritas"
   Usa la clave localStorage: "careerFavorites"
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const key = "careerFavorites"; // <--- la clave que debe usar buscar-carreras.html al guardar
  let favorites = JSON.parse(localStorage.getItem(key)) || [];

  const container = document.getElementById("favorites-grid");
  const countEl = document.querySelector(".favorites-count");

  // Actualiza contador (texto)
  function updateCount() {
    const n = favorites.length;
    countEl.textContent = n === 1 ? "1 carrera favorita" : `${n} carreras favoritas`;
  }

  // Si no hay favoritos: mensaje
  if (!favorites.length) {
    container.innerHTML = `
      <div class="no-favorites" style="padding:40px;text-align:center;color:var(--neutral-700);">
        <i data-lucide="heart-off" style="width:48px;height:48px"></i>
        <p style="margin-top:12px;font-weight:600;">No tienes carreras en favoritos</p>
        <a href="explorar-carreras-seccion.html" class="btn-action primary" style="margin-top:18px;display:inline-block;">
          Explorar Carreras
        </a>
      </div>
    `;
    updateCount();
    lucide.createIcons();
    return;
  }

  // Generar tarjetas
  container.innerHTML = ""; // limpiar

  favorites.forEach(c => {
    // asegúrate que el objeto guardado tenga: id, nombre, area, imagen, url, compatibilidad
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.dataset.id = c.id ?? "";

    card.innerHTML = `
      <div class="favorite-card-image">
        <img src="${c.imagen || c.img || ''}" alt="${c.nombre || ''}">
      </div>
      <div class="favorite-card-content">
        <h3 class="favorite-card-title">${c.nombre || ""}</h3>
        <p class="favorite-card-category">${c.area || ""}</p>
        <div class="favorite-card-meta">
          <span class="meta-item">
            <i data-lucide="check"></i>
            Compatibilidad: <strong>${c.compatibilidad || c.compatibilidadText || ""}</strong>
          </span>
        </div>
        <div class="favorite-card-actions">
          <a href="${c.url || `/pages/ExplorarCarreras/detalle-carrera.html?id=${c.id}`}" 
             class="btn-favorite primary">
            <i data-lucide="eye"></i>
            Ver Detalles
          </a>
          <button class="btn-favorite secondary remove-favorite" data-id="${c.id}">
            <i data-lucide="x"></i>
            Quitar
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // render lucide icons
  lucide.createIcons();

  // pequeñas animaciones de entrada
  const cards = container.querySelectorAll(".favorite-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    setTimeout(() => {
      card.style.transition = "0.45s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 100);
  });

  // Quitar favorito
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-favorite");
    if (!btn) return;
    const id = btn.dataset.id;
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem(key, JSON.stringify(favorites));

    // animación y remover DOM
    const card = btn.closest(".favorite-card");
    card.style.transition = "0.3s";
    card.style.opacity = "0";
    card.style.transform = "scale(0.96)";
    setTimeout(() => {
      card.remove();
      updateCount();
      if (favorites.length === 0) location.reload();
    }, 300);
  });

  // actualiza contador
  updateCount();
});
