


lucide.createIcons();

// ----- Animación de entrada para todas las career-card -----
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".career-card");

  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    setTimeout(() => {
      card.style.transition = "0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 150);
  });
});


// ----- Efecto hover elegante -----
document.querySelectorAll(".career-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "0.3s";
    card.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)";
    card.style.transform = "scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    card.style.transform = "scale(1)";
  });
});


// ----- Animación del botón de favoritos -----
document.querySelectorAll(".career-favorite-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    btn.classList.toggle("active");

    // Pequeño pulso
    btn.style.transform = "scale(1.2)";
    btn.style.transition = "0.15s ease";

    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);

    // Cambiar color cuando está activo
    if (btn.classList.contains("active")) {
      btn.style.color = "#e11d48"; // rojo rosado
    } else {
      btn.style.color = "#ffffff";
    }
  });
});


// ----- Efecto suave al hacer hover en el botón de comparar -----
document.querySelectorAll(".career-card-btn.secondary").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "0.25s";
    btn.style.backgroundColor = "#e2e8f0";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "";
  });
});


// ----- Efecto suave al hacer hover en el botón "Ver Detalles" -----
document.querySelectorAll(".career-card-btn.primary").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "0.25s";
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

// ========================
// 1. BASE DE DATOS (20 carreras)
// ========================
const careers = [
  {
    id: "software",
    nombre: "Ingeniería de Software",
    area: "Tecnología",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Muy Alta",
    compatibilidad: "92%",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"
  },
  {
    id: "desarrolloAplicaciones",
    nombre: "Desarrollo de Aplicaciones",
    area: "Tecnología",
    duracion: "3 años",
    modalidad: "Virtual",
    dificultad: "Media",
    demanda: "Muy Alta",
    compatibilidad: "90%",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"
  },
  {
    id: "medicina",
    nombre: "Medicina",
    area: "Ciencias de la Salud",
    duracion: "7 años",
    modalidad: "Presencial",
    dificultad: "Muy Alta",
    demanda: "Alta",
    compatibilidad: "86%",
    img: "https://images.unsplash.com/photo-1580281657527-47adb552bb1b?w=400"
  },
  {
    id: "enfermeria",
    nombre: "Enfermería",
    area: "Ciencias de la Salud",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Media",
    demanda: "Muy Alta",
    compatibilidad: "88%",
    img: "https://images.unsplash.com/photo-1583912086091-8f6f1d1872af?w=400"
  },
  {
    id: "administracion",
    nombre: "Administración de Empresas",
    area: "Administración y Negocios",
    duracion: "5 años",
    modalidad: "Híbrida",
    dificultad: "Media",
    demanda: "Alta",
    compatibilidad: "84%",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400"
  },
  {
    id: "marketing-digital",
    nombre: "Marketing Digital",
    area: "Marketing",
    duracion: "4 años",
    modalidad: "Virtual",
    dificultad: "Baja",
    demanda: "Alta",
    compatibilidad: "80%",
    img: "https://images.unsplash.com/photo-1507207611509-ec012433ff52?w=400"
  },
  {
    id: "psicologia",
    nombre: "Psicología",
    area: "Ciencias Sociales",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Media",
    demanda: "Alta",
    compatibilidad: "89%",
    img: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=400"
  },
  {
    id: "derecho",
    nombre: "Derecho",
    area: "Ciencias Jurídicas",
    duracion: "6 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Alta",
    compatibilidad: "83%",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400"
  },
  {
    id: "arquitectura",
    nombre: "Arquitectura",
    area: "Ingeniería",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Muy Alta",
    demanda: "Media",
    compatibilidad: "78%",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400"
  },
  {
    id: "odontologia",
    nombre: "Odontología",
    area: "Ciencias de la Salud",
    duracion: "6 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Alta",
    compatibilidad: "82%",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267d2?w=400"
  },
  {
    id: "contabilidad",
    nombre: "Contabilidad",
    area: "Administración y Negocios",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Media",
    demanda: "Alta",
    compatibilidad: "81%",
    img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400"
  },
  {
    id: "industrial",
    nombre: "Ingeniería Industrial",
    area: "Ingeniería",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Muy Alta",
    compatibilidad: "87%",
    img: "https://images.unsplash.com/photo-1581091215367-59ab6b243d4d?w=400"
  },
  {
    id: "civil",
    nombre: "Ingeniería Civil",
    area: "Ingeniería",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Muy Alta",
    demanda: "Alta",
    compatibilidad: "85%",
    img: "https://images.unsplash.com/photo-1581091012184-5c46b97d19b4?w=400"
  },
  {
    id: "gastronomia",
    nombre: "Gastronomía",
    area: "Arte y Creatividad",
    duracion: "3 años",
    modalidad: "Presencial",
    dificultad: "Media",
    demanda: "Media",
    compatibilidad: "75%",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400"
  },
  {
    id: "diseno-grafico",
    nombre: "Diseño Gráfico",
    area: "Arte y Creatividad",
    duracion: "3 años",
    modalidad: "Virtual",
    dificultad: "Baja",
    demanda: "Alta",
    compatibilidad: "82%",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400"
  },
  {
    id: "periodismo",
    nombre: "Periodismo",
    area: "Comunicación",
    duracion: "4 años",
    modalidad: "Presencial",
    dificultad: "Media",
    demanda: "Media",
    compatibilidad: "79%",
    img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400"
  },
  {
    id: "veterinaria",
    nombre: "Veterinaria",
    area: "Ciencias de la Salud",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Alta",
    compatibilidad: "83%",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400"
  },
  {
    id: "ambiental",
    nombre: "Ingeniería Ambiental",
    area: "Ingeniería",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Alta",
    compatibilidad: "88%",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400"
  },
  {
    id: "politica",
    nombre: "Ciencias Políticas",
    area: "Ciencias Sociales",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Alta",
    demanda: "Media",
    compatibilidad: "74%",
    img: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400"
  },
  {
    id: "mecatronica",
    nombre: "Ingeniería Mecatrónica",
    area: "Ingeniería",
    duracion: "5 años",
    modalidad: "Presencial",
    dificultad: "Muy Alta",
    demanda: "Muy Alta",
    compatibilidad: "90%",
    img: "https://images.unsplash.com/photo-1581091870627-3b5f4f2d3de1?w=400"
  }
];


// ========================
// 2. GENERAR TARJETAS
// ========================
// ========================
// 2. GENERAR TARJETAS (VERSIÓN MEJORADA)
// ========================
const resultsContainer = document.querySelector(".career-results");

function renderCareers(list) {
  resultsContainer.innerHTML = "";

  list.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("career-card");

    // guardamos metadata en el elemento para luego leerla
    card.dataset.id = c.id;
    card.dataset.category = c.area;
    card.dataset.compat = c.compatibilidad;

    card.innerHTML = `
      <div class="career-card-image">
        <img src="${c.img}" alt="${c.nombre}">
        <div class="career-card-overlay"></div>
        <div class="career-card-badges">
          <span class="career-badge compatibility">${c.compatibilidad} Compatible</span>
        </div>
      </div>

      <div class="career-card-content">
        <span class="career-card-category">${c.area}</span>
        <h3 class="career-card-title">${c.nombre}</h3>
        <p class="career-card-desc">Oportunidades profesionales en ${c.area}</p>

        <div class="career-card-meta">
          <div class="career-meta-item"><i data-lucide="clock"></i><span>${c.duracion}</span></div>
          <div class="career-meta-item"><i data-lucide="users"></i><span>${c.modalidad}</span></div>
          <div class="career-meta-item"><i data-lucide="trending-up"></i><span>Demanda ${c.demanda}</span></div>
        </div>

        <div class="career-card-actions">
          <button class="favorite-btn" data-id="${c.id}" aria-label="Favorito">
            <i data-lucide="heart"></i>
          </button>

          <a class="career-card-btn primary" href="/pages/ExplorarCarreras/detalle-carrera.html?id=${c.id}">
            Ver Detalles
          </a>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });

  // generar iconos lucide (necesario cada vez que creas nuevos botones)
  lucide.createIcons();

  // actualizar estado visual de corazones según localStorage
  updateFavoriteIcons();
}

renderCareers(careers);


// ========================
// 3. FILTROS
// ========================
const nameInput = document.querySelectorAll(".filter-input")[0];
const areaInput = document.querySelectorAll(".filter-input")[1];
const durationSelect = document.querySelectorAll(".filter-select")[0];
const modalitySelect = document.querySelectorAll(".filter-select")[1];
const difficultySelect = document.querySelectorAll(".filter-select")[2];
const demandSelect = document.querySelectorAll(".filter-select")[3];

function applyFilters() {
  let filtered = careers.filter(c => {
    return (
      c.nombre.toLowerCase().includes(nameInput.value.toLowerCase()) &&
      c.area.toLowerCase().includes(areaInput.value.toLowerCase()) &&
      (durationSelect.value === "Cualquier duración" || c.duracion === durationSelect.value) &&
      (modalitySelect.value === "Cualquier modalidad" || c.modalidad === modalitySelect.value) &&
      (difficultySelect.value === "Cualquier nivel" || c.dificultad === difficultySelect.value) &&
      (demandSelect.value === "Cualquier demanda" || c.demanda === demandSelect.value)
    );
  });

  renderCareers(filtered);
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", applyFilters);
});

document.addEventListener("DOMContentLoaded", () => {
  let favorites = JSON.parse(localStorage.getItem("careerFavorites")) || [];

  // ACTUALIZA los corazones al cargar la página
  function updateFavoriteIcons() {
    document.querySelectorAll(".favorite-btn").forEach(btn => {
      const id = btn.dataset.id;

      if (favorites.some(f => f.id === id)) {
        btn.classList.add("active");
        btn.innerHTML = `<i data-lucide="heart"></i>`;
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `<i data-lucide="heart"></i>`;
      }
    });

    lucide.createIcons();
  }

  updateFavoriteIcons();

  // CUANDO HACEN CLICK AL CORAZÓN
  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const card = btn.closest(".career-card");

      const exists = favorites.find(f => f.id === id);

      if (exists) {
        // QUITAR FAVORITO
        favorites = favorites.filter(f => f.id !== id);
      } else {
        // AGREGAR FAVORITO
       // AGREGAR FAVORITO (CORREGIDO)
favorites.push({
  id: id,
  nombre: card.querySelector("h3").textContent,
  area: card.querySelector(".career-card-category").textContent,
  imagen: card.querySelector("img").src,
  url: card.querySelector("a.career-card-btn").href,
  compatibilidad: card.querySelector(".career-badge.compatibility").textContent
});

      }

      localStorage.setItem("careerFavorites", JSON.stringify(favorites));
      updateFavoriteIcons();
    });
  });

});

