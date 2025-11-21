/* formulario-test.js
   - 25 preguntas en 4 áreas (Tecnologia, Creatividad, Empresarial, Social)
   - escala 4->1
   - guarda resultado en localStorage con key "vocatio_test_result"
*/

(() => {
  const questions = [
    { q: "Me entusiasma resolver problemas técnicos o matemáticos.", a: "Tecnologia" },
    { q: "Disfruto aprender lenguajes de programación o herramientas digitales.", a: "Tecnologia" },
    { q: "Me atrae trabajar con datos, análisis y estadísticas.", a: "Tecnologia" },
    { q: "Me interesa la seguridad informática y cómo proteger sistemas.", a: "Tecnologia" },
    { q: "Prefiero diseñar soluciones lógicas a problemas complejos.", a: "Tecnologia" },
    { q: "Me gusta construir prototipos o proyectos técnicos prácticos.", a: "Tecnologia" },
    { q: "Siento curiosidad por tecnologías emergentes y su aplicación.", a: "Tecnologia" },

    { q: "Me encanta crear cosas originales (dibujo, música, diseño).", a: "Creatividad" },
    { q: "Disfruto imaginar nuevas ideas y expresarlas visualmente.", a: "Creatividad" },
    { q: "Valoro la estética y la experiencia del usuario en productos.", a: "Creatividad" },
    { q: "Me entusiasma escribir, contar historias o diseñar conceptos.", a: "Creatividad" },
    { q: "Disfruto experimentar con materiales, colores y formas.", a: "Creatividad" },
    { q: "Me motiva producir trabajos únicos que inspiren a otros.", a: "Creatividad" },

    { q: "Me siento atraído por dirigir equipos y tomar decisiones.", a: "Empresarial" },
    { q: "Me interesa entender cómo funcionan las finanzas y la economía.", a: "Empresarial" },
    { q: "Disfruto planificar proyectos y optimizar recursos.", a: "Empresarial" },
    { q: "Me veo emprendiendo o gestionando negocios en el futuro.", a: "Empresarial" },
    { q: "Me gusta negociar, persuadir y vender ideas o productos.", a: "Empresarial" },
    { q: "Me interesa la estrategia empresarial y la gestión de equipos.", a: "Empresarial" },

    { q: "Me motiva ayudar a las personas con sus problemas personales.", a: "Social" },
    { q: "Disfruto trabajar en actividades comunitarias o voluntariado.", a: "Social" },
    { q: "Tengo facilidad para comunicar y escuchar a otros.", a: "Social" },
    { q: "Me interesa la educación, psicología o trabajo social.", a: "Social" },
    { q: "Me siento realizado al apoyar el bienestar de otras personas.", a: "Social" },
    { q: "Prefiero trabajos con interacción humana constante.", a: "Social" }
  ];

  const options = [
    { label: "Muy de acuerdo", value: 4 },
    { label: "De acuerdo", value: 3 },
    { label: "En desacuerdo", value: 2 },
    { label: "Muy en desacuerdo", value: 1 }
  ];

  const grid = document.getElementById('questionsGrid');

  // inyectar preguntas
  questions.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'question-row';
    row.dataset.index = idx;

    const top = document.createElement('div');
    top.className = 'question-top';
    const num = document.createElement('div');
    num.className = 'question-number';
    num.textContent = (idx + 1) + '.';
    const text = document.createElement('div');
    text.className = 'question-text';
    text.textContent = item.q;

    top.appendChild(num);
    top.appendChild(text);

    const opts = document.createElement('div');
    opts.className = 'question-options';

    options.forEach((opt, i) => {
      const id = `q${idx}_opt${i}`;
      const label = document.createElement('label');
      label.className = 'option-label';
      label.htmlFor = id;
      label.dataset.value = opt.value;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${idx}`;
      input.id = id;
      input.value = opt.value;

      const span = document.createElement('span');
      span.textContent = opt.label;

      label.appendChild(input);
      label.appendChild(span);
      opts.appendChild(label);

      label.addEventListener('click', () => {
        const siblings = opts.querySelectorAll('.option-label');
        siblings.forEach(s => s.classList.remove('selected'));
        label.classList.add('selected');
        row.classList.remove('error');
        const emsg = row.querySelector('.error-msg');
        if (emsg) emsg.style.display = 'none';
      });
    });

    const emsg = document.createElement('div');
    emsg.className = 'error-msg';
    emsg.textContent = '⚠️ Por favor responde esta afirmación.';

    row.appendChild(top);
    row.appendChild(opts);
    row.appendChild(emsg);
    grid.appendChild(row);
  });

  // submit handler
  const form = document.getElementById('vocatioTestForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const rows = Array.from(document.querySelectorAll('.question-row'));
    let valid = true;

    rows.forEach(row => {
      const checked = row.querySelector('input:checked');
      const emsg = row.querySelector('.error-msg');
      if (!checked) {
        row.classList.add('error');
        if (emsg) emsg.style.display = 'block';
        valid = false;
      } else {
        row.classList.remove('error');
        if (emsg) emsg.style.display = 'none';
      }
    });

    if (!valid) {
      const first = document.querySelector('.question-row.error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const areaScores = { Tecnologia: 0, Creatividad: 0, Empresarial: 0, Social: 0 };
    const areaCounts = { Tecnologia: 0, Creatividad: 0, Empresarial: 0, Social: 0 };

    rows.forEach((row, idx) => {
      const area = questions[idx].a;
      const val = parseInt((row.querySelector('input:checked')).value, 10);
      areaScores[area] += val;
      areaCounts[area] += 1;
    });

    const breakdown = {};
    Object.keys(areaScores).forEach(area => {
      const count = areaCounts[area];
      const score = areaScores[area];
      const max = count * 4;
      const percent = Math.round((score / max) * 100);
      breakdown[area] = { score, count, max, percent };
    });

    const sorted = Object.entries(breakdown)
      .sort((a,b) => {
        if (b[1].percent !== a[1].percent) return b[1].percent - a[1].percent;
        return b[1].score - a[1].score;
      });

    const top = sorted[0][0];

    const result = {
      timestamp: Date.now(),
      totals: areaScores,
      breakdown,
      topArea: top
    };

    localStorage.setItem('vocatio_test_result', JSON.stringify(result));
    window.location.href = 'resultados-test.html';
  });

})();
