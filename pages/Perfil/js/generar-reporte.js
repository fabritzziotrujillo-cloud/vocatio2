      lucide.createIcons();

    // --- Validación del formulario ---
    document.getElementById('btn-generar').addEventListener('click', function(e) {
      e.preventDefault();

      const titulo = document.getElementById('titulo-reporte');
      const logo = document.getElementById('logo-opcion');
      const errores = document.querySelectorAll('.error-message');
      errores.forEach(err => err.style.display = 'none');

      let valido = true;

      if (titulo.value.trim() === '') {
        titulo.nextElementSibling.textContent = 'Por favor completa este campo antes de continuar.';
        titulo.nextElementSibling.style.display = 'block';
        valido = false;
      }

      if (logo.value.trim() === '') {
        logo.nextElementSibling.textContent = 'Selecciona una opción antes de continuar.';
        logo.nextElementSibling.style.display = 'block';
        valido = false;
      }

      if (valido) {
        window.location.href = 'vista-previa-reporte.html';
      }
    });
