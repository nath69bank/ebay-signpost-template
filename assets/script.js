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

  const WA_NUMBER = '447863337662';
  const waLink = message => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const waButton = (label, message) => `<a class="chat-wa-btn" href="${waLink(message)}" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 24 24"><use href="#icon-whatsapp"/></svg>${label}</a>`;

  /* ─── BASKET (shared by the website UI and the chat assistant) ─── */
  const MENU_ITEMS = [
    { id: 'beef', name: 'Beef Suya', price: 12.00, priceLabel: '£12.00' },
    { id: 'lamb', name: 'Lamb', price: 10.00, priceLabel: '£10.00' },
    { id: 'chicken-chopped', name: 'Chopped Chicken', price: 10.00, priceLabel: '£10.00' },
    { id: 'chicken-skewers', name: 'Chicken Skewers', price: 10.00, priceLabel: '5 for £10.00' },
    { id: 'plantain', name: 'Plantain', price: 2.50, priceLabel: '£2.50 per portion' },
  ];

  const BASKET_KEY = 'kensuya_basket_v1';
  const findMenuItem = id => MENU_ITEMS.find(i => i.id === id);
  const formatGBP = n => `£${n.toFixed(2)}`;

  const loadBasket = () => {
    try {
      const raw = localStorage.getItem(BASKET_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  };

  let basketState = loadBasket();
  const saveBasket = () => {
    try { localStorage.setItem(BASKET_KEY, JSON.stringify(basketState)); } catch (e) { /* storage unavailable */ }
  };

  const basketEntries = () => Object.keys(basketState)
    .map(id => ({ item: findMenuItem(id), qty: basketState[id] }))
    .filter(e => e.item && e.qty > 0);

  const basketCount = () => basketEntries().reduce((sum, e) => sum + e.qty, 0);
  const basketTotal = () => basketEntries().reduce((sum, e) => sum + e.qty * e.item.price, 0);

  const setQty = (id, qty) => {
    if (!findMenuItem(id)) return;
    const clamped = Math.max(0, Math.min(99, Math.round(qty)));
    if (clamped <= 0) delete basketState[id];
    else basketState[id] = clamped;
    saveBasket();
    renderBasket();
  };

  const addToBasket = (id, qty = 1) => {
    if (!findMenuItem(id)) return false;
    setQty(id, (basketState[id] || 0) + qty);
    return true;
  };

  const removeFromBasket = id => {
    delete basketState[id];
    saveBasket();
    renderBasket();
  };

  const clearBasket = () => {
    basketState = {};
    saveBasket();
    renderBasket();
  };

  const buildOrderMessage = notes => {
    const entries = basketEntries();
    if (!entries.length) return '';
    const lines = entries.map(e => `${e.qty}x ${e.item.name} - ${formatGBP(e.item.price * e.qty)}`);
    let msg = `Hi! I'd like to place this order please:\n\n${lines.join('\n')}\n\nTotal: ${formatGBP(basketTotal())}`;
    if (notes && notes.trim()) msg += `\n\nNotes: ${notes.trim()}`;
    return msg;
  };

  function renderBasket() {
    const entries = basketEntries();
    const count = basketCount();

    document.querySelectorAll('.basket-badge').forEach(badge => {
      badge.textContent = String(count);
      badge.hidden = count === 0;
    });

    const itemsEl = document.getElementById('basket-items');
    const emptyEl = document.getElementById('basket-empty');
    const footerEl = document.getElementById('basket-footer');
    const totalEl = document.getElementById('basket-total');
    if (!itemsEl || !emptyEl || !footerEl || !totalEl) return;

    if (!entries.length) {
      itemsEl.innerHTML = '';
      emptyEl.hidden = false;
      footerEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    footerEl.hidden = false;
    totalEl.textContent = formatGBP(basketTotal());

    itemsEl.innerHTML = entries.map(e => `
      <li class="basket-item" data-item-id="${e.item.id}">
        <div class="basket-item-info">
          <span class="basket-item-name">${e.item.name}</span>
          <span class="basket-item-unit-price">${e.item.priceLabel}</span>
        </div>
        <div class="basket-item-controls">
          <button type="button" class="basket-qty-btn" data-qty-decrease="${e.item.id}" aria-label="Decrease quantity of ${e.item.name}">−</button>
          <span class="basket-qty">${e.qty}</span>
          <button type="button" class="basket-qty-btn" data-qty-increase="${e.item.id}" aria-label="Increase quantity of ${e.item.name}">+</button>
        </div>
        <div class="basket-item-line-total">${formatGBP(e.item.price * e.qty)}</div>
        <button type="button" class="basket-item-remove" data-remove-item="${e.item.id}">Remove</button>
      </li>
    `).join('');
  }

  (function initBasket() {
    const widget = document.getElementById('basket-widget');
    const overlay = document.getElementById('basket-overlay');
    const panel = document.getElementById('basket-panel');
    const notesInput = document.getElementById('basket-notes');
    const checkoutBtn = document.getElementById('basket-checkout');
    const clearBtn = document.getElementById('basket-clear');
    if (!widget || !panel) return;

    renderBasket();

    const toggles = [document.getElementById('basket-toggle'), document.getElementById('basket-toggle-mobile')].filter(Boolean);

    const openBasket = () => {
      widget.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      toggles.forEach(t => t.setAttribute('aria-expanded', 'true'));
      document.body.style.overflow = 'hidden';
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileToggle = document.querySelector('.nav-toggle');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    };

    const closeBasket = () => {
      widget.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
      document.body.style.overflow = '';
    };

    toggles.forEach(t => t.addEventListener('click', () => {
      widget.classList.contains('is-open') ? closeBasket() : openBasket();
    }));
    if (overlay) overlay.addEventListener('click', closeBasket);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && widget.classList.contains('is-open')) closeBasket();
    });

    document.addEventListener('click', e => {
      const addBtn = e.target.closest('[data-add-item]');
      if (addBtn) {
        addToBasket(addBtn.dataset.addItem, 1);
        addBtn.classList.add('is-added');
        const original = addBtn.textContent;
        addBtn.innerHTML = `<svg width="14" height="14"><use href="#icon-check"/></svg>Added`;
        setTimeout(() => {
          addBtn.classList.remove('is-added');
          addBtn.innerHTML = `<svg width="14" height="14"><use href="#icon-basket"/></svg>Add to Basket`;
        }, 1400);
        return;
      }
      const incBtn = e.target.closest('[data-qty-increase]');
      if (incBtn) { setQty(incBtn.dataset.qtyIncrease, (basketState[incBtn.dataset.qtyIncrease] || 0) + 1); return; }
      const decBtn = e.target.closest('[data-qty-decrease]');
      if (decBtn) { setQty(decBtn.dataset.qtyDecrease, (basketState[decBtn.dataset.qtyDecrease] || 0) - 1); return; }
      const removeBtn = e.target.closest('[data-remove-item]');
      if (removeBtn) { removeFromBasket(removeBtn.dataset.removeItem); return; }
    });

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        const message = buildOrderMessage(notesInput ? notesInput.value : '');
        if (!message) return;
        window.open(waLink(message), '_blank', 'noopener,noreferrer');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearBasket();
        if (notesInput) notesInput.value = '';
      });
    }
  })();

  /* ─── CHAT ASSISTANT ─── */

  const CHAT_KB = [
    { keywords: ['hi', 'hello', 'hey', 'yo', 'sup'], reply: `Hey! I'm the KenSuya assistant. Ask me about the menu, prices, hours, delivery, or say "order" to jump straight to WhatsApp.` },
    { keywords: ['menu', 'food', 'items', 'options'], reply: `Here's what's on: <br>• Beef Suya: £12.00<br>• Lamb: £10.00<br>• Chopped Chicken: £10.00<br>• Chicken Skewers: 5 for £10.00<br>• Plantain: £2.50 per portion<br>All hand-rolled in our own yaji spice and grilled fresh to order. Say something like "add beef to basket" and I'll build your order, or jump straight to WhatsApp. ${waButton('Order via WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like to see the full menu and place an order please.`)}` },
    { keywords: ['beef'], reply: `Beef Suya (£12.00) is our signature. Thin-sliced beef, hand-rolled in yaji spice and grilled fast over an open flame. ${waButton('Order Beef Suya', `Hi! I chatted with the KenSuya assistant and I'd like to order the Beef Suya (£12.00) please.`)}` },
    { keywords: ['lamb'], reply: `Lamb (£10.00) is tender lamb, double-dusted in yaji, char-grilled till the edges catch. A fan favourite. ${waButton('Order Lamb', `Hi! I chatted with the KenSuya assistant and I'd like to order the Lamb (£10.00) please.`)}` },
    { keywords: ['chicken'], reply: `Chopped Chicken (£10.00) or Chicken Skewers (5 for £10.00): juicy chicken, grilled hot and finished with fresh onion and tomato. ${waButton('Order Chicken', `Hi! I chatted with the KenSuya assistant and I'd like to order chicken (Chopped Chicken or Skewers) please.`)}` },
    { keywords: ['plantain'], reply: `Sweet fried plantain (£2.50 per portion), caramelised at the edges for the perfect cool-down side. ${waButton('Order Plantain', `Hi! I chatted with the KenSuya assistant and I'd like to order the Plantain (£2.50 per portion) please.`)}` },
    { keywords: ['party', 'platter', 'catering', 'cater', 'event', 'group', 'wedding', 'birthday'], reply: `We build platters and larger orders for events, a mix of beef, chicken, lamb and sides. ${waButton('Message us your headcount & date', `Hi! I chatted with the KenSuya assistant about a party platter. Here's my headcount and date: `)}` },
    { keywords: ['hour', 'hours', 'open', 'time', 'closed', 'closing'], reply: `Tue–Thu 16:00–21:00 · Fri–Sat 12:00–23:00 · Sun 13:00–20:00. Closed Mondays.` },
    { keywords: ['where', 'location', 'address', 'find', 'directions'], reply: `143A Hockley Hill, Birmingham, B18 5AN. Collection and delivery only, no dine-in seating.` },
    { keywords: ['deliver', 'delivery', 'collect', 'collection', 'pickup', 'pick up'], reply: `We deliver across Birmingham and also do collection. Just tell us your postcode or pickup time when you order.` },
    { keywords: ['halal'], reply: `Message us on WhatsApp or Instagram before ordering and we'll happily confirm sourcing for you. ${waButton('Ask about halal sourcing', `Hi! I chatted with the KenSuya assistant and I have a question about halal sourcing for my order.`)}` },
    { keywords: ['nuts', 'nut-free', 'nut free', 'peanut', 'peanuts', 'groundnut', 'groundnuts', 'allergy', 'allergies', 'allergen'], reply: `Our yaji spice is our own in-house blend and is completely nut-free, no peanuts or groundnuts. If you have a nut allergy or any other allergy, let us know when you order and we'll happily talk it through. ${waButton('Ask about allergies', `Hi! I chatted with the KenSuya assistant and I have a question about allergies for my order.`)}` },
    { keywords: ['order', 'book', 'booking', 'reserve', 'reservation'], reply: `Orders go through WhatsApp, no app or account needed. Tell us what you'd like and we'll confirm price, timing, and collection or delivery. ${waButton('Order on WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like to place an order please.`)}` },
    { keywords: ['contact', 'phone', 'number', 'whatsapp', 'call', 'human', 'person'], reply: `Call or WhatsApp +44 7863 337662. ${waButton('Chat on WhatsApp', `Hi! I chatted with the KenSuya assistant and I'd like some help please.`)}` },
    { keywords: ['thanks', 'thank you', 'cheers', 'ta'], reply: `You're welcome! Anything else, menu, hours, or ready to order?` },
  ];

  const CHAT_FALLBACK = `I might not have that one exactly, but the team will! ${waButton('Ask on WhatsApp', `Hi! I chatted with the KenSuya assistant and I have a question.`)}`;
  const CHAT_SUGGESTIONS = ['Menu & prices', 'Opening hours', 'My basket', 'Checkout'];

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

  /* ─── CHAT BASKET INTENTS: add/remove/view/checkout, tried before the general keyword reply ─── */
  const CHAT_ITEM_MATCHERS = [
    { id: 'chicken-skewers', keywords: ['chicken skewer', 'chicken skewers', 'skewer', 'skewers'] },
    { id: 'chicken-chopped', keywords: ['chopped chicken', 'chicken'] },
    { id: 'beef', keywords: ['beef'] },
    { id: 'lamb', keywords: ['lamb'] },
    { id: 'plantain', keywords: ['plantain'] },
  ];
  const CHAT_QTY_WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, a: 1, an: 1 };

  const findChatItem = text => {
    const match = CHAT_ITEM_MATCHERS.find(m => m.keywords.some(kw => text.includes(kw)));
    return match ? match.id : null;
  };

  const extractChatQty = text => {
    const numMatch = text.match(/\b(\d{1,2})\b/);
    if (numMatch) return Math.max(1, parseInt(numMatch[1], 10));
    for (const word in CHAT_QTY_WORDS) {
      if (new RegExp(`\\b${word}\\b`).test(text)) return CHAT_QTY_WORDS[word];
    }
    return 1;
  };

  const basketSummaryLines = () => basketEntries().map(e => `${e.qty}x ${e.item.name} - ${formatGBP(e.item.price * e.qty)}`).join('<br>');

  function handleBasketIntent(rawText) {
    const text = rawText.toLowerCase();

    if (/(checkout|check out|place (my|the|an)? ?order|confirm (my|the)? ?order|complete (my|the)? ?order|ready to (pay|order))/.test(text)) {
      const entries = basketEntries();
      if (!entries.length) return `Your basket's empty right now. Add something first, like "add beef to basket", then say "checkout" and I'll build your order.`;
      const message = buildOrderMessage('');
      return `Here's your order:<br>${basketSummaryLines()}<br><strong>Total: ${formatGBP(basketTotal())}</strong><br>Tap below to send it to us on WhatsApp. ${waButton('Send Order via WhatsApp', message)}`;
    }

    if (/(view|show|see) (my |the )?basket|what'?s in my basket|my basket\b/.test(text)) {
      const entries = basketEntries();
      if (!entries.length) return `Your basket is empty. Try "add beef to basket" or tap Add to Basket on any menu item.`;
      return `Your basket:<br>${basketSummaryLines()}<br><strong>Total: ${formatGBP(basketTotal())}</strong><br>Say "checkout" whenever you're ready.`;
    }

    if (/(clear|empty) (my |the )?basket/.test(text)) {
      if (!basketEntries().length) return `Your basket's already empty.`;
      clearBasket();
      return `Done, your basket's empty.`;
    }

    if (/\b(remove|delete|take out)\b/.test(text)) {
      const id = findChatItem(text);
      if (!id) return null;
      const item = findMenuItem(id);
      if (!basketState[id]) return `You don't have ${item.name} in your basket yet.`;
      removeFromBasket(id);
      const remaining = basketCount();
      return `Removed ${item.name} from your basket. ${remaining ? `You've still got ${remaining} item${remaining === 1 ? '' : 's'} in there.` : `Your basket's empty now.`}`;
    }

    if (/\badd\b/.test(text) || /\bbasket\b/.test(text)) {
      const id = findChatItem(text);
      if (id) {
        const qty = extractChatQty(text);
        addToBasket(id, qty);
        const item = findMenuItem(id);
        return `Added ${qty}x ${item.name} to your basket. Basket total: ${formatGBP(basketTotal())}. Say "checkout" when you're ready, or keep adding.`;
      }
    }

    return null;
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
        const basketReply = handleBasketIntent(userText);
        addMessage(basketReply !== null ? basketReply : chatMatch(userText), 'bot');
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
        addMessage(`Hey! I'm the KenSuya assistant. Ask me about the menu, hours or delivery, or say something like "add beef to basket" and I'll build your order for WhatsApp.`, 'bot');
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
