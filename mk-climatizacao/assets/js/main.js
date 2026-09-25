/* MK Climatização — scripts da landing page */
(function () {
  'use strict';

  var MK_CONFIG = {
    whatsapp: '5585992158851',
    defaultMessage: 'Olá! Vim pelo site e gostaria de um orçamento.',
    popupDelayMs: 30000,
    // Conversão do Google Ads disparada a cada clique no WhatsApp.
    // Ex.: 'AW-123456789/AbCdEfGhIjKlMnOp' (ID/rótulo da ação de conversão). Deixe vazio para desativar.
    adsConversion: ''
  };

  var doc = document;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- Links de WhatsApp com mensagem contextual + rastreamento ---------- */
  function waUrl(msg) {
    return 'https://wa.me/' + MK_CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || MK_CONFIG.defaultMessage);
  }
  $$('[data-wa]').forEach(function (a) {
    a.href = waUrl(a.getAttribute('data-msg'));
    a.addEventListener('click', function () {
      var src = a.getAttribute('data-src') || 'site';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_click', wa_source: src });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { event_category: 'contato', event_label: src });
        if (MK_CONFIG.adsConversion) window.gtag('event', 'conversion', { send_to: MK_CONFIG.adsConversion });
      }
    });
  });

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header com sombra ao rolar ---------- */
  var header = $('#header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Animações de entrada ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Carrossel de avaliações ---------- */
  var track = $('#testiTrack');
  if (track) {
    var step = function () {
      var card = $('.testi-card', track);
      return card ? card.getBoundingClientRect().width + 17.6 : 320;
    };
    var go = function (dir) {
      var max = track.scrollWidth - track.clientWidth - 4;
      if (dir > 0 && track.scrollLeft >= max) track.scrollTo({ left: 0 });
      else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: max });
      else track.scrollBy({ left: dir * step() });
    };
    $$('[data-car]').forEach(function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-car') === 'next' ? 1 : -1); pause(); });
    });
    var timer = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var start = function () { if (!reduce && !timer) timer = setInterval(function () { go(1); }, 5000); };
    var pause = function () { clearInterval(timer); timer = null; setTimeout(start, 9000); };
    ['pointerdown', 'wheel', 'touchstart', 'focusin'].forEach(function (ev) { track.addEventListener(ev, pause, { passive: true }); });
    start();
  }

  /* ---------- Galeria: filtros, "ver mais" e lightbox ---------- */
  var grid = $('#galleryGrid');
  var moreBtn = $('#galleryMore');
  var INITIAL = 12;
  var filter = 'all';
  var expanded = false;
  function renderGallery() {
    var shown = 0;
    $$('.g-item', grid).forEach(function (it) {
      var match = filter === 'all' || it.getAttribute('data-cat') === filter;
      var visible = match && (expanded || filter !== 'all' || shown < INITIAL);
      if (match && visible) shown++;
      it.classList.toggle('hidden', !visible);
    });
    var total = $$('.g-item', grid).length;
    moreBtn.parentNode.style.display = (filter === 'all' && !expanded && total > INITIAL) ? '' : 'none';
  }
  if (grid) {
    $$('.filter-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filter-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        filter = b.getAttribute('data-filter');
        renderGallery();
      });
    });
    moreBtn.addEventListener('click', function () { expanded = true; renderGallery(); });
    renderGallery();

    var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), idx = 0, list = [], lastFocus = null;
    var show = function (i) {
      idx = (i + list.length) % list.length;
      var it = list[idx];
      lbImg.src = it.getAttribute('data-full');
      lbImg.alt = it.getAttribute('data-caption');
      lbCap.textContent = it.getAttribute('data-caption');
    };
    var openLb = function (it) {
      list = $$('.g-item', grid).filter(function (x) { return !x.classList.contains('hidden'); });
      lastFocus = doc.activeElement;
      show(list.indexOf(it));
      lb.classList.add('open');
      doc.body.classList.add('no-scroll');
      $('.lb-close', lb).focus();
    };
    var closeLb = function () {
      lb.classList.remove('open');
      doc.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    };
    grid.addEventListener('click', function (e) {
      var it = e.target.closest('.g-item');
      if (it) openLb(it);
    });
    lb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lb]');
      if (b) { var a = b.getAttribute('data-lb'); if (a === 'close') closeLb(); else show(idx + (a === 'next' ? 1 : -1)); }
      else if (e.target === lb) closeLb();
    });
    var tx = null;
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      tx = null;
    });
    doc.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---------- Pop-up após 30 segundos (uma vez por sessão) ---------- */
  var popup = $('#popup');
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* sem storage */ } }
  };
  if (popup && !store.get('mk_popup_seen')) {
    var popLastFocus = null;
    var openPopup = function () {
      if ($('#lightbox').classList.contains('open')) { setTimeout(openPopup, 5000); return; }
      popLastFocus = doc.activeElement;
      popup.classList.add('open');
      doc.body.classList.add('no-scroll');
      store.set('mk_popup_seen', '1');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'popup_view' });
      $('.popup-close', popup).focus();
    };
    var closePopup = function () {
      popup.classList.remove('open');
      doc.body.classList.remove('no-scroll');
      if (popLastFocus) popLastFocus.focus();
    };
    setTimeout(openPopup, MK_CONFIG.popupDelayMs);
    $$('[data-popup-close]', popup).forEach(function (b) { b.addEventListener('click', closePopup); });
    $$('[data-wa]', popup).forEach(function (b) { b.addEventListener('click', closePopup); });
    popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && popup.classList.contains('open')) closePopup(); });
  }
})();
