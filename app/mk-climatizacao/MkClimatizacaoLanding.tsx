'use client';

import { useEffect, useRef, useState } from 'react';
import { IconSprite } from './icon-sprite';
import './mk-landing.css';

// Plain <img> is used throughout instead of next/image: this route ships static
// assets straight from public/mk/ on Cloudflare Workers, and next/image's
// optimizer needs a loader wired up for that target that this project doesn't
// configure yet — plain <img> with loading="lazy" avoids depending on it.

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const WHATSAPP_NUMBER = '5585992158851';
const WHATSAPP_DISPLAY = '(85) 99215-8851';
const DEFAULT_MSG =
  'Olá! Vim pelo site da MK Climatização e gostaria de um orçamento.';

const MESSAGES: Record<string, string> = {
  servico_instalacao:
    'Olá! Gostaria de um orçamento para instalação de ar-condicionado.',
  servico_manutencao:
    'Olá! Gostaria de um orçamento para manutenção de ar-condicionado.',
  servico_recarga:
    'Olá! Gostaria de um orçamento para recarga de gás do meu ar-condicionado.',
  servico_pmoc: 'Olá! Gostaria de um orçamento de PMOC para minha empresa.',
  servico_eletrico:
    'Olá! Gostaria de um orçamento de projeto e ponto elétrico para ar-condicionado.',
  servico_higienizacao:
    'Olá! Gostaria de um orçamento para higienização de ar-condicionado.',
  brands_band:
    'Olá! Gostaria de saber se vocês atendem a marca do meu ar-condicionado.',
  popup: 'Olá! Vim pelo site da MK Climatização e quero meu orçamento grátis.',
};

function waLink(src: string) {
  const msg = MESSAGES[src] ?? DEFAULT_MSG;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function trackWaClick(src: string) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_click', click_source: src });
    // Hook de conversão do Google Ads: substituir pelo evento real assim que o
    // acompanhamento de conversões estiver configurado na conta de Ads, ex.:
    // gtag('event', 'conversion', {send_to: 'AW-XXXXXXXXX/XXXXXXXX'})
  } catch {
    /* dataLayer indisponível — segue a navegação normalmente */
  }
}

function WaLink({
  src,
  className,
  children,
}: {
  src: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={waLink(src)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWaClick(src)}
    >
      {children}
    </a>
  );
}

function WaIcon({ className = 'ic' }: { className?: string }) {
  return (
    <svg className={className}>
      <use href="#mk-ic-whatsapp" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i}>
          <use href="#mk-ic-star" />
        </svg>
      ))}
    </>
  );
}

function staggerStyle(i: number, step = 90): React.CSSProperties {
  return { '--reveal-delay': `${i * step}ms` } as React.CSSProperties;
}

const SERVICES = [
  {
    id: 'instalacao',
    src: 'servico_instalacao',
    title: 'Instalação de Ar-Condicionado',
    desc: 'Split, multi-split, cassete e piso-teto com vácuo na tubulação, teste de estanqueidade e acabamento caprichado — de 9.000 a 60.000 BTUs.',
    img: '/mk/service-instalacao.jpg',
    alt: 'Técnicos da MK Climatização instalando condensadoras',
  },
  {
    id: 'manutencao',
    src: 'servico_manutencao',
    title: 'Manutenção Preventiva e Corretiva',
    desc: 'Revisão de evaporadora e condensadora, limpeza de filtros, checagem elétrica e do dreno. Evita quebra e reduz o consumo de energia.',
    img: '/mk/service-manutencao.jpg',
    alt: 'Técnico fazendo manutenção em ar-condicionado',
  },
  {
    id: 'recarga',
    src: 'servico_recarga',
    title: 'Recarga de Gás',
    desc: 'Localização e correção do vazamento, vácuo na linha e carga de gás na medida certa indicada pelo fabricante.',
    img: '/mk/service-recarga-gas.jpg',
    alt: 'Manômetros usados na recarga de gás do ar-condicionado',
  },
  {
    id: 'pmoc',
    src: 'servico_pmoc',
    title: 'PMOC para Empresas',
    desc: 'Plano de Manutenção, Operação e Controle com responsável técnico, cronograma de visitas e relatórios prontos para fiscalização.',
    img: '/mk/service-pmoc.jpg',
    alt: 'Técnico inspecionando condensadoras em cobertura de empresa',
  },
  {
    id: 'eletrico',
    src: 'servico_eletrico',
    title: 'Projeto e Ponto Elétrico',
    desc: 'Circuito exclusivo, disjuntor e cabeamento dimensionados para o seu aparelho, com infraestrutura segura e dentro das normas.',
    img: '/mk/service-eletrico.jpg',
    alt: 'Técnico montando ponto elétrico para ar-condicionado',
  },
  {
    id: 'higienizacao',
    src: 'servico_higienizacao',
    title: 'Higienização de Ar-Condicionado',
    desc: 'Limpeza profunda da serpentina, turbina e bandeja com produtos bactericidas. Acaba com mau cheiro, fungos e ácaros.',
    img: '/mk/service-higienizacao.jpg',
    alt: 'Ar-condicionado split aberto para higienização',
  },
];

const BRANDS = [
  { name: 'Daikin', file: 'daikin.svg' },
  { name: 'Hitachi', file: 'hitachi.svg' },
  { name: 'Samsung', file: 'samsung.svg' },
  { name: 'LG', file: 'lg.svg' },
  { name: 'Springer', file: 'springer.png' },
  { name: 'Gree', file: 'gree.svg' },
  { name: 'Midea', file: 'midea.svg' },
  { name: 'TCL', file: 'tcl.svg' },
];

const WHY_US = [
  {
    icon: 'mk-ic-gauge',
    title: 'Atendimento rápido',
    desc: 'Orçamento pelo WhatsApp e agenda no mesmo dia sempre que possível.',
  },
  {
    icon: 'mk-ic-tools',
    title: 'Equipe especializada',
    desc: 'Técnicos treinados e equipados para cada tipo de serviço.',
  },
  {
    icon: 'mk-ic-building',
    title: 'Residencial e empresarial',
    desc: 'Do split do quarto ao PMOC completo da sua empresa.',
  },
  {
    icon: 'mk-ic-shield',
    title: 'Serviço com garantia',
    desc: 'Garantia na mão de obra, peças e carga de gás.',
  },
  {
    icon: 'mk-ic-map',
    title: 'Fortaleza e região',
    desc: 'Atendemos toda a capital, Eusébio, Aquiraz, Caucaia e Maracanaú.',
  },
  {
    icon: 'mk-ic-badge',
    title: 'Todas as marcas',
    desc: 'Daikin, Samsung, LG, Springer, Gree, Midea, Elgin e mais.',
  },
];

type GalleryCategory = 'residencial' | 'empresarial';
type GalleryFilter = 'todos' | GalleryCategory | 'videos';

const GALLERY_FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'residencial', label: 'Residencial' },
  { id: 'empresarial', label: 'Empresarial' },
  { id: 'videos', label: 'Vídeos' },
];

type GalleryItem = {
  kind: 'foto' | 'video';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  location: string;
};

const GALLERY: GalleryItem[] = [
  {
    kind: 'video',
    src: '/mk/video-02.mp4',
    poster: '/mk/video-02-poster.jpg',
    alt: 'Vista aérea de condensadoras em cobertura de prédio comercial',
    title: 'Central de condensadoras — manutenção PMOC',
    category: 'empresarial',
    location: 'Aldeota, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-01.jpg',
    alt: 'Condensadora instalada em fachada residencial',
    title: 'Instalação de condensadora com suporte reforçado',
    category: 'residencial',
    location: 'Meireles, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-02.jpg',
    alt: 'Quatro condensadoras alinhadas em parede de empresa',
    title: 'Climatização completa de galpão comercial',
    category: 'empresarial',
    location: 'Maracanaú, CE',
  },
  {
    kind: 'foto',
    src: '/mk/service-higienizacao.jpg',
    alt: 'Split inverter aberto para higienização',
    title: 'Higienização de split inverter',
    category: 'residencial',
    location: 'Cocó, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-03.jpg',
    alt: 'Várias condensadoras instaladas em prédio',
    title: 'Instalação de multi-split em condomínio',
    category: 'residencial',
    location: 'Papicu, Fortaleza',
  },
  {
    kind: 'video',
    src: '/mk/video-01.mp4',
    poster: '/mk/video-01-poster.jpg',
    alt: 'Cliente ajustando a temperatura do ar-condicionado recém-instalado',
    title: 'Entrega do serviço: ar gelando no primeiro dia',
    category: 'residencial',
    location: 'Eusébio, CE',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-04.jpg',
    alt: 'Condensadoras em fachada de tijolo',
    title: 'Troca de condensadoras e nova tubulação',
    category: 'empresarial',
    location: 'Centro, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-05.jpg',
    alt: 'Condensadoras LG instaladas no alto de um prédio',
    title: 'Instalação em altura com suporte e rapel',
    category: 'residencial',
    location: 'Fátima, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-06.jpg',
    alt: 'Fileira de condensadoras em cobertura',
    title: 'Sistema VRF em prédio corporativo',
    category: 'empresarial',
    location: 'Água Fria, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-07.jpg',
    alt: 'Técnico instalando fiação do ponto elétrico',
    title: 'Ponto elétrico exclusivo para o ar-condicionado',
    category: 'residencial',
    location: 'Messejana, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/service-recarga-gas.jpg',
    alt: 'Manômetros conectados para recarga de gás',
    title: 'Recarga de gás com teste de pressão',
    category: 'empresarial',
    location: 'Parangaba, Fortaleza',
  },
  {
    kind: 'foto',
    src: '/mk/gallery-08.jpg',
    alt: 'Fachada de prédio com vários aparelhos de ar-condicionado',
    title: 'Manutenção preventiva em prédio residencial',
    category: 'residencial',
    location: 'Benfica, Fortaleza',
  },
];

const TESTIMONIALS = [
  {
    initials: 'FA',
    color: '#e07a45',
    name: 'Francisca Alves',
    meta: '4 avaliações · há 1 semana',
    stars: 5,
    text: 'Instalaram 2 splits aqui em casa no Meireles, pessoal muito educado e deixaram tudo limpo depois',
  },
  {
    initials: 'RM',
    color: '#1c8f8f',
    name: 'Rafael Menezes',
    meta: 'Local Guide · 23 avaliações · há 3 semanas',
    stars: 5,
    text: 'Contratei o PMOC pra clínica e foi tranquilo, relatório saiu certinho e eles avisam antes de cada visita.',
  },
  {
    initials: 'JS',
    color: '#5b5fc7',
    name: 'Jéssica Sampaio',
    meta: '2 avaliações · há 1 mês',
    stars: 5,
    text: 'Meu ar tava pingando e fedendo, fizeram a higienização e ficou outro. Super recomendo',
  },
  {
    initials: 'AB',
    color: '#c7861c',
    name: 'Antônio Bezerra',
    meta: '1 avaliação · há 5 dias',
    stars: 5,
    text: 'Recarga de gás rápida, técnico chegou no horário e explicou o que era o vazamento',
  },
  {
    initials: 'LC',
    color: '#1c8f8f',
    name: 'Larissa Castro',
    meta: '7 avaliações · há 2 meses',
    stars: 5,
    text: 'Já chamei a MK umas 3 vezes, sempre pontuais e o preço que passam no WhatsApp é o que cobram no final.',
  },
  {
    initials: 'DO',
    color: '#e07a45',
    name: 'Diego Oliveira',
    meta: '3 avaliações · há 4 meses',
    stars: 4,
    text: 'Fizeram o ponto elétrico e a instalação no mesmo dia, bom serviço',
  },
  {
    initials: 'MP',
    color: '#5b5fc7',
    name: 'Mariana Pinheiro',
    meta: 'Local Guide · 41 avaliações · há 6 meses',
    stars: 5,
    text: 'Atendimento nota 10 desde o orçamento. Manutenção dos 4 aparelhos do escritório na Aldeota feita num sábado sem atrapalhar ninguém',
  },
  {
    initials: 'CH',
    color: '#c7861c',
    name: 'Carlos Henrique',
    meta: '5 avaliações · há 8 meses',
    stars: 5,
    text: 'Responderam rápido no zap e vieram no mesmo dia, ar voltou a gelar',
  },
];

const FAQS = [
  {
    q: 'Quanto tempo leva uma instalação?',
    a: 'Uma instalação residencial padrão leva de 2 a 4 horas, dependendo da distância entre a evaporadora e a condensadora. Serviços com várias máquinas têm prazo definido no orçamento.',
  },
  {
    q: 'Vocês atendem aos sábados?',
    a: 'Sim, atendemos de segunda a sábado, com horários flexíveis. Para urgências, chame no WhatsApp que verificamos a disponibilidade no mesmo dia.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'Você manda fotos ou descreve o serviço pelo WhatsApp e já passamos o valor. Quando precisa, fazemos uma visita técnica sem compromisso.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Toda Fortaleza e região metropolitana: Eusébio, Aquiraz, Caucaia, Maracanaú e cidades próximas.',
  },
  {
    q: 'O que é PMOC e minha empresa precisa?',
    a: 'É o Plano de Manutenção, Operação e Controle, exigido pela Lei 13.589/2018 para ambientes climatizados de uso coletivo. Elaboramos e executamos o plano completo, com relatórios para fiscalização.',
  },
  {
    q: 'O serviço tem garantia?',
    a: 'Sim, todo serviço executado pela MK sai com garantia. Peças e equipamentos seguem também a garantia do fabricante.',
  },
];

function GalleryVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Só baixa e toca o vídeo quando o card entra na tela, para não pesar o
  // carregamento inicial da página (importante para o Índice de Qualidade do Ads).
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (typeof IntersectionObserver === 'undefined') {
      video.preload = 'metadata';
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'auto';
          video.play().catch(() => {
            /* autoplay bloqueado — o usuário pode clicar para ver */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}

export default function MkClimatizacaoLanding({
  fontVariable,
}: {
  fontVariable: string;
}) {
  const testiTrack = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('todos');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let closed = false;
    try {
      closed = sessionStorage.getItem('mkPromoClosed') === '1';
    } catch {
      /* sessionStorage indisponível */
    }
    if (closed) return;
    const timer = setTimeout(() => setPopupOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.mk-page .reveal');
    if (!els.length) return;
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function closePopup() {
    setPopupOpen(false);
    try {
      sessionStorage.setItem('mkPromoClosed', '1');
    } catch {
      /* sessionStorage indisponível */
    }
  }

  useEffect(() => {
    if (!popupOpen && !lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (lightbox) setLightbox(null);
      else closePopup();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [popupOpen, lightbox]);

  function scrollTesti(dir: 1 | -1) {
    const track = testiTrack.current;
    if (!track) return;
    const card = track.querySelector('.testi-card');
    const amount = card
      ? (card.getBoundingClientRect().width + 18) * dir
      : 300 * dir;
    const atEnd =
      dir === 1 &&
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = dir === -1 && track.scrollLeft <= 4;
    if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (atStart)
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  // Carrossel de depoimentos avança sozinho; pausa enquanto o usuário
  // interage (mouse em cima ou toque) para não "roubar" a leitura.
  useEffect(() => {
    const track = testiTrack.current;
    if (!track) return;
    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume);
    const timer = setInterval(() => {
      if (!paused && document.visibilityState === 'visible') scrollTesti(1);
    }, 5000);
    return () => {
      clearInterval(timer);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <div className={`mk-page ${fontVariable}`}>
      <IconSprite />

      {/* ===================== HEADER ===================== */}
      <header className="site-header">
        <div className="container">
          <a
            className="brand"
            href="#top"
            aria-label="MK Climatização — início"
          >
            {/* oxlint-disable-next-line next/no-img-element */}
            <img
              className="logo-mark"
              src="/mk/logo.svg"
              alt="MK Climatização"
            />
            <span className="brand-name">
              MK Climatização
              <small>AR-CONDICIONADO · FORTALEZA</small>
            </span>
          </a>
          <nav className="header-nav" aria-label="Seções">
            <a href="#servicos">Serviços</a>
            <a href="#galeria">Galeria</a>
            <a href="#depoimentos">Avaliações</a>
            <a href="#faq">Dúvidas</a>
          </nav>
          <div className="header-actions">
            <WaLink src="header" className="btn btn-wa">
              <WaIcon />
              <span className="hide-xs">Orçamento no</span> WhatsApp
            </WaLink>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy">
              <span className="eyebrow">
                <svg className="ic">
                  <use href="#mk-ic-snow" />
                </svg>
                Residencial e empresarial
              </span>
              <h1>
                Ar-condicionado gelando de verdade em <em>Fortaleza</em>
              </h1>
              <p className="hero-lede">
                Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e
                higienização com técnicos especializados. Chame no WhatsApp e
                receba seu orçamento ainda hoje.
              </p>
              <div className="hero-actions">
                <WaLink src="hero_principal" className="btn btn-wa btn-lg">
                  <WaIcon />
                  Pedir orçamento no WhatsApp
                </WaLink>
              </div>
              <ul className="hero-bullets">
                <li>
                  <svg>
                    <use href="#mk-ic-check-circle" />
                  </svg>
                  Atendimento no mesmo dia
                </li>
                <li>
                  <svg>
                    <use href="#mk-ic-check-circle" />
                  </svg>
                  Técnicos especializados
                </li>
                <li>
                  <svg>
                    <use href="#mk-ic-check-circle" />
                  </svg>
                  Serviço com garantia
                </li>
              </ul>
              <a className="rating-chip" href="#depoimentos">
                <svg className="g">
                  <use href="#mk-ic-google" />
                </svg>
                <span className="stars">
                  <Stars />
                </span>
                <b>4.9</b>
                <span>no Google</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===================== TRUST STRIP ===================== */}
        <div className="trust-strip">
          <div className="container">
            <div className="trust-item reveal" style={staggerStyle(0)}>
              <svg>
                <use href="#mk-ic-clock" />
              </svg>
              <div>
                <b>Resposta rápida</b>
                <span>Orçamento pelo WhatsApp</span>
              </div>
            </div>
            <div className="trust-item reveal" style={staggerStyle(1)}>
              <svg>
                <use href="#mk-ic-shield" />
              </svg>
              <div>
                <b>Garantia</b>
                <span>Em todos os serviços</span>
              </div>
            </div>
            <div className="trust-item reveal" style={staggerStyle(2)}>
              <svg>
                <use href="#mk-ic-building" />
              </svg>
              <div>
                <b>Casa e empresa</b>
                <span>Residencial e comercial</span>
              </div>
            </div>
            <div className="trust-item reveal" style={staggerStyle(3)}>
              <svg>
                <use href="#mk-ic-map" />
              </svg>
              <div>
                <b>Fortaleza e RMF</b>
                <span>Atendimento em toda a região</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== SERVICES ===================== */}
        <section id="servicos">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Nossos serviços</span>
              <h2>
                Tudo para o seu <em>ar-condicionado</em> em um só lugar
              </h2>
              <p>
                Da instalação ao PMOC da sua empresa — a MK cuida de cada etapa,
                com equipe própria e material de qualidade.
              </p>
            </div>
            <div className="services-grid">
              {SERVICES.map((svc, i) => (
                <article
                  className="svc-card reveal"
                  key={svc.id}
                  style={staggerStyle(i, 70)}
                >
                  <div className="svc-photo">
                    {/* oxlint-disable-next-line next/no-img-element */}
                    <img src={svc.img} alt={svc.alt} loading="lazy" />
                  </div>
                  <div className="svc-body">
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                    <WaLink src={svc.src} className="btn btn-wa svc-btn">
                      <WaIcon />
                      Solicitar orçamento
                    </WaLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section id="depoimentos" className="testimonials">
          <div className="container">
            <div className="testi-head reveal">
              <div className="section-head">
                <span className="eyebrow">Avaliações</span>
                <h2>O que nossos clientes dizem sobre a MK</h2>
              </div>
              <div className="testi-head-right">
                <div className="rating-card">
                  <div className="word">EXCELENTE</div>
                  <div className="stars">
                    <Stars />
                  </div>
                  <div className="score">
                    <b>4.9</b> · Com base em 138 avaliações
                  </div>
                  <div className="google">
                    <svg>
                      <use href="#mk-ic-google" />
                    </svg>
                    <span>Google</span>
                  </div>
                </div>
                <div className="testi-nav">
                  <button
                    className="nav-btn"
                    aria-label="Avaliação anterior"
                    onClick={() => scrollTesti(-1)}
                  >
                    <svg>
                      <use href="#mk-ic-chevron-left" />
                    </svg>
                  </button>
                  <button
                    className="nav-btn"
                    aria-label="Próxima avaliação"
                    onClick={() => scrollTesti(1)}
                  >
                    <svg>
                      <use href="#mk-ic-chevron-right" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="testi-track reveal" ref={testiTrack}>
              {TESTIMONIALS.map((t) => (
                <article className="testi-card" key={t.name}>
                  <svg className="testi-google">
                    <use href="#mk-ic-google" />
                  </svg>
                  <div className="testi-top">
                    <div className="avatar" style={{ background: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-meta">{t.meta}</div>
                    </div>
                  </div>
                  <div className="testi-stars">
                    <Stars count={t.stars} />
                  </div>
                  <p className="testi-text">{t.text}</p>
                </article>
              ))}
            </div>
            <div className="mini-cta center">
              <p>Quer ser o próximo cliente satisfeito?</p>
              <WaLink src="depoimentos" className="btn btn-wa">
                <WaIcon />
                Falar no WhatsApp
              </WaLink>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT US ===================== */}
        <section className="about-us">
          <div className="container">
            <div className="about-photo reveal">
              {/* oxlint-disable-next-line next/no-img-element */}
              <img
                src="/mk/about-us.jpg"
                alt="Técnico da MK Climatização com cinto de ferramentas, pronto para atender em Fortaleza"
                loading="lazy"
              />
              <div className="about-badge">
                {/* oxlint-disable-next-line next/no-img-element */}
                <img src="/mk/logo.svg" alt="" />
                <div>
                  <b>MK Climatização</b>
                  <span>Fortaleza · CE</span>
                </div>
              </div>
            </div>
            <div className="about-copy reveal" style={staggerStyle(1, 120)}>
              <span className="eyebrow">Quem somos</span>
              <h2>
                Uma equipe de Fortaleza pronta para cuidar do seu conforto
              </h2>
              <p>
                A MK Climatização atende famílias e empresas de Fortaleza que
                querem resolver o ar-condicionado de uma vez — com pontualidade,
                preço justo e sem sumiço depois do serviço.
              </p>
              <p>
                Seguimos as orientações de cada fabricante em toda instalação,
                manutenção ou recarga de gás. Do primeiro contato no WhatsApp
                até a garantia, cuidamos de tudo para você.
              </p>
              <ul className="about-stats">
                <li>
                  <svg>
                    <use href="#mk-ic-badge" />
                  </svg>
                  Técnicos especializados
                </li>
                <li>
                  <svg>
                    <use href="#mk-ic-tools" />
                  </svg>
                  Equipamentos próprios
                </li>
                <li>
                  <svg>
                    <use href="#mk-ic-building" />
                  </svg>
                  Residencial e empresarial
                </li>
              </ul>
              <div className="mini-cta">
                <p>Quer saber como podemos ajudar?</p>
                <WaLink src="about_us" className="btn btn-wa">
                  <WaIcon />
                  Falar no WhatsApp
                </WaLink>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== GALLERY ===================== */}
        <section id="galeria" className="gallery">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Trabalhos realizados</span>
              <h2>
                Veja alguns <em>serviços da MK</em>
              </h2>
              <p>
                Fotos e vídeos de instalações, manutenções e PMOC feitos pela
                nossa equipe em Fortaleza e região.
              </p>
            </div>
            <div className="gallery-filters reveal">
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`gallery-filter-btn${galleryFilter === f.id ? ' active' : ''}`}
                  onClick={() => setGalleryFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="gallery-grid">
              {GALLERY.map((item, i) => {
                const visible =
                  galleryFilter === 'todos' ||
                  (galleryFilter === 'videos'
                    ? item.kind === 'video'
                    : item.category === galleryFilter);
                return (
                  <figure
                    className={`gallery-card reveal${item.kind === 'video' ? ' is-video' : ''}${visible ? '' : ' gallery-card-hidden'}`}
                    key={item.src}
                    style={staggerStyle(i % 3, 80)}
                  >
                    <button
                      type="button"
                      className="gallery-card-photo"
                      onClick={() => setLightbox(item)}
                      aria-label={`Ampliar: ${item.title}`}
                    >
                      {item.kind === 'video' ? (
                        <GalleryVideo
                          src={item.src}
                          poster={item.poster}
                          label={item.alt}
                        />
                      ) : (
                        /* oxlint-disable-next-line next/no-img-element */
                        <img src={item.src} alt={item.alt} loading="lazy" />
                      )}
                      <span className="gallery-badge">
                        {item.category === 'residencial'
                          ? 'Residencial'
                          : 'Empresarial'}
                      </span>
                      {item.kind === 'video' && (
                        <span className="gallery-play" aria-hidden="true">
                          <svg>
                            <use href="#mk-ic-play" />
                          </svg>
                        </span>
                      )}
                    </button>
                    <figcaption className="gallery-card-body">
                      <h3>{item.title}</h3>
                      <span className="gallery-card-loc">
                        <svg>
                          <use href="#mk-ic-map" />
                        </svg>
                        {item.location}
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <div className="mini-cta center">
              <p>Gostou do que viu? Peça seu orçamento agora.</p>
              <WaLink src="galeria" className="btn btn-wa">
                <WaIcon />
                Chamar no WhatsApp
              </WaLink>
            </div>
          </div>
        </section>

        {/* ===================== WHY US ===================== */}
        <section className="why-us">
          <div className="container">
            <div className="why-copy reveal">
              <span className="eyebrow">Por que a MK Climatização</span>
              <h2>Combinado é combinado — no preço e no prazo</h2>
              <p>
                Atendimento direto, sem intermediário: quem orça é quem executa.
                Você sabe exatamente o que vai ser feito e quanto vai pagar
                antes de começarmos.
              </p>
              <div className="why-photo">
                {/* oxlint-disable-next-line next/no-img-element */}
                <img
                  src="/mk/why-us.jpg"
                  alt="Técnico da MK Climatização fazendo manutenção em equipamento"
                  loading="lazy"
                />
              </div>
            </div>
            <ul className="why-list">
              {WHY_US.map((item, i) => (
                <li
                  className="why-item reveal"
                  key={item.title}
                  style={staggerStyle(i, 70)}
                >
                  <span className="why-ic">
                    <svg>
                      <use href={`#${item.icon}`} />
                    </svg>
                  </span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
              <li className="why-cta reveal" style={staggerStyle(6, 70)}>
                <WaLink src="why_us" className="btn btn-wa btn-block">
                  <WaIcon />
                  Quero atendimento da MK
                </WaLink>
              </li>
            </ul>
          </div>
        </section>

        {/* ===================== BRANDS BAND ===================== */}
        <section className="brands-band">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Marcas atendidas</span>
              <h2>Trabalhamos com todas as marcas</h2>
              <p>
                Instalação e assistência para os principais fabricantes do
                mercado.
              </p>
            </div>
          </div>
          <div className="brand-marquee">
            <div className="brand-marquee-track">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <span
                  className="brand-chip"
                  key={`${brand.file}-${i}`}
                  aria-hidden={i >= BRANDS.length}
                >
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img
                    src={`/mk/brands/${brand.file}`}
                    alt={brand.name}
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="mini-cta center">
              <p>Não achou a sua marca? Pergunte pra gente.</p>
              <WaLink src="brands_band" className="btn btn-wa">
                <WaIcon />
                Perguntar no WhatsApp
              </WaLink>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Dúvidas frequentes</span>
              <h2>Perguntas antes de chamar</h2>
            </div>
            <div className="faq-layout reveal">
              <div className="faq-questions">
                {FAQS.map((item, i) => (
                  <button
                    className="faq-q"
                    type="button"
                    key={item.q}
                    aria-expanded={i === faqIndex}
                    onClick={() => setFaqIndex(i)}
                  >
                    {item.q}
                    <span className="plus">
                      <svg>
                        <use href="#mk-ic-plus" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
              <section className="faq-panel" aria-live="polite">
                <span className="eyebrow">Resposta</span>
                <div className="faq-answer-q">{FAQS[faqIndex].q}</div>
                <p className="faq-answer">{FAQS[faqIndex].a}</p>
              </section>
            </div>
            <div className="mini-cta center">
              <p>Ainda com dúvidas? Fale direto com a gente.</p>
              <WaLink src="faq_mini" className="btn btn-wa">
                <WaIcon />
                Falar no WhatsApp
              </WaLink>
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="final-cta">
          <div className="container reveal">
            {/* oxlint-disable-next-line next/no-img-element */}
            <img
              className="final-logo"
              src="/mk/logo.svg"
              alt="MK Climatização"
            />
            <h2>Calor em Fortaleza não espera. Chame a MK agora</h2>
            <p>
              Instalação, manutenção, recarga de gás, PMOC, elétrica ou
              higienização — orçamento rápido e sem compromisso pelo WhatsApp.
            </p>
            <WaLink src="cta_final" className="btn btn-wa btn-lg">
              <WaIcon />
              Chamar no WhatsApp agora
            </WaLink>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                {/* oxlint-disable-next-line next/no-img-element */}
                <img
                  className="logo-mark"
                  src="/mk/logo.svg"
                  alt="MK Climatização"
                />
                <b>MK Climatização</b>
              </div>
              <p className="tag">
                Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e
                higienização de ar-condicionado — residencial e empresarial em
                Fortaleza.
              </p>
            </div>
            <div className="footer-col">
              <h5>Contato</h5>
              <WaLink src="footer" className="wa-line">
                <svg>
                  <use href="#mk-ic-whatsapp-color" />
                </svg>
                {WHATSAPP_DISPLAY}
              </WaLink>
              <ul>
                <li>
                  <a href="#servicos">Serviços</a>
                </li>
                <li>
                  <a href="#galeria">Galeria</a>
                </li>
                <li>
                  <a href="#depoimentos">Avaliações</a>
                </li>
                <li>
                  <a href="#faq">Dúvidas frequentes</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Área de atendimento</h5>
              <ul>
                <li>Aldeota, Meireles e Cocó</li>
                <li>Papicu, Fátima e Benfica</li>
                <li>Messejana e Parangaba</li>
                <li>Eusébio e Aquiraz</li>
                <li>Caucaia e Maracanaú</li>
                <li>Região Metropolitana</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 MK Climatização. Todos os direitos reservados.</span>
            <span>
              Instalação · Manutenção · Recarga de gás · PMOC · Elétrico ·
              Higienização
            </span>
          </div>
        </div>
      </footer>

      {/* ===================== FLOATING WHATSAPP ===================== */}
      <WaLink
        src="botao_flutuante"
        className={`wa-float${pastHero ? '' : ' wa-float-hidden'}`}
      >
        <svg aria-label="Falar no WhatsApp">
          <use href="#mk-ic-whatsapp" />
        </svg>
      </WaLink>

      {/* ===================== LIGHTBOX ===================== */}
      {lightbox && (
        // oxlint-disable-next-line jsx-a11y/click-events-have-key-events jsx-a11y/no-static-element-interactions
        <div
          className="lightbox"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
          <div
            className="lightbox-inner"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
            <button
              className="popup-close"
              aria-label="Fechar"
              onClick={() => setLightbox(null)}
            >
              <svg>
                <use href="#mk-ic-close" />
              </svg>
            </button>
            {lightbox.kind === 'video' ? (
              <video
                src={lightbox.src}
                poster={lightbox.poster}
                controls
                autoPlay
                playsInline
                muted
                loop
              />
            ) : (
              /* oxlint-disable-next-line next/no-img-element */
              <img src={lightbox.src} alt={lightbox.alt} />
            )}
            <div className="lightbox-caption">
              <div>
                <b>{lightbox.title}</b>
                <span>{lightbox.location}</span>
              </div>
              <WaLink src="galeria_lightbox" className="btn btn-wa">
                <WaIcon />
                Quero um serviço assim
              </WaLink>
            </div>
          </div>
        </div>
      )}

      {/* ===================== POPUP ===================== */}
      {/* Click-outside-to-dismiss is a mouse convenience on top of full keyboard support: Escape
          closes the popup (see the effect above) and the close/dismiss buttons are focusable. */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events jsx-a11y/no-static-element-interactions */}
      <div
        className={`popup-backdrop${popupOpen ? ' open' : ''}`}
        onClick={(e) => e.target === e.currentTarget && closePopup()}
      >
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- native <dialog> would need
            showModal()/close() wiring instead of the CSS-class open/close used here */}
        <div
          className="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mk-popup-title"
        >
          {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
          <div className="popup-photo">
            {/* oxlint-disable-next-line next/no-img-element */}
            <img src="/mk/popup.jpg" alt="Ar-condicionado split instalado" />
            <button
              className="popup-close"
              aria-label="Fechar"
              onClick={closePopup}
            >
              <svg>
                <use href="#mk-ic-close" />
              </svg>
            </button>
          </div>
          <div className="popup-offer">
            <span className="badge">SEU AR ESTÁ GELANDO POUCO?</span>
            <div className="big" id="mk-popup-title">
              Orçamento grátis
            </div>
            <p className="desc">
              para instalação, manutenção e higienização de ar-condicionado em
              Fortaleza
            </p>
          </div>
          <div className="popup-body">
            <ul className="popup-list">
              <li>
                <svg>
                  <use href="#mk-ic-check" />
                </svg>
                Resposta rápida pelo WhatsApp
              </li>
              <li>
                <svg>
                  <use href="#mk-ic-check" />
                </svg>
                Atendimento no mesmo dia, conforme agenda
              </li>
              <li>
                <svg>
                  <use href="#mk-ic-check" />
                </svg>
                Todos os serviços com garantia
              </li>
            </ul>
            <WaLink src="popup" className="btn btn-wa btn-block">
              <WaIcon />
              Quero meu orçamento
            </WaLink>
            <button
              className="popup-dismiss"
              type="button"
              onClick={closePopup}
            >
              Agora não, obrigado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
