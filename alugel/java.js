// ===== Donna Clean — Airbnb / Temporada =====

document.addEventListener('DOMContentLoaded', () => {

  // Ano dinâmico no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-xmark', open);
    };
    menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
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

  // Slider Antes/Depois (com animação de demonstração)
  document.querySelectorAll('[data-compare]').forEach(box => {
    const range = box.querySelector('.compare-range');
    const before = box.querySelector('.compare-before');
    const handle = box.querySelector('.compare-handle');
    if (!range) return;

    const setPos = (val) => {
      range.value = val;
      before.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      handle.style.left = val + '%';
    };

    const hint = document.createElement('span');
    hint.className = 'compare-hint';
    hint.innerHTML = '<i class="fa-solid fa-arrows-left-right"></i> Arraste para comparar';
    box.appendChild(hint);

    let frame = null;
    const stopDemo = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      box.classList.add('touched');
    };
    range.addEventListener('input', () => { stopDemo(); setPos(range.value); });
    ['pointerdown', 'touchstart', 'keydown'].forEach(ev => range.addEventListener(ev, stopDemo, { passive: true }));

    const runDemo = () => {
      const steps = [{ to: 92, ms: 1000 }, { to: 8, ms: 1900 }, { to: 50, ms: 1000 }];
      const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      let from = 50, i = 0, start = null;
      const tick = (now) => {
        if (start === null) start = now;
        const t = Math.min((now - start) / steps[i].ms, 1);
        setPos(Math.round(from + (steps[i].to - from) * ease(t)));
        if (t < 1) { frame = requestAnimationFrame(tick); return; }
        from = steps[i].to; i++; start = null;
        if (i < steps.length) frame = requestAnimationFrame(tick); else frame = null;
      };
      frame = requestAnimationFrame(tick);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { io.disconnect(); if (!box.classList.contains('touched')) runDemo(); }
      }, { threshold: 0.6 });
      io.observe(box);
    }
  });

});
