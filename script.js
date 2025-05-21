document.addEventListener('DOMContentLoaded', () => {
  const typewriter = (el, words, delay = 2000) => {
    let txt = '', index = 0, deleting = false;
    const run = () => {
      const word = words[index % words.length];
      txt = deleting ? word.substring(0, txt.length - 1) : word.substring(0, txt.length + 1);
      el.textContent = txt;
      let speed = deleting ? 75 : 150;
      if (!deleting && txt === word) { speed = delay; deleting = true; }
      else if (deleting && txt === '') { deleting = false; index++; speed = 500; }
      setTimeout(run, speed);
    };
    run();
  };

  const heading = document.querySelector('#welcome-section h1');
  typewriter(heading, ["Hi, I'm Juan Emmanuel", "Junior Web Developer", "Creative Problem Solver", "Lifelong Learner"], 2500);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('hidden');
    observer.observe(sec);
  });

  const backBtn = document.createElement('button');
  backBtn.id = 'back-to-top';
  backBtn.textContent = '↑';
  Object.assign(backBtn.style, {
    position: 'fixed', bottom: '2rem', right: '2rem',
    padding: '0.75rem 1rem', fontSize: '1.5rem',
    borderRadius: '50%', border: 'none',
    cursor: 'pointer', display: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: 'var(--clr-accent)',
    color: 'var(--clr-light)', zIndex: 1000
  });
  document.body.appendChild(backBtn);
  window.addEventListener('scroll', () => {
    backBtn.style.display = window.scrollY > window.innerHeight / 2 ? 'block' : 'none';
  });
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const themeBtn = document.getElementById('theme-toggle');
  const setTheme = t => {
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', t);
  };
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(current);
  });
  const saved = localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('menu-toggle').checked = false;
    });
  });

  const projects = document.getElementById('projects');
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Search projects…';
  Object.assign(search.style, {
    display: 'block', margin: '0 auto 1.5rem',
    padding: '0.5rem 1rem', width: '100%',
    maxWidth: '400px', fontSize: '1rem',
    border: '2px solid var(--clr-muted)',
    borderRadius: '4px'
  });
  projects.insertBefore(search, projects.querySelector('.projects-grid'));
  search.addEventListener('input', () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll('.project-tile').forEach(tile => {
      const title = tile.querySelector('.project-title').textContent.toLowerCase();
      tile.style.display = title.includes(term) ? 'block' : 'none';
    });
  });
});
