document.querySelector('[data-print]').addEventListener('click', () => window.print());

const revealItems = document.querySelectorAll('.hero-copy, .hero-aside, .section-heading, .project, .experience-row, .principle-copy, .contact-section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});
