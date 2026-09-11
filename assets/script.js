(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── YEAR ─── */
  const yearEl = document.getElementById('yr');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── NAV SCROLL STATE ─── */
  const nav = document.querySelector('.nav');
  const hero = document.getElementById('hero');
  if (nav) {
    const setScrolled = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ─── MOBILE MENU ─── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── STICKY MOBILE CTA (hidden over the hero and again once the footer's own CTA is reachable) ─── */
  const stickyCta = document.getElementById('sticky-cta');
  const siteFooter = document.getElementById('site-footer');
  if (stickyCta && hero && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let footerVisible = false;
    const sync = () => {
      const show = !heroVisible && !footerVisible;
      stickyCta.classList.toggle('visible', show);
      stickyCta.setAttribute('aria-hidden', String(!show));
    };
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; sync(); }, { threshold: 0 }).observe(hero);
    if (siteFooter) {
      new IntersectionObserver(([entry]) => { footerVisible = entry.isIntersecting; sync(); }, { threshold: 0, rootMargin: '0px 0px -200px 0px' }).observe(siteFooter);
    }
  }

  /* ─── BACK TO TOP ─── */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop && hero && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      backToTop.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ─── EMBER PARTICLES (fire section) ─── */
  const emberField = document.querySelector('.fire-embers');
  if (emberField && !prefersReducedMotion) {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const ember = document.createElement('span');
      ember.className = 'ember';
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.animationDelay = `${Math.random() * 6}s`;
      ember.style.animationDuration = `${5 + Math.random() * 3}s`;
      ember.style.opacity = String(0.4 + Math.random() * 0.6);
      emberField.appendChild(ember);
    }
  }

  /* ─── SMOKE WISPS (hero) ─── */
  const smokeField = document.querySelector('.smoke-wisps');
  if (smokeField && !prefersReducedMotion) {
    const count = 5;
    for (let i = 0; i < count; i++) {
      const wisp = document.createElement('span');
      wisp.className = 'smoke';
      wisp.style.left = `${20 + Math.random() * 60}%`;
      wisp.style.animationDelay = `${Math.random() * 9}s`;
      wisp.style.animationDuration = `${8 + Math.random() * 4}s`;
      wisp.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
      smokeField.appendChild(wisp);
    }
  }

  /* ─── SUBTLE HERO PARALLAX ─── */
  const badgePlate = document.querySelector('.hero-badge-plate');
  if (badgePlate && !prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.12, 60);
      badgePlate.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }
})();
