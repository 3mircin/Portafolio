const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const hero = document.querySelector('.hero');
const buildIntro = document.getElementById('buildIntro');
const finishIntro = () => {
  if (!hero || !buildIntro) return;
  buildIntro.classList.add('is-complete');
  hero.classList.add('intro-ready');
};
if (reducedMotion) finishIntro();
else window.setTimeout(finishIntro, 3800);

const translations = {
  es: {'nav.about':'Sobre mí','nav.education':'Formación','nav.certificates':'Certificados','nav.projects':'Proyectos','nav.blog':'Blog','nav.contact':'Contacto','nav.available':'Disponible','hero.hello':'Hola, soy','hero.description':'Estudiante de Ingeniería en Computación enfocado en redes, seguridad y automatización.','hero.projects':'Ver proyectos','hero.contact':'Hablemos','hero.side':'Construir sistemas confiables.<br>Aprender algo nuevo cada día.','hero.focus':'áreas de enfoque','hero.curiosity':'curiosidad técnica','about.kicker':'PERFIL / SOBRE MÍ','about.title':'Conectar ideas<br><em>con resultados.</em>','about.p1':'Me estoy formando como Ingeniero en Computación, con especial interés en la arquitectura de redes, protocolos de comunicación y ciberseguridad.','about.p2':'Disfruto entender cómo funcionan los sistemas, automatizar procesos y convertir problemas complejos en soluciones claras y útiles.','contact.title':'¿Construimos algo<br><em>juntos?</em>'},
  en: {'nav.about':'About','nav.education':'Education','nav.certificates':'Certificates','nav.projects':'Projects','nav.blog':'Blog','nav.contact':'Contact','nav.available':'Available','hero.hello':'Hello, I am','hero.description':'Computer Engineering student focused on networks, security and automation.','hero.projects':'View projects','hero.contact':'Let’s talk','hero.side':'Building reliable systems.<br>Learning something new every day.','hero.focus':'focus areas','hero.curiosity':'technical curiosity','about.kicker':'PROFILE / ABOUT ME','about.title':'Connecting ideas<br><em>with results.</em>','about.p1':'I am studying Computer Engineering, with a special interest in network architecture, communication protocols and cybersecurity.','about.p2':'I enjoy understanding how systems work, automating processes and turning complex problems into clear, useful solutions.','contact.title':'Shall we build something<br><em>together?</em>'},
  de: {'nav.about':'Über mich','nav.education':'Ausbildung','nav.certificates':'Zertifikate','nav.projects':'Projekte','nav.blog':'Blog','nav.contact':'Kontakt','nav.available':'Verfügbar','hero.hello':'Hallo, ich bin','hero.description':'Student der Computertechnik mit Fokus auf Netzwerke, Sicherheit und Automatisierung.','hero.projects':'Projekte ansehen','hero.contact':'Kontakt','hero.side':'Zuverlässige Systeme bauen.<br>Jeden Tag Neues lernen.','hero.focus':'Schwerpunkte','hero.curiosity':'technische Neugier','about.kicker':'PROFIL / ÜBER MICH','about.title':'Ideen verbinden<br><em>mit Ergebnissen.</em>','about.p1':'Ich studiere Computertechnik mit besonderem Interesse an Netzwerkarchitektur, Kommunikationsprotokollen und Cybersicherheit.','about.p2':'Ich analysiere gerne Systeme, automatisiere Prozesse und mache komplexe Probleme klar und praktisch.','contact.title':'Bauen wir etwas<br><em>zusammen?</em>'}
};
const languageSelect = document.getElementById('languageSelect');
const applyLanguage = (language) => {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = translations[language]?.[element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  localStorage.setItem('portfolio-language', language);
};
if (languageSelect) {
  languageSelect.value = localStorage.getItem('portfolio-language') || 'es';
  applyLanguage(languageSelect.value);
  languageSelect.addEventListener('change', (event) => applyLanguage(event.target.value));
}
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.documentElement.classList.add('light-theme');
themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', document.documentElement.classList.contains('light-theme') ? 'light' : 'dark');
});

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('is-hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter));
}));

const posts = {
  network: ['Cómo pensar una topología antes de configurarla', 'Antes de abrir Packet Tracer o GNS3, conviene definir objetivos, dominios de falla, direccionamiento y una forma de validar cada hipótesis. Diseñar primero reduce retrabajo y hace que el laboratorio sea repetible.'],
  security: ['Checklist inicial para endurecer Linux', 'Actualizar paquetes, reducir servicios expuestos, revisar usuarios, aplicar mínimo privilegio y registrar eventos son controles pequeños con un impacto acumulativo enorme. La seguridad comienza con visibilidad y hábitos consistentes.']
};
const modal = document.getElementById('postModal');
document.querySelectorAll('.post-card').forEach((post) => post.addEventListener('click', () => {
  const content = posts[post.dataset.post];
  document.getElementById('modalTitle').textContent = content[0];
  document.getElementById('modalBody').textContent = content[1];
  modal.showModal();
}));
document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());

const revealItems = document.querySelectorAll('.section, .project-card, .skill-list span, .education-line');
if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

if (!reducedMotion) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const orbs = document.querySelectorAll('.liquid-orb');
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 24;
    const y = (event.clientY / window.innerHeight - 0.5) * 24;
    orbs.forEach((orb, index) => {
      orb.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
    });
  }, { passive: true });
}
