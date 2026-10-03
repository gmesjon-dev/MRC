/* ==========================================================================
   QClima — Landing page
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var WHATSAPP = body.dataset.whatsapp || '5581991796425';
  var POPUP_DELAY_MS = 30000;

  /* ---------- Avaliações (formato Google) ---------- */
  var REVIEWS = [
    { name: 'Rafaela Cavalcanti', date: '18 Setembro 2026', color: '#7c5cf0', text: 'Instalaram 2 splits aqui em casa em Boa Viagem, chegaram no horário e deixaram tudo limpo. Técnico muito educado, explicou tudo direitinho. Recomendo demais!' },
    { name: 'Eduardo Albuquerque', date: '11 Setembro 2026', color: '#0c86d0', text: 'Fizeram o PMOC da minha clínica e resolveram toda a parte de documentação. Atendimento sério e preço justo' },
    { name: 'Juliana Moura', date: '2 Setembro 2026', color: '#e1306c', text: 'Meu ar tava pingando e sem gelar. Vieram no mesmo dia, fizeram a higienização e a recarga de gás e agora tá gelando como novo.' },
    { name: 'Thiago Lins', date: '27 Agosto 2026', color: '#0f9d58', text: 'Melhor empresa de ar condicionado que já contratei em Recife. Orçamento rápido pelo WhatsApp e serviço impecável' },
    { name: 'Patrícia Barbosa', date: '19 Agosto 2026', color: '#f4511e', text: 'Contratei a manutenção dos 6 aparelhos do escritório. Equipe pontual, organizada e não deixaram sujeira nenhuma. Já fechamos contrato mensal.' },
    { name: 'Marcos Vinícius', date: '8 Agosto 2026', color: '#252481', text: 'precisei do ponto elétrico e da instalação, fizeram tudo no mesmo dia. muito bom' },
    { name: 'Carla Menezes', date: '30 Julho 2026', color: '#00897b', text: 'A higienização fez muita diferença, acabou aquele cheiro ruim do ar do quarto das crianças. Super indico a QClima!' },
    { name: 'André Siqueira', date: '22 Julho 2026', color: '#8e24aa', text: 'Atendimento nota 10 desde o primeiro contato. Instalaram o split no meu apartamento em Olinda com acabamento caprichado' },
    { name: 'Fernanda Rocha', date: '14 Julho 2026', color: '#d81b60', text: 'Preço justo, cumpriram o prazo e ainda deram dicas pra economizar energia. Voltarei a chamar com certeza.' },
    { name: 'Ricardo Pessoa', date: '3 Julho 2026', color: '#3949ab', text: 'Tenho uma loja em Jaboatão e sempre chamo a QClima pra manutenção. Nunca deixaram na mão' }
  ];

  /* ---------- Galeria ---------- */
  var GALLERY = [
    { src: 'galeria-01.webp', w: 1000, h: 710, cat: 'empresarial', title: 'Medição de pressão na condensadora' },
    { src: 'galeria-02.webp', w: 1000, h: 667, cat: 'residencial', title: 'Split instalado em sala integrada' },
    { src: 'galeria-03.webp', w: 563, h: 1000, cat: 'empresarial', title: 'Circuito elétrico dedicado ao ar' },
    { src: 'galeria-04.webp', w: 1000, h: 827, cat: 'empresarial', title: 'Manutenção em condensadora de cobertura' },
    { src: 'galeria-05.webp', w: 667, h: 1000, cat: 'residencial', title: 'Recarga de gás com manifold' },
    { src: 'galeria-06.webp', w: 668, h: 1000, cat: 'empresarial', title: 'Condensadoras em suporte metálico' },
    { src: 'galeria-07.webp', w: 1000, h: 667, cat: 'residencial', title: 'Condensadora fixada na fachada' },
    { src: 'galeria-08.webp', w: 1000, h: 667, cat: 'empresarial', title: 'Teste de pressão após a recarga' },
    { src: 'galeria-09.webp', w: 1000, h: 667, cat: 'residencial', title: 'Ar-condicionado em sala de estar' },
    { src: 'galeria-10.webp', w: 563, h: 1000, cat: 'empresarial', title: 'Ligação do quadro de comando' },
    { src: 'galeria-11.webp', w: 667, h: 1000, cat: 'residencial', title: 'Ajuste de conexões na unidade externa' },
    { src: 'galeria-12.webp', w: 1000, h: 667, cat: 'empresarial', title: 'Manutenção em fachada de prédio' },
    { src: 'galeria-13.webp', w: 1000, h: 667, cat: 'residencial', title: 'Split instalado em apartamento' },
    { src: 'galeria-14.webp', w: 667, h: 1000, cat: 'residencial', title: 'Revisão elétrica da condensadora' },
    { src: 'galeria-15.webp', w: 668, h: 1000, cat: 'residencial', title: 'Instalação de tomada para o ar' },
    { src: 'galeria-16.webp', w: 658, h: 1000, cat: 'residencial', title: 'Verificação da carga de gás' },
    { src: 'galeria-17.webp', w: 1000, h: 667, cat: 'residencial', title: 'Condensadora instalada com suporte' },
    { src: 'galeria-18.webp', w: 1000, h: 667, cat: 'empresarial', title: 'Diagnóstico com manifold' },
    { src: 'galeria-19.webp', w: 667, h: 1000, cat: 'residencial', title: 'Split em home office' },
    { src: 'galeria-20.webp', w: 1000, h: 667, cat: 'residencial', title: 'Ambiente climatizado após instalação' },
    { src: 'galeria-21.webp', w: 1000, h: 724, cat: 'empresarial', title: 'Revisão completa da unidade externa' },
    { src: 'galeria-22.webp', w: 1000, h: 667, cat: 'residencial', title: 'Sala climatizada e sem ruído' },
    { src: 'galeria-23.webp', w: 667, h: 1000, cat: 'empresarial', title: 'Teste elétrico com multímetro' },
    { src: 'galeria-24.webp', w: 667, h: 1000, cat: 'empresarial', title: 'Aperto das conexões elétricas' }
  ];

  /* ---------- WhatsApp + conversão Google Ads ---------- */
  function waUrl(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg || 'Olá! Vim pelo site e gostaria de um orçamento.');
  }

  function trackConversion(label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_click', whatsapp_cta: label });
    var sendTo = body.dataset.conversion;
    if (sendTo && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: sendTo });
    }
  }

  function bindWhatsApp(root) {
    root.querySelectorAll('.js-wa').forEach(function (a) {
      if (a.dataset.bound) return;
      a.dataset.bound = '1';
      a.href = waUrl(a.dataset.msg);
      a.target = '_blank';
      a.rel = 'noopener';
      a.addEventListener('click', function () {
        try { sessionStorage.setItem('qclima_wa', '1'); } catch (e) {}
        trackConversion((a.textContent || '').trim().slice(0, 60));
      });
    });
  }
  bindWhatsApp(document);

  /* ---------- Carrossel de avaliações ---------- */
  function initials(name) {
    var p = name.split(' ');
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }

  var starsHtml = '<span class="stars" aria-label="5 de 5 estrelas">' +
    new Array(6).join('<svg><use href="#i-star"/></svg>') + '</span>';

  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var track = carousel.querySelector('.carousel__track');
    track.innerHTML = REVIEWS.map(function (r) {
      return '<article class="review">' +
        '<div class="review__head">' +
          '<span class="review__avatar" style="background:' + r.color + '">' + initials(r.name) + '</span>' +
          '<div class="review__who"><strong>' + r.name + '</strong><span>' + r.date + '</span></div>' +
          '<svg class="review__g" aria-label="Avaliação do Google"><use href="#i-google-g"/></svg>' +
        '</div>' + starsHtml +
        '<p class="review__text">' + r.text + '</p>' +
      '</article>';
    }).join('');

    var dots = document.createElement('div');
    dots.className = 'carousel__dots';
    carousel.appendChild(dots);

    var index = 0;
    var timer;

    function perView() {
      var w = window.innerWidth;
      return w <= 767 ? 1 : w <= 960 ? 2 : 3;
    }
    function maxIndex() { return Math.max(0, REVIEWS.length - perView()); }

    function render() {
      var card = track.children[0];
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      var step = card.getBoundingClientRect().width + gap;
      track.style.transform = 'translateX(' + (-index * step) + 'px)';
      Array.prototype.forEach.call(dots.children, function (d, i) {
        d.classList.toggle('is-active', i === index);
      });
    }
    function buildDots() {
      dots.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir para avaliação ' + (i + 1));
        b.addEventListener('click', (function (n) { return function () { go(n); }; })(i));
        dots.appendChild(b);
      }
    }
    function go(n) {
      var max = maxIndex();
      index = n > max ? 0 : n < 0 ? max : n;
      render();
      restart();
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 6000);
    }

    carousel.querySelector('.carousel__btn--prev').addEventListener('click', function () { go(index - 1); });
    carousel.querySelector('.carousel__btn--next').addEventListener('click', function () { go(index + 1); });
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', restart);

    // Swipe no celular
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    var lastPer = perView();
    window.addEventListener('resize', function () {
      if (perView() !== lastPer) { lastPer = perView(); buildDots(); index = Math.min(index, maxIndex()); }
      render();
    });

    buildDots();
    render();
    restart();
  }

  /* ---------- Galeria + filtros + lightbox ---------- */
  var gallery = document.getElementById('gallery');
  var items = [];
  if (gallery) {
    gallery.innerHTML = GALLERY.map(function (g, i) {
      var label = g.cat === 'residencial' ? 'Residencial' : 'Empresarial';
      return '<button type="button" class="gallery__item" data-cat="' + g.cat + '" data-i="' + i + '">' +
        '<img src="assets/img/' + g.src + '" alt="' + g.title + '" loading="lazy" width="' + g.w + '" height="' + g.h + '" />' +
        '<span class="gallery__cap"><small>' + label + '</small><strong>' + g.title + '</strong></span>' +
      '</button>';
    }).join('');
    items = Array.prototype.slice.call(gallery.children);

    document.querySelectorAll('.filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var f = btn.dataset.filter;
        items.forEach(function (it) {
          it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f);
        });
      });
    });

    var lb = document.getElementById('lightbox');
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var current = 0;

    function visible() { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); }
    function show(i) {
      var g = GALLERY[i];
      current = i;
      lbImg.src = 'assets/img/' + g.src;
      lbImg.alt = g.title;
      lbCap.textContent = g.title;
    }
    function step(d) {
      var v = visible();
      var pos = v.findIndex(function (it) { return +it.dataset.i === current; });
      var next = v[(pos + d + v.length) % v.length];
      show(+next.dataset.i);
    }
    function closeLb() { lb.hidden = true; body.style.overflow = ''; }

    gallery.addEventListener('click', function (e) {
      var it = e.target.closest('.gallery__item');
      if (!it) return;
      show(+it.dataset.i);
      lb.hidden = false;
      body.style.overflow = 'hidden';
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }


  /* ---------- Vídeos ----------
     Coloque os arquivos em assets/video/ com estes nomes (MP4, vertical 9:16).
     O poster aparece até o vídeo ser reproduzido. */
  var VIDEOS = [
    { src: 'assets/video/video-01.mp4', poster: 'assets/img/galeria-05.webp', title: 'Recarga de gás com manifold' },
    { src: 'assets/video/video-02.mp4', poster: 'assets/img/galeria-16.webp', title: 'Manutenção completa do split' },
    { src: 'assets/video/video-03.mp4', poster: 'assets/img/galeria-11.webp', title: 'Instalação da unidade externa' }
  ];

  var videoList = document.getElementById('video-list');
  if (videoList) {
    videoList.innerHTML = VIDEOS.map(function (v, i) {
      return '<div class="video">' +
        '<video id="video-' + (i + 1) + '" preload="none" playsinline poster="' + v.poster + '" src="' + v.src + '"></video>' +
        '<button type="button" class="video__play" aria-label="Assistir: ' + v.title + '">' +
          '<span><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg></span>' +
          '<strong class="video__cap">' + v.title + '</strong>' +
        '</button>' +
      '</div>';
    }).join('');

    videoList.querySelectorAll('.video').forEach(function (card) {
      var video = card.querySelector('video');
      var showSoon = function () {
        if (card.querySelector('.video__soon')) return;
        var tag = document.createElement('span');
        tag.className = 'video__soon';
        tag.textContent = 'Vídeo em breve';
        card.appendChild(tag);
      };
      video.addEventListener('error', showSoon);
      card.querySelector('.video__play').addEventListener('click', function () {
        videoList.querySelectorAll('video').forEach(function (other) {
          if (other !== video) other.pause();
        });
        video.controls = true;
        var played = video.play();
        if (played && played.then) {
          played.then(function () { card.classList.add('is-playing'); }).catch(showSoon);
        }
      });
      video.addEventListener('pause', function () {
        if (video.ended) { card.classList.remove('is-playing'); video.controls = false; }
      });
    });

    // Sem arquivo publicado, marca o card como "em breve" já no carregamento
    VIDEOS.forEach(function (v, i) {
      fetch(v.src, { method: 'HEAD' }).then(function (r) {
        if (!r.ok) videoList.children[i].querySelector('video').dispatchEvent(new Event('error'));
      }).catch(function () {});
    });
  }

  /* ---------- Pop-up após 30s ---------- */
  var popup = document.getElementById('popup');
  function seen(key) { try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; } }
  function mark(key) { try { sessionStorage.setItem(key, '1'); } catch (e) {} }

  if (popup) {
    var closePopup = function () {
      popup.hidden = true;
      body.style.overflow = '';
      mark('qclima_popup');
    };
    var openPopup = function () {
      if (seen('qclima_popup') || seen('qclima_wa')) return;
      var lbOpen = document.getElementById('lightbox');
      if (lbOpen && !lbOpen.hidden) { setTimeout(openPopup, 5000); return; }
      popup.hidden = false;
      body.style.overflow = 'hidden';
      mark('qclima_popup');
      popup.querySelector('.popup__card').focus({ preventScroll: true });
    };

    popup.querySelector('.popup__close').addEventListener('click', closePopup);
    popup.querySelector('.popup__dismiss').addEventListener('click', closePopup);
    popup.querySelector('.btn--wa').addEventListener('click', closePopup);
    popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !popup.hidden) closePopup(); });

    var delay = /[?&]popup=now\b/.test(location.search) ? 300 : POPUP_DELAY_MS;
    setTimeout(openPopup, delay);
  }

  /* ---------- Animação ao rolar ---------- */
  if ('IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.section__head, .service, .feature, .step, .about__media, .about__text, .faq__item, .reviews');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
