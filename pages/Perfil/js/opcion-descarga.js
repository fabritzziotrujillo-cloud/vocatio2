
    lucide.createIcons();


/* -------- Interacciones y validaciones para generar-reporte -------- */
(function() {
  // Activar íconos
  try { if (window.lucide) lucide.createIcons(); } catch(e){}

  // --- Toast simple para mensajes ---
  function toast(msg, type = "info") {
    const el = document.createElement("div");
    el.textContent = msg;
    el.style.position = "fixed";
    el.style.bottom = "25px";
    el.style.right = "25px";
    el.style.padding = "10px 16px";
    el.style.borderRadius = "8px";
    el.style.zIndex = "9999";
    el.style.fontWeight = "600";
    el.style.color = "white";
    el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
    el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.fontFamily = "inherit";

    switch (type) {
      case "success": el.style.background = "#2e7d32"; break;
      case "warn": el.style.background = "#ed6c02"; break;
      case "error": el.style.background = "#d32f2f"; break;
      default: el.style.background = "#333";
    }

    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(() => el.remove(), 300);
    }, 2500);
  }

  // --- Marcar opciones activas visualmente ---
  document.querySelectorAll(".radio-option").forEach(opt => {
    const input = opt.querySelector("input[type='radio']");
    input.addEventListener("change", () => {
      document.querySelectorAll(".radio-option").forEach(o => o.classList.remove("active-radio"));
      opt.classList.add("active-radio");
    });
  });

  // --- Estilo al pasar el mouse sobre las tarjetas ---
  document.querySelectorAll(".options-card").forEach(card => {
    card.addEventListener("mouseenter", () => card.style.transform = "scale(1.015)");
    card.addEventListener("mouseleave", () => card.style.transform = "scale(1)");
    card.style.transition = "transform 0.2s ease";
  });

  // --- Validación de descarga ---
  const btnDownload = document.querySelector(".btn-primary-action");
  if (btnDownload) {
    btnDownload.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedFormat = document.querySelector("input[name='format']:checked");
      const selectedContents = Array.from(document.querySelectorAll(".content-options input[type='checkbox']:checked"));

      if (!selectedFormat) {
        toast("⚠️ Selecciona un formato antes de continuar.", "warn");
        return;
      }
      if (selectedContents.length === 0) {
        toast("❗ Debes incluir al menos un contenido en el reporte.", "error");
        return;
      }

      // Simulación de preparación de descarga
      btnDownload.classList.add("loading");
      btnDownload.style.pointerEvents = "none";
      btnDownload.textContent = "Generando reporte...";

      setTimeout(() => {
        btnDownload.classList.remove("loading");
        btnDownload.style.pointerEvents = "auto";
        btnDownload.textContent = "Descargar Reporte";
        toast("✅ Reporte generado correctamente en formato " + selectedFormat.value.toUpperCase(), "success");
      }, 1500);
    });
  }

  // --- Vista previa ---
  const btnPreview = document.querySelector(".btn-secondary-action");
  if (btnPreview) {
    btnPreview.addEventListener("click", () => {
      toast("🧐 Cargando vista previa...", "info");
    });
  }

  // --- Animación de aparición al cargar ---
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".options-card, .preview-summary-box").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 150);
    });
  });

  // --- Enlaces seguros ---
  document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        toast("🔗 Enlace interno no disponible aún.", "warn");
      }
    });
  });
})();
