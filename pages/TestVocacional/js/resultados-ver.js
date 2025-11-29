(() => {

  const id = Number(localStorage.getItem("resultadoSeleccionado"));
  if (!id) {
    window.location.href = "../Historial/historial-evaluaciones.html";
    return;
  }

  const historial = JSON.parse(localStorage.getItem("historialTests")) || [];
  const test = historial.find(t => t.id === id);

  if (!test) {
    window.location.href = "../Historial/historial-evaluaciones.html";
    return;
  }

  // Recuperamos los datos completos del test
  const data = JSON.parse(localStorage.getItem("vocatio_test_result"));

  // ---------------- TOP CARD ----------------
  const topCard = document.getElementById("topAreaCard");
  topCard.innerHTML = `
    <div class="top-title">Tu área dominante fue:</div>
    <div class="top-title">${data.topArea}</div>
    <div class="top-percent">${data.breakdown[data.topArea].percent}%</div>
    <p class="fecha">Realizado el ${test.fecha} • ${test.hora}</p>
  `;

  // ---------------- AREAS GRID ----------------
  const areasGrid = document.getElementById("areasGrid");

  Object.keys(data.breakdown).forEach(area => {
    const card = document.createElement("div");
    card.className = "area-card";

    card.innerHTML = `
      <div class="area-title">${area}</div>
      <div class="bar-bg">
        <div class="bar-fill" style="width:${data.breakdown[area].percent}%"></div>
      </div>
      <div class="area-percent">${data.breakdown[area].percent}%</div>
    `;

    areasGrid.appendChild(card);
  });

  // ---------------- RECOMENDACIONES ----------------
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
    <div class="reco-title">Carreras recomendadas para ${data.topArea}</div>
    <ul class="reco-list">
      ${recomendaciones[data.topArea].map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;

  recoContainer.appendChild(rcard);

  // ---------------- DESCARGAR PDF ----------------
  document.getElementById("btnDescargar").addEventListener("click", async () => {

    const resultContainer = document.querySelector(".resultados-container");

    const { jsPDF } = window.jspdf;

    const canvas = await html2canvas(resultContainer, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`Resultado_${data.topArea}.pdf`);
  });

})();
