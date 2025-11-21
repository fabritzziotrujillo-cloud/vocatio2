/* ============================================
   CARGA DINÁMICA DE INFORMACIÓN DE UNA CARRERA
   Archivo único con datos completos para 20 carreras
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const careerId = params.get("id");

  if (!careerId) {
    console.error("❌ No se recibió ID de carrera en la URL");
    return;
  }

  const careers = {
    software: {
      nombre: "Ingeniería de Software",
      descripcion:
        "La Ingeniería de Software forma profesionales capaces de diseñar, desarrollar, probar y mantener sistemas de software complejos. Combina fundamentos teóricos con proyectos prácticos, metodologías ágiles y prácticas de calidad para entregar soluciones escalables.",
      duracion: "5 años",
      salario: "$4,500",
      demanda: "Muy Alta",
      universidades: "12",
      categoria: "Tecnología",
      compatibilidad: "92%",
      heroDesc: "Desarrollo de aplicaciones y sistemas modernos",
      // malla: arreglo flexible: puede contener strings o objetos {year: x, courses: []}
      malla: [
        { year: 1, courses: ["Programación I", "Matemáticas para Computación I", "Fundamentos de Algoritmos", "Inglés I"] },
        { year: 2, courses: ["Programación II", "Estructuras de Datos", "Matemáticas II", "Bases de Datos I"] },
        { year: 3, courses: ["Ingeniería de Software", "Bases de Datos II", "Desarrollo Web", "Pruebas de Software"] },
        { year: 4, courses: ["Arquitectura de Software", "DevOps y Cloud", "Metodologías Ágiles", "Seguridad Informática"] },
        { year: 5, courses: ["Proyecto Integrador", "Optativas de Especialización", "Prácticas Profesionales"] }
      ],
      perfil: [
        "Pensamiento lógico y analítico",
        "Gusto por la tecnología",
        "Capacidad de trabajar en equipo",
        "Orientación a la resolución de problemas",
        "Interés por aprender nuevas tecnologías"
      ],
      competencias: [
        "Programación en varios lenguajes",
        "Diseño y arquitectura de software",
        "Metodologías ágiles (Scrum, Kanban)",
        "Testing y aseguramiento de calidad",
        "Integración y despliegue continuo (CI/CD)"
      ],
      campo: [
        "Empresas tecnológicas",
        "Startups",
        "Bancos y fintech",
        "Consultoras de software",
        "Proyectos freelance y emprendimientos"
      ],
      puestos: [
        { title: "Desarrollador Full Stack", salary: "$3,000 - $6,000" },
        { title: "QA Tester / Engineer", salary: "$1,800 - $4,000" },
        { title: "Arquitecto de Software", salary: "$6,000 - $12,000" },
        { title: "DevOps Engineer", salary: "$4,000 - $9,000" }
      ],
      crecimiento: {
        text: "Demanda creciente por transformación digital; alta movilidad internacional y posibilidad de especialización en IA, cloud o seguridad.",
        empleabilidad: "95%",
        avgInsertionTime: "6 meses",
        worksInArea: "88%"
      },
      testimonios: [
        { name: "Ana L.", info: "Egresada • UPC", text: "La carrera me permitió crear mi propia startup y entender todo el ciclo de desarrollo." },
        { name: "Carlos R.", info: "Dev en startup", text: "Conseguí trabajo antes de graduarme gracias a los proyectos prácticos." }
      ]
    },

    desarrolloAplicaciones: {
      nombre: "Desarrollo de Aplicaciones",
      descripcion:
        "Programa práctico enfocado en la creación de aplicaciones móviles, web y de escritorio. Ideal para quienes quieren entrar rápido al mercado laboral con habilidades de desarrollo front y back.",
      duracion: "3 años",
      salario: "$3,200",
      demanda: "Muy Alta",
      universidades: "15",
      categoria: "Tecnología",
      compatibilidad: "90%",
      heroDesc: "Crea aplicaciones modernas y eficientes para usuarios reales",
      malla: [
        { year: 1, courses: ["Fundamentos de Programación", "HTML/CSS/JS", "Bases de Datos I", "UX/UI Básico"] },
        { year: 2, courses: ["Desarrollo Web Frontend", "Programación Backend", "APIs y Microservicios", "Aplicaciones Móviles I"] },
        { year: 3, courses: ["Aplicaciones Móviles II", "Integración Continua", "Proyecto Final", "Prácticas Profesionales"] }
      ],
      perfil: ["Creativo", "Orientado a la usabilidad", "Ganas de aprender rápido", "Trabajo práctico"],
      competencias: ["Programación móvil", "Frameworks modernos (React, Flutter)", "Diseño UI/UX", "Consumo e integración de APIs"],
      campo: ["Startups", "Empresas de desarrollo", "Freelance", "Agencias digitales"],
      puestos: [
        { title: "Desarrollador Mobile", salary: "$2,000 - $4,500" },
        { title: "Frontend Developer", salary: "$2,200 - $5,000" },
        { title: "Backend Developer", salary: "$2,500 - $6,000" }
      ],
      crecimiento: { text: "Alta demanda por apps móviles y web; muchas oportunidades freelance y para trabajo remoto.", empleabilidad: "92%", avgInsertionTime: "4 meses", worksInArea: "82%" },
      testimonios: [
        { name: "Daniel", info: "Estudiante 2do año", text: "Hice mi primera app en el primer ciclo y encontré freelance enseguida." },
        { name: "Elena", info: "Egresada", text: "Trabajo en una agencia desde el primer mes de prácticas." }
      ]
    },

    medicina: {
      nombre: "Medicina",
      descripcion:
        "Formación integral del profesional de la salud orientada al diagnóstico, tratamiento y prevención. Incluye ciencias básicas, formación clínica e internado rotatorio en hospitales.",
      duracion: "7 años",
      salario: "$5,200",
      demanda: "Muy Alta",
      universidades: "10",
      categoria: "Ciencias de la Salud",
      compatibilidad: "86%",
      heroDesc: "Diagnóstico, tratamiento y bienestar de las personas",
      malla: [
        { year: 1, courses: ["Anatomía", "Fisiología", "Bioquímica"] },
        { year: 2, courses: ["Microbiología", "Farmacología", "Semiología"] },
        { year: 3, courses: ["Medicina Interna", "Pediatría", "Cirugía básica"] },
        { year: 4, courses: ["Ginecología y Obstetricia", "Psiquiatría"] },
        { year: 5, courses: ["Internado rotatorio", "Prácticas clínicas avanzadas"] }
      ],
      perfil: ["Vocación de servicio", "Resistencia al estrés", "Buen juicio clínico", "Ética profesional"],
      competencias: ["Evaluación clínica", "Toma de decisiones", "Comunicación con pacientes"],
      campo: ["Hospitales públicos y privados", "Consultorios", "Investigación", "Docencia"],
      puestos: [
        { title: "Médico General", salary: "$2,800 - $5,500" },
        { title: "Residente / Especialista", salary: "$4,000 - $10,000+" }
      ],
      crecimiento: { text: "Demanda constante y posibilidades de especialización; altas exigencias para residencias.", empleabilidad: "90%", avgInsertionTime: "12 meses (dependiendo de la especialidad)", worksInArea: "80%" },
      testimonios: [
        { name: "Dr. Ruiz", info: "Egresado", text: "Ser médico exige disciplina, pero la recompensa en impacto social es enorme." }
      ]
    },

    enfermeria: {
      nombre: "Enfermería",
      descripcion: "Formación orientada al cuidado directo del paciente, procedimientos clínicos, gestión de enfermagem y trabajo en equipos de salud.",
      duracion: "5 años",
      salario: "$2,400",
      demanda: "Muy Alta",
      universidades: "17",
      categoria: "Salud",
      compatibilidad: "88%",
      heroDesc: "Atención humana y profesional al paciente",
      malla: [
        { year: 1, courses: ["Fundamentos de Enfermería", "Anatomía", "Bioquímica"] },
        { year: 2, courses: ["Cuidados Medulares", "Farmacología", "Prácticas clínicas I"] },
        { year: 3, courses: ["Cuidados Críticos", "Salud Comunitaria", "Prácticas avanzadas"] }
      ],
      perfil: ["Paciencia", "Empatía", "Responsabilidad", "Toma de decisiones bajo presión"],
      competencias: ["Cuidados clínicos", "Administración de medicamentos", "Educación sanitaria"],
      campo: ["Hospitales", "Clínicas privadas", "Centros de salud comunitarios"],
      puestos: [
        { title: "Enfermero/a", salary: "$1,200 - $3,000" },
        { title: "Coordinador de enfermería", salary: "$2,000 - $4,500" }
      ],
      crecimiento: { text: "Alta demanda y opciones para especializarse en cuidados intensivos, neonatología o gestión hospitalaria.", empleabilidad: "93%", avgInsertionTime: "3-6 meses", worksInArea: "86%" },
      testimonios: [
        { name: "M. Cruz", info: "Egresada", text: "Es una carrera noble y con oportunidades en muchos países." }
      ]
    },

    administracion: {
      nombre: "Administración de Empresas",
      descripcion: "Formación en gestión, finanzas, recursos humanos y estrategia para dirigir organizaciones públicas o privadas.",
      duracion: "4 años",
      salario: "$2,600",
      demanda: "Alta",
      universidades: "23",
      categoria: "Negocios",
      compatibilidad: "85%",
      heroDesc: "Gestión empresarial y toma de decisiones",
      malla: ["Introducción a la Administración", "Economía", "Contabilidad", "Marketing", "Gestión Financiera"],
      perfil: ["Liderazgo", "Capacidad analítica", "Comunicación"],
      competencias: ["Planificación estratégica", "Gestión de equipos", "Análisis financiero"],
      campo: ["Empresas privadas", "ONGs", "Sector público", "Consultoría"],
      puestos: [
        { title: "Analista de operaciones", salary: "$1,400 - $3,000" },
        { title: "Gerente de producto / proyecto", salary: "$3,000 - $7,000" }
      ],
      crecimiento: { text: "Alta versatilidad laboral; posibilidad de emprendimiento y movilidad a roles gerenciales.", empleability: "88%", avgInsertionTime: "4 meses", worksInArea: "75%" },
      testimonios: [
        { name: "D. Ramos", info: "Egresado", text: "La formación me permitió desempeñarme en varias áreas de la empresa." }
      ]
    },

    "marketing-digital": {
      nombre: "Marketing Digital",
      descripcion: "Estrategias online, analítica de audiencias, SEO/SEM, contenido y publicidad en plataformas digitales.",
      duracion: "4 años",
      salario: "$2,800",
      demanda: "Alta",
      universidades: "18",
      categoria: "Marketing",
      compatibilidad: "80%",
      heroDesc: "Estrategias digitales y posicionamiento online",
      malla: ["SEO y SEM", "Analítica web", "Publicidad en redes", "Branding digital"],
      perfil: ["Creativo", "Analítico", "Orientado a resultados"],
      competencias: ["Analítica de datos", "Gestión de campañas", "Estrategia de contenidos"],
      campo: ["Agencias digitales", "Empresas con equipo de marketing", "Freelance"],
      puestos: [
        { title: "Social Media Manager", salary: "$1,200 - $3,000" },
        { title: "Performance Marketer", salary: "$2,000 - $5,000" }
      ],
      crecimiento: { text: "Crecimiento sostenido por el comercio electrónico y la publicidad digital.", empleability: "86%", avgInsertionTime: "3 meses", worksInArea: "70%" },
      testimonios: [
        { name: "Lucía", info: "Community Manager", text: "La demanda por habilidades digitales es constante y práctica." }
      ]
    },

    psicologia: {
      nombre: "Psicología",
      descripcion: "Estudio del comportamiento humano, diagnóstico y acompañamiento psicológico en contextos clínicos, educativos y organizacionales.",
      duracion: "5 años",
      salario: "$2,700",
      demanda: "Muy Alta",
      universidades: "20",
      categoria: "Salud",
      compatibilidad: "89%",
      heroDesc: "Comprender y mejorar la conducta humana",
      malla: ["Psicología General", "Psicología Clínica", "Psicología Social", "Prácticas Clínicas"],
      perfil: ["Empatía", "Escucha activa", "Capacidad de análisis"],
      competencias: ["Evaluación psicológica", "Intervención clínica", "Aplicación de pruebas"],
      campo: ["Clínicas", "Colegios", "Recursos humanos"],
      puestos: [
        { title: "Psicólogo clínico", salary: "$1,500 - $3,500" },
        { title: "Psicólogo organizacional", salary: "$2,000 - $5,000" }
      ],
      crecimiento: { text: "Mayor conciencia sobre salud mental impulsa demanda en múltiples sectores.", empleability: "90%", avgInsertionTime: "4 meses", worksInArea: "78%" },
      testimonios: [
        { name: "L. Ortega", info: "Egresada", text: "Ayudar a otras personas es lo que más me motiva de esta profesión." }
      ]
    },

    derecho: {
      nombre: "Derecho",
      descripcion: "Formación en legislación, litigio, asesoría jurídica y ética profesional; prepara para ejercer en despachos, empresas o el sector público.",
      duracion: "6 años",
      salario: "$2,500",
      demanda: "Alta",
      universidades: "22",
      categoria: "Sociales",
      compatibilidad: "90%",
      heroDesc: "Defensa legal, justicia y asesoría jurídica",
      malla: ["Derecho Civil", "Derecho Penal", "Procesal", "Derecho Constitucional"],
      perfil: ["Orden", "Pensamiento crítico", "Buena redacción"],
      competencias: ["Interpretación de normas", "Litigación", "Redacción jurídica"],
      campo: ["Despachos legales", "Departamentos legales", "Organismos públicos"],
      puestos: [
        { title: "Abogado junior", salary: "$1,200 - $2,800" },
        { title: "Asesor legal", salary: "$2,500 - $6,000" }
      ],
      crecimiento: { text: "Constante necesidad de asesoría legal en empresas y el Estado.", empleability: "85%", avgInsertionTime: "6 meses", worksInArea: "74%" },
      testimonios: [
        { name: "M. Díaz", info: "Egresado", text: "Trabajar en derecho implica responsabilidad social y aprendizaje continuo." }
      ]
    },

    arquitectura: {
      nombre: "Arquitectura",
      descripcion: "Diseño arquitectónico, urbanismo y gestión de obras; combina creatividad con conocimientos técnicos en construcción y normas.",
      duracion: "5 años",
      salario: "$3,500",
      demanda: "Alta",
      universidades: "14",
      categoria: "Ingeniería",
      compatibilidad: "84%",
      heroDesc: "Diseño creativo y planificación de espacios",
      malla: ["Diseño I-V", "Materiales y Construcción", "Urbanismo", "Prácticas de taller"],
      perfil: ["Creatividad", "Visión espacial", "Trabajo en equipo"],
      competencias: ["Diseño arquitectónico", "Modelado 3D", "Gestión de proyectos"],
      campo: ["Constructoras", "Estudios de arquitectura", "Sector público"],
      puestos: [
        { title: "Arquitecto proyectista", salary: "$1,800 - $4,500" },
        { title: "Urbanista", salary: "$2,200 - $5,000" }
      ],
      crecimiento: { text: "Demanda por obras sostenibles y renovación urbana.", empleability: "80%", avgInsertionTime: "6 meses", worksInArea: "70%" },
      testimonios: [
        { name: "Sofía", info: "Egresada", text: "Diseñar espacios que la gente disfrute es increíblemente gratificante." }
      ]
    },

    odontologia: {
      nombre: "Odontología",
      descripcion: "Formación para el cuidado integral de la salud bucal: prevención, diagnóstico y tratamiento de patologías odontológicas.",
      duracion: "6 años",
      salario: "$3,400",
      demanda: "Alta",
      universidades: "13",
      categoria: "Ciencias de la Salud",
      compatibilidad: "82%",
      heroDesc: "Salud bucal y atención odontológica",
      malla: ["Anatomía dental", "Prácticas clínicas", "Endodoncia", "Ortodoncia"],
      perfil: ["Destreza manual", "Empatía", "Responsabilidad"],
      competencias: ["Procedimientos clínicos", "Diagnóstico radiográfico"],
      campo: ["Clínicas privadas", "Consultorios", "Salud pública"],
      puestos: [
        { title: "Odontólogo general", salary: "$1,800 - $4,000" },
        { title: "Especialista (Ortodoncia/Endodoncia)", salary: "$3,500 - $8,000" }
      ],
      crecimiento: { text: "Salud oral como prioridad de prevención; opciones privadas y públicas.", empleability: "84%", avgInsertionTime: "6-9 meses", worksInArea: "76%" },
      testimonios: [
        { name: "J. Paredes", info: "Egresado", text: "La práctica clínica desde temprano prepara bien para la profesión." }
      ]
    },

    contabilidad: {
      nombre: "Contabilidad",
      descripcion: "Control y análisis de la información financiera, auditoría y gestión tributaria para empresas de distintos tamaños.",
      duracion: "5 años",
      salario: "$2,900",
      demanda: "Alta",
      universidades: "19",
      categoria: "Negocios",
      compatibilidad: "82%",
      heroDesc: "Gestión financiera y auditoría",
      malla: ["Contabilidad I-IV", "Auditoría", "Impuestos", "Finanzas"],
      perfil: ["Precisión", "Ética", "Organización"],
      competencias: ["Auditoría", "Análisis financiero", "Normativa tributaria"],
      campo: ["Empresas", "Despachos contables", "Sector público"],
      puestos: [
        { title: "Contador junior", salary: "$1,200 - $2,500" },
        { title: "Auditor", salary: "$2,000 - $5,000" }
      ],
      crecimiento: { text: "Necesidad constante de cumplimiento financiero y tributario; opciones en consultoría.", empleability: "86%", avgInsertionTime: "4 meses", worksInArea: "72%" },
      testimonios: [
        { name: "A. Soto", info: "Egresado", text: "Buena estabilidad laboral y posibilidades en el extranjero." }
      ]
    },

    industrial: {
      nombre: "Ingeniería Industrial",
      descripcion: "Optimización de procesos productivos, logística y gestión de operaciones para mejorar eficiencia y calidad.",
      duracion: "5 años",
      salario: "$3,600",
      demanda: "Muy Alta",
      universidades: "16",
      categoria: "Ingeniería",
      compatibilidad: "87%",
      heroDesc: "Optimización de procesos y operaciones",
      malla: ["Logística", "Gestión de Operaciones", "Calidad", "Ingeniería de Procesos"],
      perfil: ["Analítico", "Organizado", "Liderazgo"],
      competencias: ["Mejora continua", "Gestión de cadena de suministro"],
      campo: ["Industria manufacturera", "Consultoría", "Logística"],
      puestos: [
        { title: "Ingeniero de procesos", salary: "$2,400 - $5,000" },
        { title: "Coordinador de producción", salary: "$2,000 - $4,500" }
      ],
      crecimiento: { text: "Alta demanda por eficiencia y digitalización industrial.", empleability: "89%", avgInsertionTime: "4 meses", worksInArea: "80%" },
      testimonios: [
        { name: "M. López", info: "Egresado", text: "Gran área para combinar técnica y gestión." }
      ]
    },

    civil: {
      nombre: "Ingeniería Civil",
      descripcion: "Diseño y construcción de infraestructura y obras civiles, con énfasis en seguridad estructural y gestión de proyectos.",
      duracion: "5 años",
      salario: "$3,800",
      demanda: "Alta",
      universidades: "15",
      categoria: "Ingeniería",
      compatibilidad: "85%",
      heroDesc: "Construcción de infraestructura y obras civiles",
      malla: ["Cálculo", "Estática", "Concreto", "Gestión de Obras"],
      perfil: ["Precisión", "Pensamiento matemático", "Responsabilidad"],
      competencias: ["Diseño estructural", "Gestión de obra"],
      campo: ["Constructoras", "Consultoras", "Sector público"],
      puestos: [
        { title: "Ingeniero residente", salary: "$2,500 - $5,500" },
        { title: "Obra civil", salary: "$2,000 - $6,000" }
      ],
      crecimiento: { text: "Crecimiento impulsado por inversión en infraestructura.", empleability: "83%", avgInsertionTime: "6 meses", worksInArea: "72%" },
      testimonios: [
        { name: "J. Torres", info: "Egresado", text: "Ver tus obras construidas es una satisfacción única." }
      ]
    },

    gastronomia: {
      nombre: "Gastronomía",
      descripcion: "Formación en técnicas culinarias, gestión de cocina y cultura gastronómica; combina creatividad y disciplina operacional.",
      duracion: "3 años",
      salario: "$2,200",
      demanda: "Alta",
      universidades: "21",
      categoria: "Arte",
      compatibilidad: "79%",
      heroDesc: "Creatividad culinaria y experiencia sensorial",
      malla: ["Cocina peruana", "Cocina internacional", "Gestión de restaurantes"],
      perfil: ["Creatividad", "Resistencia física", "Trabajo en equipo"],
      competencias: ["Técnicas culinarias", "Gestión de costo de alimentos"],
      campo: ["Restaurantes", "Hotelería", "Eventos"],
      puestos: [
        { title: "Chef", salary: "$1,200 - $4,500" },
        { title: "Sous Chef", salary: "$1,000 - $3,000" }
      ],
      crecimiento: { text: "Alza por turismo y cultura gastronómica; muchas oportunidades en emprendimientos.", empleability: "78%", avgInsertionTime: "3-5 meses", worksInArea: "65%" },
      testimonios: [
        { name: "Rosa", info: "Chef", text: "La gastronomía es arte que se come." }
      ]
    },

    "diseno-grafico": {
      nombre: "Diseño Gráfico",
      descripcion: "Comunicación visual para branding, publicidad e interfaces digitales; combina creatividad y herramientas digitales.",
      duracion: "4 años",
      salario: "$2,500",
      demanda: "Alta",
      universidades: "18",
      categoria: "Arte",
      compatibilidad: "81%",
      heroDesc: "Creatividad visual y diseño digital",
      malla: ["Branding", "Ilustración", "Diseño digital", "Tipografía"],
      perfil: ["Creativo", "Sentido estético", "Manejo de herramientas digitales"],
      competencias: ["Diseño visual", "Branding", "UX básico"],
      campo: ["Agencias", "Estudios creativos", "Freelance"],
      puestos: [
        { title: "Diseñador gráfico", salary: "$1,000 - $3,000" },
        { title: "Director de arte", salary: "$2,500 - $6,000" }
      ],
      crecimiento: { text: "Demanda por contenido visual y marcas digitales.", empleability: "82%", avgInsertionTime: "3 meses", worksInArea: "68%" },
      testimonios: [
        { name: "Eli", info: "Diseñador", text: "El diseño es una forma de comunicación muy poderosa." }
      ]
    },

    periodismo: {
      nombre: "Periodismo",
      descripcion: "Formación en investigación, redacción y comunicación digital; prepara para medios tradicionales y nuevas plataformas.",
      duracion: "4 años",
      salario: "$2,300",
      demanda: "Media",
      universidades: "14",
      categoria: "Sociales",
      compatibilidad: "79%",
      heroDesc: "Comunicación veraz y análisis informativo",
      malla: ["Redacción", "Investigación", "Medios digitales", "Reportaje"],
      perfil: ["Curiosidad", "Ética", "Capacidad de síntesis"],
      competencias: ["Redacción", "Entrevista", "Verificación de fuentes"],
      campo: ["Medios", "Comunicación corporativa", "Freelance"],
      puestos: [
        { title: "Reportero", salary: "$900 - $2,500" },
        { title: "Editor", salary: "$1,500 - $4,000" }
      ],
      crecimiento: { text: "Transformación digital obliga a adaptarse a formatos multiplataforma.", empleability: "70%", avgInsertionTime: "4 meses", worksInArea: "60%" },
      testimonios: [
        { name: "Lucía", info: "Periodista", text: "Informar es un deber y una responsabilidad." }
      ]
    },

    biologia: {
      nombre: "Biología",
      descripcion: "Estudio de organismos, ecosistemas y procesos biológicos; incluye prácticas de laboratorio e investigación científica.",
      duracion: "5 años",
      salario: "$3,000",
      demanda: "Media",
      universidades: "11",
      categoria: "Ciencia",
      compatibilidad: "84%",
      heroDesc: "Ciencia y estudio de la vida",
      malla: ["Genética", "Zoología", "Botánica", "Laboratorio"]
}
  };

  const data = careers[careerId];

  if (!data) {
    console.error("❌ Carrera no encontrada: " + careerId);
    return;
  }

  // ===============================
  // ASIGNACIÓN A ELEMENTOS DEL HTML
  // ===============================

  // HERO
  document.querySelector(".career-hero-title").textContent = data.nombre;
  document.querySelector(".career-hero-desc").textContent = data.heroDesc;

  // Badges
  document.querySelector(".career-badge.primary").textContent = data.categoria;
  document.querySelector(".career-badge.success").textContent = data.compatibilidad;

  // Información principal
  const info = document.querySelectorAll(".career-info-value");
  info[0].textContent = data.duracion;
  info[1].textContent = data.salario;
  info[2].textContent = data.demanda;
  info[3].textContent = data.universidades;

  // Descripción general
  document.querySelector(".career-description p").textContent = data.descripcion;

  // Secciones dinámicas
// ===============================
// SECCIONES DINÁMICAS
// ===============================

// Función única y correcta:
function renderList(selector, list) {
  const container = document.querySelector(selector);
  container.innerHTML = "";

  if (!list) return;

  list.forEach(item => {
    const li = document.createElement("li");

    if (typeof item === "string") {
      li.textContent = item;
    }

    else if (typeof item === "object") {

      // MALLA curricular
      if (item.year && item.courses) {
        li.innerHTML = `<strong>Año ${item.year}:</strong> ${item.courses.join(", ")}`;
      }

      // Puestos laborales
      else if (item.title && item.salary) {
        li.innerHTML = `<strong>${item.title}</strong> — ${item.salary}`;
      }

      // Testimonios
      else if (item.name && item.text) {
        li.innerHTML = `<strong>${item.name}</strong> (${item.info}): “${item.text}”`;
      }

      else {
        li.textContent = JSON.stringify(item);
      }
    }

    container.appendChild(li);
  });
}

// Descripción
document.querySelector("#career-description").textContent = data.descripcion;

// Perfil
renderList("#career-profile-ideal", data.perfil);

// Competencias
renderList("#career-competencies", data.competencias);

// Malla curricular
renderList("#career-curriculum", data.malla);

// Campo laboral
renderList("#career-work-areas", data.campo);

// Puestos laborales
document.querySelector("#career-positions").innerHTML = data.puestos
  .map(p => `
    <div class="position-item">
      <strong>${p.title}</strong> — ${p.salary}
    </div>
  `)
  .join("");

// Crecimiento profesional
document.querySelector("#career-growth-text").textContent = data.crecimiento.text;
document.querySelector("#growth-employability").textContent = data.crecimiento.empleabilidad;
document.querySelector("#growth-time").textContent = data.crecimiento.avgInsertionTime;
document.querySelector("#growth-area").textContent = data.crecimiento.worksInArea;

// Testimonios
document.querySelector("#career-testimonials").innerHTML = data.testimonios
  .map(t => `
    <div class="testimonial-card">
      <p class="testimonial-text">"${t.text}"</p>
      <p class="testimonial-author">— ${t.name}, ${t.info}</p>
    </div>
  `)
  .join("");
});