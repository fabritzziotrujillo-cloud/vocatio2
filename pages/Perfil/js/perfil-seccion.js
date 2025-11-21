
    lucide.createIcons();


/* ---------- Interacciones (no destructivas) para perfil-seccion.html ---------- */
(function(){
  // safe lucide init
  try { if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons(); } catch(e){}

  /* Toast ligero — estilos en línea para no tocar CSS existente */
  function toast(text, kind = 'info') {
    const el = document.createElement('div');
    el.className = 'rv-toast';
    el.textContent = text;
    el.style.position = 'fixed';
    el.style.right = '20px';
    el.style.top = '20px';
    el.style.zIndex = 99999;
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    el.style.fontWeight = '600';
    el.style.fontFamily = 'inherit';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'opacity .25s ease, transform .25s ease';

    if (kind === 'success') el.style.background = '#2e7d32', el.style.color = 'white';
    else if (kind === 'warn') el.style.background = '#ff9800', el.style.color = 'white';
    else if (kind === 'error') el.style.background = '#d32f2f', el.style.color = 'white';
    else el.style.background = '#111', el.style.color = 'white';

    document.body.appendChild(el);
    requestAnimationFrame(()=> { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    setTimeout(()=> { el.style.opacity = '0'; el.style.transform = 'translateY(-8px)'; setTimeout(()=> el.remove(), 250); }, 2200);
  }

  /* Animar estadísticas (números) cuando la sección aparece en pantalla */
  function animateNumber(el, target, duration = 1000) {
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(start + (target - start) * progress);
      el.textContent = value + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // preparar elementos de stats
  document.addEventListener('DOMContentLoaded', () => {
    // Encuentra los contadores dentro de .profile-stats
    const stats = document.querySelectorAll('.profile-stat .profile-stat-value');
    stats.forEach(node => {
      // intenta extraer número actual (si existe)
      const raw = node.textContent.trim();
      const m = raw.match(/(\d+)/);
      const target = m ? parseInt(m[1], 10) : 0;
      // vaciar para animar desde 0
      node.textContent = '0';
      // animar cuando el nodo esté visible (IntersectionObserver)
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumber(node, target, 900);
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(node);
    });
  });

  /* Click en avatar: pequeño efecto visual y toast (no cambia HTML) */
  const avatar = document.querySelector('.profile-avatar');
  if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => {
      avatar.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(1)' }
      ], { duration: 240, easing: 'ease-out' });
      toast('Editar avatar (función en perfil) ✏️', 'info');
    });
    // keyboard accessible
    if (!avatar.hasAttribute('tabindex')) avatar.setAttribute('tabindex','0');
    avatar.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avatar.click(); }});
  }

  /* Hacer que todo el .management-card sea "clickeable" y emule el click en su enlace interno
     (no mueve ni elimina nada: si el enlace tiene href válido, navega; si no, muestra toast) */
  document.querySelectorAll('.management-card').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
      // evita reaccionar si se hizo click en un enlace real (dejar comportamiento nativo)
      const anchor = card.querySelector('.management-link');
      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        if (!href || href === '#') {
          e.preventDefault();
          toast('Acción pendiente: enlace no configurado 🔧', 'warn');
        } else {
          // pequeña animación antes de navegar (no cancela navegación)
          card.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-6px)' },
            { transform: 'translateY(0)' }
          ], { duration: 200, easing: 'ease' });
          // permitir que el enlace navegue naturalmente
          // si deseas forzar la navegación aquí: window.location.href = href;
        }
      } else {
        toast('Elemento interactivo (sin enlace) ✨', 'info');
      }
    });

    // accesibilidad: Enter/Space en la tarjeta también activa
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex','0');
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); card.click(); }
    });
  });

  /* "Generar Reporte" quick feedback: si hay link con generar, mostrar toast al click si href="#" */
  document.querySelectorAll('a.management-link, a[href*="generar-reporte"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href || href === '#') {
        e.preventDefault();
        toast('Generar reporte no configurado aún 🔒', 'warn');
      } else {
        // mostrar aviso corto y permitir navegación
        toast('Abriendo sección…', 'success');
      }
    });
  });

  /* Pequeña mejora de UX: mostrar confirmación si el usuario intenta salir de la página con cambios
     (desactivado por defecto; si quieres activarlo, activa la variable below) */
  const enableUnloadWarning = false;
  if (enableUnloadWarning) {
    let formDirty = false;
    // ejemplo: si hay formularios en la página, marca dirty cuando cambian (no los guardamos ni los manejamos)
    document.querySelectorAll('form').forEach(f => f.addEventListener('change', () => formDirty = true));
    window.addEventListener('beforeunload', (e) => {
      if (formDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  // defensivo: no borra ni oculta nodos, sólo añade interacciones
})();
