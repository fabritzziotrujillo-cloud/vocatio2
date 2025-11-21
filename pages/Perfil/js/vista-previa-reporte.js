
    lucide.createIcons();

    // --- Animación de aparición al hacer scroll ---
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => observer.observe(el));

    // --- Confirmación visual al descargar ---
    const downloadBtn = document.getElementById('downloadBtn');
    const confirmMsg = document.getElementById('downloadConfirm');

    downloadBtn.addEventListener('click', () => {
      confirmMsg.style.display = 'block';
      setTimeout(() => confirmMsg.style.display = 'none', 2500);
    });

