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

  /* ─── CHAT WIDGET (hidden over the hero so it can't sit on top of the CTA buttons) ─── */
  const chatWidget = document.getElementById('chat-widget');
  if (chatWidget && hero && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      chatWidget.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
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

  /* ─── SCROLL PROGRESS BAR ─── */
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  /* ─── SCROLLSPY: highlight the nav link for the section in view ─── */
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const linkFor = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
    const spySections = navLinks
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    spySections.forEach(sec => spy.observe(sec));
  }

  /* ─── ANIMATED STAT COUNTERS ─── */
  const statEls = document.querySelectorAll('.stat-count');
  if (statEls.length) {
    const animateCount = el => {
      const target = parseInt(el.dataset.countTo, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (prefersReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      statEls.forEach(el => statObserver.observe(el));
    } else {
      statEls.forEach(animateCount);
    }
  }

  /* ─── CHAT ASSISTANT ─── */
  const WA_NUMBER = '447863337662';
  const waLink = message => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const waButton = (label, message) => `<a class="chat-wa-btn" href="${waLink(message)}" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 24 24"><use href="#icon-whatsapp"/></svg>${label}</a>`;

  const CHAT_KB = [
    { keywords: ['hi', 'hello', 'hey', 'yo', 'sup'], reply: `Hey! I'm the KenSuya assistant. Ask me about the menu, prices, hours, delivery, or say "order" to jump straight to WhatsApp.` },
    { keywords: ['menu', 'food', 'items', 'options'], reply: `Here's what's on: <br>• Beef Suya: £12.00<br>• Lamb: £10.00<br>• Chopped Chicken: £10.00<br>• Chicken Skewers: 4 for £10.00<br>• Plantain: £2.50 per portion<br>• Corn: £3.00<br>All hand-rolled in our own yaji spice and grilled fresh to order. ${waButton('Order via WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like to see the full menu and place an order please.`)}` },
    { keywords: ['beef'], reply: `Beef Suya (£12.00) is our signature. Thin-sliced beef, hand-rolled in yaji spice and grilled fast over an open flame. ${waButton('Order Beef Suya', `Hi! I chatted with the KenSuya assistant and I'd like to order the Beef Suya (£12.00) please.`)}` },
    { keywords: ['lamb'], reply: `Lamb (£10.00) is tender lamb, double-dusted in yaji, char-grilled till the edges catch. A fan favourite. ${waButton('Order Lamb', `Hi! I chatted with the KenSuya assistant and I'd like to order the Lamb (£10.00) please.`)}` },
    { keywords: ['chicken'], reply: `Chopped Chicken (£10.00) or Chicken Skewers (4 for £10.00): juicy chicken, grilled hot and finished with fresh onion and tomato. ${waButton('Order Chicken', `Hi! I chatted with the KenSuya assistant and I'd like to order chicken (Chopped Chicken or Skewers) please.`)}` },
    { keywords: ['plantain'], reply: `Sweet fried plantain (£2.50 per portion), caramelised at the edges for the perfect cool-down side. ${waButton('Order Plantain', `Hi! I chatted with the KenSuya assistant and I'd like to order the Plantain (£2.50 per portion) please.`)}` },
    { keywords: ['corn'], reply: `Grilled corn on the cob (£3.00), brushed with butter and a dusting of yaji. ${waButton('Order Corn', `Hi! I chatted with the KenSuya assistant and I'd like to order the Corn (£3.00) please.`)}` },
    { keywords: ['party', 'platter', 'catering', 'cater', 'event', 'group', 'wedding', 'birthday'], reply: `We build platters and larger orders for events, a mix of beef, chicken, lamb and sides. ${waButton('Message us your headcount & date', `Hi! I chatted with the KenSuya assistant about a party platter. Here's my headcount and date: `)}` },
    { keywords: ['hour', 'hours', 'open', 'time', 'closed', 'closing'], reply: `Tue–Thu 16:00–21:00 · Fri–Sat 12:00–23:00 · Sun 13:00–20:00. Closed Mondays.` },
    { keywords: ['where', 'location', 'address', 'find', 'directions'], reply: `Unit 4, Greenfield Business Park, Birmingham, B11 2AA. Collection and delivery only, no dine-in seating.` },
    { keywords: ['deliver', 'delivery', 'collect', 'collection', 'pickup', 'pick up'], reply: `We deliver across Birmingham and also do collection. Just tell us your postcode or pickup time when you order.` },
    { keywords: ['halal'], reply: `Message us on WhatsApp or Instagram before ordering and we'll happily confirm sourcing for you. ${waButton('Ask about halal sourcing', `Hi! I chatted with the KenSuya assistant and I have a question about halal sourcing for my order.`)}` },
    { keywords: ['order', 'book', 'booking', 'reserve', 'reservation'], reply: `Orders go through WhatsApp, no app or account needed. Tell us what you'd like and we'll confirm price, timing, and collection or delivery. ${waButton('Order on WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like to place an order please.`)}` },
    { keywords: ['contact', 'phone', 'number', 'whatsapp', 'call', 'human', 'person'], reply: `Call or WhatsApp +44 7863 337662. ${waButton('Chat on WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like some help please.`)}` },
    { keywords: ['thanks', 'thank you', 'cheers', 'ta'], reply: `You're welcome! Anything else, menu, hours, or ready to order?` },
  ];

  const CHAT_FALLBACK = `I might not have that one exactly, but the team will! ${waButton('Ask on WhatsApp', `Hi! I chatted with the KenSuya assistant and I have a question.`)}`;
  const CHAT_SUGGESTIONS = ['Menu & prices', 'Opening hours', 'Delivery area', 'Order now'];

  function chatMatch(input) {
    const text = input.toLowerCase();
    let best = null;
    let bestScore = 0;
    CHAT_KB.forEach(entry => {
      const score = entry.keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return best ? best.reply : CHAT_FALLBACK;
  }

  (function initChat() {
    const widget = document.getElementById('chat-widget');
    const launcher = document.getElementById('chat-launcher');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const messagesEl = document.getElementById('chat-messages');
    const suggestionsEl = document.getElementById('chat-suggestions');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    if (!widget || !launcher || !panel || !messagesEl || !form || !input) return;

    let started = false;

    const scrollToBottom = () => { messagesEl.scrollTop = messagesEl.scrollHeight; };

    const addMessage = (html, who) => {
      const el = document.createElement('div');
      el.className = `chat-msg ${who}`;
      if (who === 'user') {
        el.textContent = html;
      } else {
        el.innerHTML = html;
      }
      messagesEl.appendChild(el);
      scrollToBottom();
    };

    const addTyping = () => {
      const el = document.createElement('div');
      el.className = 'chat-msg bot chat-typing-wrap';
      el.innerHTML = '<span class="chat-typing"><span></span><span></span><span></span></span>';
      messagesEl.appendChild(el);
      scrollToBottom();
      return el;
    };

    const renderSuggestions = list => {
      suggestionsEl.innerHTML = '';
      list.forEach(label => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chat-chip';
        chip.textContent = label;
        chip.addEventListener('click', () => sendUserMessage(label));
        suggestionsEl.appendChild(chip);
      });
    };

    const respond = userText => {
      const delay = prefersReducedMotion ? 0 : 450 + Math.random() * 350;
      const typingEl = addTyping();
      setTimeout(() => {
        typingEl.remove();
        addMessage(chatMatch(userText), 'bot');
      }, delay);
    };

    function sendUserMessage(text) {
      const trimmed = text.trim();
      if (!trimmed) return;
      addMessage(trimmed, 'user');
      input.value = '';
      respond(trimmed);
    }

    const openChat = () => {
      widget.classList.add('is-open');
      launcher.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      if (!started) {
        started = true;
        addMessage(`Hey! I'm the KenSuya assistant. Ask me about the menu, hours, delivery, or say "order" to jump straight to WhatsApp.`, 'bot');
        renderSuggestions(CHAT_SUGGESTIONS);
      }
      setTimeout(() => input.focus(), 250);
    };

    const closeChat = () => {
      widget.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    };

    launcher.addEventListener('click', () => {
      widget.classList.contains('is-open') ? closeChat() : openChat();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && widget.classList.contains('is-open')) closeChat();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      sendUserMessage(input.value);
    });
  })();

  /* ─── MENU CARD POINTER TILT ─── */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.menu-card').forEach(card => {
      const strength = 6;
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(700px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }
})();
