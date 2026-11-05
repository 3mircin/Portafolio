const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

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
