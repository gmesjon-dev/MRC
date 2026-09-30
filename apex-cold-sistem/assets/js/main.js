(function () {
  'use strict';

  var WHATSAPP = '556295596638';
  var POPUP_DELAY_MS = 30000;

  function safeStorage(kind) {
    try { var s = window[kind]; s.setItem('__t', '1'); s.removeItem('__t'); return s; } catch (e) { return null; }
  }
  var session = safeStorage('sessionStorage');

  /* ---------- WhatsApp: mensagem pré-preenchida + evento de conversão ---------- */
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
    var msg = link.getAttribute('data-msg');
    link.href = 'https://wa.me/' + WHATSAPP + (msg ? '?text=' + encodeURIComponent(msg) : '');
    link.target = '_blank';
    link.rel = 'noopener';
    link.addEventListener('click', function () {
      var location = link.getAttribute('data-cta') || 'desconhecido';
      window.dataLayer.push({ event: 'whatsapp_click', cta_location: location });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { cta_location: location });
      }
      if (session) session.setItem('apex_wa_clicked', '1');
    });
  });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Carrossel de logos (loop infinito) ---------- */
  document.querySelectorAll('[data-marquee] .marquee__track').forEach(function (track) {
    Array.prototype.slice.call(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach(function (img) { img.alt = ''; });
      track.appendChild(clone);
    });
  });

  /* ---------- Avaliações ---------- */
  var reviews = Array.isArray(window.APEX_REVIEWS) ? window.APEX_REVIEWS.slice() : [];
  var isDemo = /[?&]demo-avaliacoes\b/.test(window.location.search);
  if (!reviews.length && isDemo) {
    reviews = [1, 2, 3, 4].map(function (n) {
      return { name: 'Nome do cliente ' + n, text: 'Exemplo de avaliação. Substitua por avaliações reais em assets/js/reviews.js.', stars: 5, date: 'há 1 semana', demo: true };
    });
  }
  var reviewsSection = document.getElementById('avaliacoes');
  var reviewsLink = document.querySelector('[data-reviews-link]');
  if (!reviews.length) {
    if (reviewsLink) reviewsLink.remove();
  } else if (reviewsSection) {
    reviewsSection.hidden = false;
    renderReviews(reviewsSection, reviews);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderReviews(section, list) {
    var track = section.querySelector('[data-reviews]');
    var palette = ['#1a73e8', '#8e24aa', '#00897b', '#e8710a', '#5d4037', '#3949ab'];
    var google = '<svg class="review-card__g" viewBox="0 0 48 48" aria-label="Google"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
    var check = '<span class="review-card__verified" title="Verificado"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg></span>';

    track.innerHTML = list.map(function (r, i) {
      var stars = Math.max(1, Math.min(5, Number(r.stars) || 5));
      var initial = escapeHtml((r.name || '?').trim().charAt(0).toUpperCase());
      return '<li class="review-card">' +
        '<div class="review-card__top"><span class="review-card__stars" aria-label="' + stars + ' de 5 estrelas">' + '★★★★★'.slice(0, stars) + check + '</span>' + google + '</div>' +
        '<blockquote>“' + escapeHtml(r.text) + '”</blockquote>' +
        '<div class="review-card__author"><span class="review-card__avatar" style="background:' + escapeHtml(r.color || palette[i % palette.length]) + '">' + initial + '</span>' +
        '<div><strong>' + escapeHtml(r.name) + '</strong><span>' + escapeHtml(r.date || '') + '</span></div></div>' +
        (r.demo ? '<span class="review-card__demo">Exemplo de layout</span>' : '') +
        '</li>';
    }).join('');

    var prev = section.querySelector('.reviews__nav--prev');
    var next = section.querySelector('.reviews__nav--next');
    var index = 0;
    var timer;

    function perView() {
      var w = window.innerWidth;
      return w <= 640 ? 1 : w <= 1080 ? 2 : 3;
    }
    function maxIndex() { return Math.max(0, list.length - perView()); }
    function update() {
      index = Math.min(index, maxIndex());
      var card = track.children[0];
      var step = card ? card.getBoundingClientRect().width + 20 : 0;
      track.style.transform = 'translateX(' + (-index * step) + 'px)';
      var hideNav = maxIndex() === 0;
      prev.hidden = next.hidden = hideNav;
    }
    function go(delta) {
      var max = maxIndex();
      index = index + delta;
      if (index > max) index = 0;
      if (index < 0) index = max;
      update();
    }
    function autoplay() {
      clearInterval(timer);
      timer = setInterval(function () { go(1); }, 6000);
    }
    prev.addEventListener('click', function () { go(-1); autoplay(); });
    next.addEventListener('click', function () { go(1); autoplay(); });

    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); autoplay(); }
      startX = null;
    });
    window.addEventListener('resize', update);
    update();
    autoplay();
  }

  /* ---------- Galeria + lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] a'));
  var current = 0;
  var lastFocus = null;

  function showPhoto(i) {
    current = (i + galleryLinks.length) % galleryLinks.length;
    var link = galleryLinks[current];
    var img = lightbox.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = link.getAttribute('data-caption') || '';
    lightbox.querySelector('figcaption').textContent = link.getAttribute('data-caption') || '';
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showPhoto(i);
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    lightbox.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  }
  if (lightbox && galleryLinks.length) {
    galleryLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) { e.preventDefault(); openLightbox(i); });
    });
    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', function () { showPhoto(current - 1); });
    lightbox.querySelector('.lightbox__nav--next').addEventListener('click', function () { showPhoto(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  }

  /* ---------- Pop-up (após ~30s, uma vez por sessão) ---------- */
  var popup = document.getElementById('popup');
  function openPopup() {
    if (!popup || !popup.hidden) return;
    if (session && (session.getItem('apex_popup_seen') || session.getItem('apex_wa_clicked'))) return;
    if (lightbox && !lightbox.hidden) { setTimeout(openPopup, 8000); return; }
    lastFocus = document.activeElement;
    popup.hidden = false;
    document.body.classList.add('no-scroll');
    if (session) session.setItem('apex_popup_seen', '1');
    popup.querySelector('.popup__close').focus();
  }
  function closePopup() {
    popup.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  }
  if (popup) {
    popup.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', closePopup); });
    popup.querySelector('a').addEventListener('click', function () { setTimeout(closePopup, 300); });
    setTimeout(openPopup, POPUP_DELAY_MS);
  }

  document.addEventListener('keydown', function (e) {
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(current - 1);
      if (e.key === 'ArrowRight') showPhoto(current + 1);
    } else if (popup && !popup.hidden && e.key === 'Escape') {
      closePopup();
    }
  });

  /* ---------- Animação suave ao rolar ---------- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = document.querySelectorAll('.service-card, .feature, .steps li, .gallery__item, .faq__list details, .cta-strip');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        // libera hover/transform próprios do elemento depois da entrada
        setTimeout(function () { el.classList.remove('reveal', 'is-visible'); }, 700);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
