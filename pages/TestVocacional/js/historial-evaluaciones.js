
    // inicializar iconos
    lucide.createIcons();

    // Cargar historial dinámico desde localStorage
    function cargarHistorial() {
      const contenedor = document.getElementById("testsContainer");
      let historial = JSON.parse(localStorage.getItem("historialTests")) || [];

      if (historial.length === 0) {
        contenedor.innerHTML = `<p class="no-tests">No tienes evaluaciones guardadas.</p>`;
        return;
      }

      // Ordenar por fecha (id) más reciente arriba
      historial = historial.sort((a, b) => b.id - a.id);

      let html = "";

      historial.forEach((test, index) => {
        html += `
          <div class="test-card ${index === 0 ? "most-recent" : ""}">
            <div class="test-card-header">
              <div class="test-info">
                <h3 class="test-title">Test Vocacional #${historial.length - index}</h3>
                <p class="test-date">${test.fecha} • ${test.hora} • Duración: ${test.duracion}</p>
              </div>

              <div class="test-compatibility">
                <span class="compatibility-value">${test.compatibilidad}%</span>
                <span class="compatibility-label">Compatibilidad máxima</span>
              </div>
            </div>

            ${index === 0 ? `<div class="test-badge-row"><span class="test-badge">Más reciente</span></div>` : ""}

            <div class="test-actions">
              <button class="btn-see-results" data-id="${test.id}">Ver Resultados</button>
              <button class="btn-download" data-id="${test.id}">Descargar PDF</button>
              <button class="btn-delete" data-id="${test.id}">Eliminar</button>
            </div>
          </div>
        `;
      });

      contenedor.innerHTML = html;

      // Attach events
      document.querySelectorAll('.btn-see-results').forEach(btn => {
        btn.addEventListener('click', () => {
          // Guardar id seleccionado y abrir resultados (resultados-test.html debe leer resultadoSeleccionado)
          localStorage.setItem("resultadoSeleccionado", btn.dataset.id);
          window.location.href = "resultados-ver.html";
        });
      });

      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          if (confirm("¿Eliminar esta evaluación?")) {
            eliminarTest(btn.dataset.id);
          }
        });
      });

      document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
          // placeholder: puedes implementar generación PDF aquí
          alert("Descargando PDF (función pendiente)");
        });
      });
    }

    function eliminarTest(id) {
      let historial = JSON.parse(localStorage.getItem("historialTests")) || [];
      historial = historial.filter(test => test.id != id);
      localStorage.setItem("historialTests", JSON.stringify(historial));
      cargarHistorial();
    }

    // Ejecutar carga
    cargarHistorial();
