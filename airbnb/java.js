// ===== Donna Clean — Airbnb / Temporada =====

document.addEventListener('DOMContentLoaded', () => {

  // Ano dinâmico no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      });
    });
  }

  // Header com sombra ao rolar
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none';
  });

  // Animação de revelação ao rolar
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // Slider Antes/Depois
  document.querySelectorAll('[data-compare]').forEach(box => {
    const range = box.querySelector('.compare-range');
    const before = box.querySelector('.compare-before');
    const handle = box.querySelector('.compare-handle');
    if (!range) return;
    range.addEventListener('input', () => {
      const val = range.value;
      before.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      handle.style.left = val + '%';
    });
  });

});
