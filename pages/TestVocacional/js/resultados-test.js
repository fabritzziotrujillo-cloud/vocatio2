(() => {

  const data = localStorage.getItem("vocatio_test_result");
  if (!data) {
    window.location.href = "formulario-test.html";
    return;
  }

  const result = JSON.parse(data);

  const topArea = result.topArea;
  const breakdown = result.breakdown;

  const topCard = document.getElementById("topAreaCard");

  topCard.innerHTML = `
    <div class="top-title">Tu área dominante es:</div>
    <div class="top-title">${topArea}</div>
    <div class="top-percent">${breakdown[topArea].percent}%</div>
  `;

  const areasGrid = document.getElementById("areasGrid");

  Object.keys(breakdown).forEach(area => {
    const card = document.createElement("div");
    card.className = "area-card";

    card.innerHTML = `
      <div class="area-title">${area}</div>
      <div class="bar-bg">
        <div class="bar-fill" style="width:${breakdown[area].percent}%"></div>
      </div>
      <div class="area-percent">${breakdown[area].percent}%</div>
    `;

    areasGrid.appendChild(card);
  });

  // Recomendar carreras
  const recomendaciones = {
    Tecnologia: [
      "Ingeniería de Sistemas",
      "Ciencia de Datos",
      "Ingeniería de Software",
      "Ciberseguridad",
      "Desarrollo Web"
    ],
    Creatividad: [
      "Diseño Gráfico",
      "Arquitectura",
      "Animación Digital",
      "Publicidad",
      "Diseño UX/UI"
    ],
    Empresarial: [
      "Administración",
      "Marketing",
      "Negocios Internacionales",
      "Economía",
      "Gestión Empresarial"
    ],
    Social: [
      "Psicología",
      "Educación",
      "Trabajo Social",
      "Comunicación",
      "Sociología"
    ]
  };

  const recoContainer = document.getElementById("recoContainer");

  const rcard = document.createElement("div");
  rcard.className = "reco-card";

  rcard.innerHTML = `
    <div class="reco-title">Carreras recomendadas para ${topArea}</div>
    <ul class="reco-list">
      ${recomendaciones[topArea].map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;

  recoContainer.appendChild(rcard);

})();
