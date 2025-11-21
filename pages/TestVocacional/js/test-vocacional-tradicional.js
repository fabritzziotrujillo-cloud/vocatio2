    // Activa íconos Lucide
    lucide.createIcons();

    // Fade-in con IntersectionObserver
    const fades = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.18 });

    fades.forEach(f => io.observe(f));

    // Popup de bienvenida al cargar la página (3s)
    window.addEventListener('load', () => {
      const welcome = document.getElementById('welcomePopup');
      welcome.classList.add('show');
      setTimeout(() => welcome.classList.remove('show'), 3200);
    });

    // Lógica de la barra lateral: seleccionar área
    const sidebarOptions = document.querySelectorAll('.sidebar-option');
    let selectedArea = null;

    sidebarOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        // remover activo previo
        sidebarOptions.forEach(b => b.classList.remove('active'));
        // marcar el seleccionado
        btn.classList.add('active');
        selectedArea = btn.dataset.area;

        // mostrar breve feedback (puede ser un pequeño popup)
        const temp = document.createElement('div');
        temp.className = 'popup';
        temp.style.right = '20px';
        temp.style.top = '80px';
        temp.textContent = 'Área seleccionada: ' + btn.textContent.trim();
        document.body.appendChild(temp);
        // animación y borrado
        requestAnimationFrame(() => temp.classList.add('show'));
        setTimeout(() => {
          temp.classList.remove('show');
          setTimeout(() => temp.remove(), 400);
        }, 1400);
      });
    });

    // Botón Explorar más carreras: validar selección antes de navegar
    const btnExplore = document.getElementById('btnExplore');
    btnExplore.addEventListener('click', () => {
      if (!selectedArea) {
        const err = document.getElementById('errorPopup');
        err.style.display = 'block';
        // mostrar y ocultar con clase
        requestAnimationFrame(() => err.classList.add('show'));
        setTimeout(() => {
          err.classList.remove('show');
          setTimeout(() => err.style.display = 'none', 350);
        }, 2200);
        return;
      }
      // si hay selección, redirigir agregando query param para usarlo en la página de exploración
      // por ejemplo: explorar-carreras-seccion.html?area=ciencias
      window.location.href = `../ExplorarCarreras/explorar-carreras-seccion.html?area=${encodeURIComponent(selectedArea)}`;
    });

    // Botón iniciar test: agregar pequeño feedback antes de redirigir
    const startBtn = document.getElementById('startTestBtn');
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      startBtn.textContent = 'Cargando...';
      setTimeout(() => {
        // redirigir al formulario del test (manteniendo la ruta que ya tenías)
        window.location.href = 'formulario-test.html';
      }, 300);
    });
