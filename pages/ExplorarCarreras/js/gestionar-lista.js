
document.addEventListener("DOMContentLoaded", () => {

  const LISTS_KEY = "careerLists";
  const CAREERS_KEY = "careersDB"; // este es tu DB con id, name, img

  const listsContainer = document.querySelector(".lists-container");
  const newListBtn = document.querySelector(".btn-new-list");

  let allLists = JSON.parse(localStorage.getItem(LISTS_KEY)) || [];
  let allCareers = JSON.parse(localStorage.getItem(CAREERS_KEY)) || [];

  // =======================================
  // 1. RENDERIZAR TODAS LAS LISTAS
  // =======================================
  function renderLists() {

    if (allLists.length === 0) {
      listsContainer.innerHTML = `
        <p style="text-align:center; color:#555; margin-top:20px;">
          Aún no tienes listas creadas.
        </p>
      `;
      return;
    }

    listsContainer.innerHTML = allLists.map(list => {

      // mini imágenes de carreras (por ID)
      const thumbs = list.careers.map(careerId => {
        const career = allCareers.find(x => x.id == careerId);
        return career ? `
          <div class="career-thumb">
            <img src="${career.img}">
          </div>
        ` : "";
      }).join("");

      return `
        <div class="list-item" data-id="${list.id}">
          <div class="list-item-content">
            <h3 class="list-item-title">${list.name}</h3>
            <p class="list-item-meta">${list.careers.length} carreras • ${new Date(list.createdAt || Date.now()).toLocaleDateString()}</p>
            <div class="list-item-preview">
  ${thumbs}
</div>

<div class="list-item-careers">
  ${list.careers.map(cid => {
    const c = allCareers.find(x => x.id == cid);
    return c ? `<p class="career-name">• ${c.name}</p>` : "";
  }).join("")}
</div>

          </div>

          <div class="list-item-actions">
            <button class="list-action-btn edit"><span>Editar</span></button>
            <button class="list-action-btn delete"><span>Eliminar</span></button>
          </div>
        </div>
      `;
    }).join("");

    lucide.createIcons();
  }

  renderLists();


  // =======================================
  // 2. BOTÓN NUEVA LISTA
  // =======================================
  newListBtn.addEventListener("click", () => {
    window.location.href = "crear-lista.html";
  });


  // =======================================
  // 3. EDITAR (ir a crear-lista con ?id=123)
  // =======================================
  listsContainer.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit");
    if (!editBtn) return;

    const listItem = editBtn.closest(".list-item");
    const id = listItem.dataset.id;

    window.location.href = "crear-lista.html?id=" + id;
  });


  // =======================================
  // 4. ELIMINAR LISTA (con modal)
  // =======================================
  listsContainer.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete");
    if (!deleteBtn) return;

    const item = deleteBtn.closest(".list-item");
    const id = item.dataset.id;

    // Modal
    const overlay = document.createElement("div");
    overlay.className = "vocatio-modal-overlay";

    overlay.innerHTML = `
      <div class="vocatio-modal">
        <h3>¿Eliminar esta lista?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="vocatio-modal-buttons">
          <button class="vocatio-btn vocatio-confirm">Eliminar</button>
          <button class="vocatio-btn vocatio-cancel">Cancelar</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".vocatio-confirm").addEventListener("click", () => {

      allLists = allLists.filter(l => l.id != id);
      localStorage.setItem(LISTS_KEY, JSON.stringify(allLists));

      renderLists();
      overlay.remove();
    });

    overlay.querySelector(".vocatio-cancel").addEventListener("click", () => {
      overlay.remove();
    });

  });

});

