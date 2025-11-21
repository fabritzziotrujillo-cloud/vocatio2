
  lucide.createIcons();

  // BASE DE DATOS DE UNIVERSIDADES
  const universidades = {
  upc: {
    nombre: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    tipo: "Privada",
    ubicacion: "Villa / San Isidro, Lima",
    rating: "4.7/5",
    empleabilidad: "92%",

    info_general: {
      fundacion: "1994",
      facultades: "15 facultades",
      estudiantes: "25,000+",
      docentes: "1,500+"
    },

    sedes: [
      { nombre: "Campus San Isidro", direccion: "Av. Paseo de la República 6100", principal: true },
      { nombre: "Campus Monterrico", direccion: "Av. Antares 110" },
      { nombre: "Campus Piura", direccion: "Mz. A Lote 1" }
    ],

    costos: {
      mensual: "$800",
      anual: "$9,600",
      total: "$48,000",
      duracion: "5 años"
    },

    contacto: {
      telefono: "+5116262800",
      email: "admisión@upc.edu.pe",
      web: "www.upc.edu.pe"
    }
  },

  uni: {
    nombre: "Universidad Nacional de Ingeniería (UNI)",
    tipo: "Pública",
    ubicacion: "Rímac, Lima",
    rating: "4.9/5",
    empleabilidad: "95%",

    info_general: {
      fundacion: "1876",
      facultades: "11 facultades",
      estudiantes: "14,000+",
      docentes: "900+"
    },

    sedes: [
      { nombre: "Campus Central", direccion: "Av. Túpac Amaru 210", principal: true }
    ],

    costos: {
      mensual: "S/0",
      anual: "S/0",
      total: "S/0",
      duracion: "5 años"
    },

    contacto: {
      telefono: "+5114811070",
      email: "admision@uni.edu.pe",
      web: "www.uni.edu.pe"
    }
  },

  unmsm: {
    nombre: "Universidad Nacional Mayor de San Marcos (UNMSM)",
    tipo: "Pública",
    ubicacion: "Cercado de Lima",
    rating: "4.8/5",
    empleabilidad: "90%",

    info_general: {
      fundacion: "1551",
      facultades: "20 facultades",
      estudiantes: "35,000+",
      docentes: "2,000+"
    },

    sedes: [
      { nombre: "Ciudad Universitaria", direccion: "Av. Venezuela s/n", principal: true }
    ],

    costos: {
      mensual: "S/0",
      anual: "S/0",
      total: "S/0",
      duracion: "5 años"
    },

    contacto: {
      telefono: "+5116197000",
      email: "admision@unmsm.edu.pe",
      web: "www.unmsm.edu.pe"
    }
  },
  pucp: {
  nombre: "Pontificia Universidad Católica del Perú (PUCP)",
  tipo: "Privada",
  ubicacion: "San Miguel, Lima",
  rating: "4.8/5",
  empleabilidad: "93%",

  info_general: {
    fundacion: "1917",
    facultades: "18 facultades",
    estudiantes: "25,000+",
    docentes: "1,800+"
  },

  sedes: [
    { nombre: "Campus PUCP", direccion: "Av. Universitaria 1801", principal: true }
  ],

  costos: {
    mensual: "$720",
    anual: "$8,640",
    total: "$43,200",
    duracion: "5 años"
  },

  contacto: {
    telefono: "+5116262000",
    email: "admision@pucp.edu.pe",
    web: "www.pucp.edu.pe"
  }
},

utp: {
  nombre: "Universidad Tecnológica del Perú (UTP)",
  tipo: "Privada",
  ubicacion: "Cercado de Lima / Arequipa / Chiclayo",
  rating: "4.3/5",
  empleabilidad: "82%",

  info_general: {
    fundacion: "1997",
    facultades: "10 facultades",
    estudiantes: "30,000+",
    docentes: "1,200+"
  },

  sedes: [
    { nombre: "Lima Centro", direccion: "Av. Petit Thouars 4653", principal: true },
    { nombre: "Arequipa", direccion: "Av. Tacna y Arica 160" }
  ],

  costos: {
    mensual: "$420",
    anual: "$5,040",
    total: "$25,200",
    duracion: "5 años"
  },

  contacto: {
    telefono: "+5113159600",
    email: "informes@utp.edu.pe",
    web: "www.utp.edu.pe"
  }
},

usil: {
  nombre: "Universidad San Ignacio de Loyola (USIL)",
  tipo: "Privada",
  ubicacion: "La Molina, Lima",
  rating: "4.5/5",
  empleabilidad: "88%",

  info_general: {
    fundacion: "1995",
    facultades: "14 facultades",
    estudiantes: "20,000+",
    docentes: "1,100+"
  },

  sedes: [
    { nombre: "Campus La Molina", direccion: "Av. La Fontana 750", principal: true }
  ],

  costos: {
    mensual: "$650",
    anual: "$7,800",
    total: "$39,000",
    duracion: "5 años"
  },

  contacto: {
    telefono: "+5113171000",
    email: "informes@usil.edu.pe",
    web: "www.usil.edu.pe"
  }
},

ucv: {
  nombre: "Universidad César Vallejo (UCV)",
  tipo: "Privada",
  ubicacion: "Lima / Trujillo / Piura",
  rating: "4.2/5",
  empleabilidad: "75%",

  info_general: {
    fundacion: "1991",
    facultades: "12 facultades",
    estudiantes: "50,000+",
    docentes: "2,500+"
  },

  sedes: [
    { nombre: "Lima Norte", direccion: "Av. Panamericana Norte 7200", principal: true },
    { nombre: "Trujillo", direccion: "Av. Larco 1770" }
  ],

  costos: {
    mensual: "$350",
    anual: "$4,200",
    total: "$21,000",
    duracion: "5 años"
  },

  contacto: {
    telefono: "+5112024342",
    email: "informes@ucv.edu.pe",
    web: "www.ucv.edu.pe"
  }
},

unfv: {
  nombre: "Universidad Nacional Federico Villarreal (UNFV)",
  tipo: "Pública",
  ubicacion: "Lima Cercado",
  rating: "4.4/5",
  empleabilidad: "85%",

  info_general: {
    fundacion: "1963",
    facultades: "18 facultades",
    estudiantes: "22,000+",
    docentes: "1,300+"
  },

  sedes: [
    { nombre: "Campus Central", direccion: "Av. Nicolás de Piérola 351", principal: true }
  ],

  costos: {
    mensual: "S/0",
    anual: "S/0",
    total: "S/0",
    duracion: "5 años"
  },

  contacto: {
    telefono: "+5113300066",
    email: "admision@unfv.edu.pe",
    web: "www.unfv.edu.pe"
  }
}

};

 lucide.createIcons();

// obtener id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// obtener universidad
const uni = universidades[id] || universidades["upc"];

// TÍTULO DEL NAVEGADOR
document.title = `${uni.nombre} - OrientaVocacional`;

// BREADCRUMB
document.querySelector(".breadcrumb-current").textContent = uni.nombre;

// HEADER
document.querySelector(".uni-detail-title").textContent = uni.nombre;

// TIPO
document.querySelector(".type-badge").textContent = uni.tipo.toUpperCase();

// UBICACIÓN
document.querySelectorAll(".quick-info-item")[1]
  .querySelector(".quick-value").textContent = uni.ubicacion;

// RATING
document.querySelectorAll(".quick-info-item")[2]
  .querySelector(".quick-value").innerHTML = `<i data-lucide="star"></i> ${uni.rating}`;

// EMPLEABILIDAD
document.querySelectorAll(".quick-info-item")[3]
  .querySelector(".quick-value").textContent = uni.empleabilidad;

// INFORMACIÓN GENERAL
document.querySelector(".info-rows").innerHTML = `
  <div class="info-row"><span class="info-label">Fundación</span><span class="info-value">${uni.info_general.fundacion}</span></div>
  <div class="info-row"><span class="info-label">Facultades</span><span class="info-value">${uni.info_general.facultades}</span></div>
  <div class="info-row"><span class="info-label">Estudiantes</span><span class="info-value">${uni.info_general.estudiantes}</span></div>
  <div class="info-row"><span class="info-label">Docentes</span><span class="info-value">${uni.info_general.docentes}</span></div>
`;

// SEDES
document.querySelector(".locations-list").innerHTML = uni.sedes.map(s => `
  <div class="location-item">
    <div class="location-header">
      <strong>${s.nombre}</strong>
      ${s.principal ? `<span class="location-badge">Principal</span>` : ""}
    </div>
    <p>${s.direccion}</p>
  </div>
`).join("");

// COSTOS
document.querySelector(".cost-item:nth-child(1) .cost-value").textContent = uni.costos.mensual;
document.querySelector(".cost-item:nth-child(2) .cost-value").textContent = uni.costos.anual;
document.querySelector(".cost-item:nth-child(3) .cost-value").textContent = uni.costos.duracion;
document.querySelector(".cost-item:nth-child(4) .cost-value").textContent = uni.costos.total;

// CONTACTO
document.querySelector(".contact-info").innerHTML = `
  <p><strong>Teléfono:</strong><br><a href="tel:${uni.contacto.telefono}">${uni.contacto.telefono}</a></p>
  <p><strong>Email:</strong><br><a href="mailto:${uni.contacto.email}">${uni.contacto.email}</a></p>
  <p><strong>Web oficial:</strong><br><a href="https://${uni.contacto.web}" target="_blank">${uni.contacto.web}</a></p>
`;
lucide.createIcons();
