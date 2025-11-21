    lucide.createIcons();


/* ---------- Interacciones no destructivas para Recursos Recomendados ---------- */
/* No modifica/elimina nodos: solo añade listeners y pequeños toasts visuales. */

(function(){
  // helper: crear toast temporal (sin tocar html existente)
  function toast(text, kind = 'info') {
    const t = document.createElement('div');
    t.className = 'rv-toast'; // clase temporal
    t.textContent = text;
    // estilos inline para no depender de CSS externo
    t.style.position = 'fixed';
    t.style.right = '20px';
    t.style.top = '20px';
    t.style.zIndex = 99999;
    t.style.padding = '10px 14px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 6px 18px rgba(0,0,0,.12)';
    t.style.fontWeight = '600';
    t.style.fontFamily = 'inherit';
    t.style.opacity = '0';
    t.style.transform = 'translateY(-8px)';
    t.style.transition = 'opacity .28s ease, transform .28s ease';

    if (kind === 'success') t.style.background = '#2e7d32', t.style.color = 'white';
    else if (kind === 'warn') t.style.background = '#ff9800', t.style.color = 'white';
    else if (kind === 'error') t.style.background = '#d32f2f', t.style.color = 'white';
    else t.style.background = '#333', t.style.color = 'white';

    document.body.appendChild(t);
    // trigger visible
    requestAnimationFrame(()=>{ t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    // remove after 2.2s
    setTimeout(()=> {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-8px)';
      setTimeout(()=> t.remove(), 320);
    }, 2200);
  }

  // Inicializa iconos Lucide si existe lucide
  try { if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons(); } catch(e){}

  // BOOKMARKS: togglear clase "active" sin eliminar elementos
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault?.();
      btn.classList.toggle('active');
      // animación rápida (inline, no CSS edit)
      btn.style.transition = 'transform .12s ease';
      btn.style.transform = 'scale(1.12)';
      setTimeout(()=> btn.style.transform = '', 120);

      if (btn.classList.contains('active')) toast('Recurso guardado ✅', 'success');
      else toast('Guardado eliminado', 'warn');
    });
  });

  // BTN REMOVE SAVED: NO ELIMINA, solo da feedback (para no borrar nada)
  document.querySelectorAll('.btn-remove-saved').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault?.();
      // efecto visual rápido
      btn.style.transition = 'transform .12s ease, opacity .12s ease';
      btn.style.transform = 'scale(.92)';
      setTimeout(()=> { btn.style.transform = ''; }, 120);

      toast('Eliminar guardado deshabilitado en esta vista 🔒', 'error');
    });
  });

  // FILTROS DE CATEGORÍA: no ocultar elementos, sólo marcar la categoría activa en body.dataset
  // (puedes usar body.dataset.filter en CSS si quieres más tarde; por ahora es sólo feedback)
  document.querySelectorAll('.category-input').forEach(input => {
    input.addEventListener('change', () => {
      // obtener texto de la etiqueta correspondiente (si existe)
      const label = document.querySelector(`label[for="${input.id}"]`);
      const labelText = label ? label.textContent.trim() : input.id;
      // marcar dataset (no cambia layout ni oculta)
      document.body.dataset.rvFilter = input.id.replace('cat-','');
      toast(`Filtro aplicado: ${labelText}`, 'success');
    });
  });

  // BOTONES "Ver Recurso" que son <a href="#">: agregar pequeño feedback al click si href="#" para evitar navegación vacía
  document.querySelectorAll('.btn-resource, a.btn-resource').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = (a.getAttribute && a.getAttribute('href')) || '';
      if (!href || href === '#') {
        ev.preventDefault();
        toast('Recurso seleccionado — Enlace no configurado', 'warn');
      } else {
        // dejar que la navegación ocurra si hay href válido
        // opcional: mostrar toast corto
        toast('Abriendo recurso…', 'info');
      }
    });
  });

  // Accesibilidad: permitir togglear bookmarks con tecla Enter/Space si tienen tabindex
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex','0');
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  // Quick safety: if no .btn-bookmark found, don't error
  // (script is defensive - won't remove or hide anything)

})(); 

