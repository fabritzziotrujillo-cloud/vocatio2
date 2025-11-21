
document.addEventListener("DOMContentLoaded", () => {

  const careersDB = [
    { id: 1, name: "Administración de Empresas", img: "img/carreras/admin.jpg" },
    { id: 2, name: "Arquitectura", img: "img/carreras/arq.jpg" },
    { id: 3, name: "Biología", img: "img/carreras/bio.jpg" },
    { id: 4, name: "Ciencias de la Comunicación", img: "img/carreras/comu.jpg" },
    { id: 5, name: "Contabilidad", img: "img/carreras/conta.jpg" },
    { id: 6, name: "Derecho", img: "img/carreras/derecho.jpg" },
    { id: 7, name: "Diseño Gráfico", img: "img/carreras/diseno.jpg" },
    { id: 8, name: "Economía", img: "img/carreras/economia.jpg" },
    { id: 9, name: "Educación Inicial", img: "img/carreras/edu.jpg" },
    { id: 10, name: "Enfermería", img: "img/carreras/enfer.jpg" },
    { id: 11, name: "Ingeniería Civil", img: "img/carreras/civil.jpg" },
    { id: 12, name: "Ingeniería de Sistemas", img: "img/carreras/sistemas.jpg" },
    { id: 13, name: "Ingeniería Industrial", img: "img/carreras/industrial.jpg" },
    { id: 14, name: "Ingeniería Mecánica", img: "img/carreras/mecanica.jpg" },
    { id: 15, name: "Ingeniería Ambiental", img: "img/carreras/ambiental.jpg" },
    { id: 16, name: "Marketing", img: "img/carreras/marketing.jpg" },
    { id: 17, name: "Medicina Humana", img: "img/carreras/medicina.jpg" },
    { id: 18, name: "Odontología", img: "img/carreras/odonto.jpg" },
    { id: 19, name: "Psicología", img: "img/carreras/psico.jpg" },
    { id: 20, name: "Turismo y Hotelería", img: "img/carreras/turismo.jpg" }
  ];

  const LISTS_KEY = "careerLists";

  const form = document.querySelector(".create-list-form");
  const nameInput = form.querySelector(".form-input");
  const descInput = form.querySelector(".form-textarea");
  const careerContainer = document.querySelector("#career-selector");

  
  // ---------------------------------------------
  // 1. RENDERIZAR CHECKBOXES CON IDS (CORRECTO)
  // ---------------------------------------------
  function renderCareerCheckboxes(selectedIds = []) {
    careerContainer.innerHTML = "";

    careersDB.forEach(career => {
      const checkboxId = `career-${career.id}`;

      const label = document.createElement("label");
      label.className = "career-option";

      label.innerHTML = `
        <input type="checkbox" class="career-checkbox" id="${checkboxId}" value="${career.id}">
        <span>${career.name}</span>
      `;

      if (selectedIds.includes(career.id)) {
        label.querySelector("input").checked = true;
      }

      careerContainer.appendChild(label);
    });
  }


  // ---------------------------------------------
  // 2. CARGAR LISTA PARA EDITAR
  // ---------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("id");
  let allLists = JSON.parse(localStorage.getItem(LISTS_KEY)) || [];
  let editingList = allLists.find(l => String(l.id) === String(editId)) || null;

  if (editingList) {
    nameInput.value = editingList.name;
    descInput.value = editingList.description || "";
    renderCareerCheckboxes(editingList.careers);
  } else {
    renderCareerCheckboxes();
  }


  // ---------------------------------------------
  // 3. GUARDAR LISTA
  // ---------------------------------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    const selectedIds = Array.from(
      document.querySelectorAll(".career-checkbox:checked")
    ).map(cb => Number(cb.value));

    if (!name) return alert("Debes escribir un nombre.");
    if (selectedIds.length === 0) return alert("Selecciona al menos una carrera.");

    allLists = JSON.parse(localStorage.getItem(LISTS_KEY)) || [];

    if (editingList) {
      // editar
      const index = allLists.findIndex(l => String(l.id) === String(editId));
      allLists[index] = {
        ...allLists[index],
        name,
        description: desc,
        careers: selectedIds
      };
    } else {
      // crear nueva
      allLists.push({
        id: Date.now(),
        name,
        description: desc,
        careers: selectedIds
      });
    }

    localStorage.setItem(LISTS_KEY, JSON.stringify(allLists));
    window.location.href = "gestionar-listas.html";
  });

  
  // ---------------------------------------------
  // 4. CANCELAR
  // ---------------------------------------------
  document.querySelector(".btn-cancel").addEventListener("click", () => {
    window.location.href = "gestionar-listas.html";
  });

});
