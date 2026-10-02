(function () {
  'use strict';

  var WHATSAPP = '5581991796425';
  var POPUP_DELAY_MS = 30000;

  /* ---------- WhatsApp: links + rastreio de conversão ---------- */
  function waUrl(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg || 'Olá! Vim pelo site.');
  }

  document.querySelectorAll('.js-wa').forEach(function (el) {
    el.href = waUrl(el.getAttribute('data-msg'));
    el.target = '_blank';
    el.rel = 'noopener';
    el.addEventListener('click', function () {
      var label = (el.textContent || '').trim() || 'whatsapp';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_click', button: label });
      // Google Ads: troque AW-XXXXXXXXXX/YYYYYYYY pelo rótulo de conversão da conta.
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/YYYYYYYY' });
      }
    });
  });

  /* ---------- Cabeçalho / menu ---------- */
  var header = document.querySelector('.header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Contadores + animação de entrada ---------- */
  function countUp(el) {
    var target = +el.getAttribute('data-count');
    var start = null;
    var dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealEls = document.querySelectorAll('.service, .segment, .feature, .steps li, .stat, .faq details, .section__head');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        var c = e.target.querySelector('[data-count]');
        if (c) countUp(c);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(countUp);
  }

  /* ---------- Trabalhos realizados: filtros ---------- */
  var filters = document.querySelectorAll('.filter');
  var jobs = document.querySelectorAll('.job');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      jobs.forEach(function (j) { j.hidden = f !== 'todos' && j.getAttribute('data-cat') !== f; });
    });
  });

  /* ---------- Galeria: "ver mais" + lightbox ---------- */
  var gallery = document.getElementById('gallery');
  var gLinks = Array.prototype.slice.call(gallery.querySelectorAll('a'));
  if (gLinks.length > 12) {
    gallery.classList.add('is-collapsed');
    var more = document.createElement('div');
    more.className = 'gallery__more';
    more.innerHTML = '<button class="btn btn--outline" type="button">Ver mais fotos (' + (gLinks.length - 12) + ')</button>';
    gallery.after(more);
    more.querySelector('button').addEventListener('click', function () {
      gallery.classList.remove('is-collapsed');
      more.remove();
    });
  }

  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + gLinks.length) % gLinks.length;
    lbImg.src = gLinks[lbIndex].href;
    lbImg.alt = gLinks[lbIndex].querySelector('img').alt;
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  gLinks.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showLb(i);
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });
  lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
  lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { showLb(lbIndex - 1); });
  lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { showLb(lbIndex + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

  /* ---------- Avaliações (formato Google) ---------- */
  var reviews = [
    { n: 'Rafaela Cavalcanti', d: '22 Set 2026', c: '#6c5ce7', t: 'Serviço de excelência! Equipe pontual, educada e muito caprichosa na instalação dos dois splits aqui de casa. Recomendo demais' },
    { n: 'Bruno Albuquerque', d: '18 Set 2026', c: '#0984e3', t: 'Melhor empresa de ar-condicionado que já contratei no Recife. Preço justo e atendimento rápido pelo WhatsApp.' },
    { n: 'Luciana Pessoa', d: '9 Set 2026', c: '#e84363', t: 'Fizeram a higienização dos meus 3 aparelhos e voltaram a gelar como novos. Super indico!' },
    { n: 'Diego Lins', d: '2 Set 2026', c: '#00a884', t: 'Meu ar tava pingando dentro do quarto e eles resolveram no mesmo dia, técnico muito atencioso' },
    { n: 'Patrícia Wanderley', d: '27 Ago 2026', c: '#f39c12', t: 'Contratamos o PMOC para o consultório na Ilha do Leite. Tudo organizado, com relatório e cronograma certinho.' },
    { n: 'Marcos Tavares', d: '19 Ago 2026', c: '#2d3436', t: 'Instalaram o piso-teto da nossa loja em Boa Viagem com acabamento perfeito. Equipe uniformizada e muito profissional' },
    { n: 'Amanda Barreto', d: '11 Ago 2026', c: '#8e44ad', t: 'Chamei de manhã e à tarde já estavam aqui. Explicaram tudo o que foi feito e deixaram o apartamento limpinho.' },
    { n: 'Gustavo Moura', d: '30 Jul 2026', c: '#0097a7', t: 'Fizeram recarga de gás e encontraram um vazamento que outra empresa não tinha achado. Honestos e competentes' },
    { n: 'Renata Holanda', d: '21 Jul 2026', c: '#d35400', t: 'Atendimento nota 10 do orçamento até o final do serviço. Já indiquei para minha família em Olinda!' },
    { n: 'Thiago Maranhão', d: '12 Jul 2026', c: '#1e8449', t: 'Fizeram o ponto elétrico e a instalação do ar do escritório, tudo certinho e com nota fiscal' },
    { n: 'Camila Freitas', d: '3 Jul 2026', c: '#c0392b', t: 'Ótimo serviço, rápido e com garantia. O ar ficou silencioso de novo 👏' },
    { n: 'Eduardo Siqueira', d: '24 Jun 2026', c: '#2c3e50', t: 'Recomendo a QClima, pessoal sério e caprichoso. Voltarei a chamar com certeza' }
  ];

  function initials(n) { var p = n.split(' '); return (p[0].charAt(0) + p[p.length - 1].charAt(0)).toUpperCase(); }
  var starSvg = '<span class="stars">' + new Array(6).join('<svg><use href="#star"/></svg>') + '</span>';
  var track = document.querySelector('#reviews .carousel__track');
  track.innerHTML = reviews.map(function (r) {
    return '<article class="review">' +
      '<div class="review__head">' +
        '<span class="review__avatar" style="background:' + r.c + '">' + initials(r.n) + '</span>' +
        '<div class="review__who"><div class="review__name">' + r.n + '</div><div class="review__meta">' + r.d + '</div></div>' +
        '<span class="review__g" aria-label="Google">G</span>' +
      '</div>' +
      '<div class="review__stars">' + starSvg + '</div>' +
      '<p class="review__text">' + r.t + '</p>' +
    '</article>';
  }).join('');

  var viewport = document.querySelector('#reviews .carousel__viewport');
  var dotsWrap = document.getElementById('reviewDots');
  var cards = track.children;
  var pos = 0;
  var timer;

  function perView() {
    var w = window.innerWidth;
    return w <= 767 ? 1 : w <= 1024 ? 2 : 3;
  }
  function maxPos() { return Math.max(0, cards.length - perView()); }
  function renderDots() {
    var n = maxPos() + 1;
    dotsWrap.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir para avaliação ' + (i + 1));
      b.addEventListener('click', (function (k) { return function () { go(k); restart(); }; })(i));
      dotsWrap.appendChild(b);
    }
  }
  function go(i) {
    var m = maxPos();
    pos = i > m ? 0 : i < 0 ? m : i;
    var step = cards[0].getBoundingClientRect().width + 20;
    track.style.transform = 'translateX(' + (-pos * step) + 'px)';
    Array.prototype.forEach.call(dotsWrap.children, function (d, k) { d.classList.toggle('is-active', k === pos); });
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(pos + 1); }, 5000);
  }
  document.querySelector('.carousel__btn--prev').addEventListener('click', function () { go(pos - 1); restart(); });
  document.querySelector('.carousel__btn--next').addEventListener('click', function () { go(pos + 1); restart(); });
  viewport.addEventListener('mouseenter', function () { clearInterval(timer); });
  viewport.addEventListener('mouseleave', restart);

  // Swipe no celular
  var sx = null;
  viewport.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(pos + (dx < 0 ? 1 : -1));
    sx = null;
    restart();
  });

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { renderDots(); go(Math.min(pos, maxPos())); }, 150);
  });
  renderDots();
  go(0);
  restart();

  /* ---------- Pop-up após 30s (uma vez por sessão) ---------- */
  var popup = document.getElementById('popup');
  function storageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function storageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  function openPopup() {
    if (storageGet('cf_popup')) return;
    if (!lb.hidden) { setTimeout(openPopup, 10000); return; }
    popup.hidden = false;
    document.body.style.overflow = 'hidden';
    storageSet('cf_popup', '1');
  }
  function closePopup() {
    popup.hidden = true;
    document.body.style.overflow = '';
  }
  popup.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', closePopup); });
  popup.querySelector('.js-wa').addEventListener('click', closePopup);
  setTimeout(openPopup, POPUP_DELAY_MS);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePopup(); closeLb(); }
    if (!lb.hidden && e.key === 'ArrowRight') showLb(lbIndex + 1);
    if (!lb.hidden && e.key === 'ArrowLeft') showLb(lbIndex - 1);
  });
})();
