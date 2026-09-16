'use client';

import { useEffect, useRef, useState } from 'react';
import { IconSprite } from './icon-sprite';
import { RkmLogo } from './rkm-logo';
import './rkm-landing.css';

// Plain <img> is used throughout instead of next/image: this route ships static
// assets straight from public/rkm/ on Cloudflare Workers, and next/image's
// optimizer needs a loader wired up for that target that this project doesn't
// configure yet — plain <img> with loading="lazy" avoids depending on it.

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const WHATSAPP_NUMBER = '5521974365259';
const WHATSAPP_DISPLAY = '(21) 97436-5259';
const DEFAULT_MSG =
  'Olá! Vim pelo site da RKM Climatização e gostaria de um orçamento.';

const MESSAGES: Record<string, string> = {
  header: DEFAULT_MSG,
  hero_principal: DEFAULT_MSG,
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
  cta_final: DEFAULT_MSG,
  footer: DEFAULT_MSG,
  botao_flutuante: DEFAULT_MSG,
  popup:
    'Olá! Vim pelo site da RKM Climatização e quero aproveitar os 10% de desconto.',
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

function Stars({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i}>
          <use href="#rkm-ic-star" />
        </svg>
      ))}
    </>
  );
}

const SERVICES = [
  {
    id: 'instalacao',
    src: 'servico_instalacao',
    title: 'Instalação de Ar-Condicionado',
    desc: 'Split, multi-split e piso-teto com teste de vácuo, verificação de carga e isolamento térmico da tubulação — de 9.000 a 60.000 BTUs.',
    img: '/rkm/service-instalacao.jpg',
    alt: 'Técnico instalando ar-condicionado split',
  },
  {
    id: 'manutencao',
    src: 'servico_manutencao',
    title: 'Manutenção Preventiva e Corretiva',
    desc: 'Revisão de evaporadora e condensadora, limpeza de filtros e serpentina, checagem elétrica e do dreno — evita quebra e mantém o consumo baixo.',
    img: '/rkm/service-manutencao.jpg',
    alt: 'Técnico realizando manutenção em ar-condicionado',
  },
  {
    id: 'recarga',
    src: 'servico_recarga',
    title: 'Recarga de Gás Refrigerante',
    desc: 'Identificação de vazamento, vácuo na linha e recarga com gás na quantidade exata indicada pela placa do fabricante.',
    img: '/rkm/service-recarga-gas.jpg',
    alt: 'Técnico fazendo recarga de gás em condensadora',
  },
  {
    id: 'pmoc',
    src: 'servico_pmoc',
    title: 'PMOC para Empresas',
    desc: 'Plano de Manutenção, Operação e Controle completo, com cronograma de visitas e laudos prontos para fiscalização.',
    img: '/rkm/service-pmoc.jpg',
    alt: 'Cassetes de ar-condicionado em ambiente empresarial',
  },
  {
    id: 'eletrico',
    src: 'servico_eletrico',
    title: 'Projeto e Ponto Elétrico',
    desc: 'Dimensionamento de disjuntor e cabeamento exclusivo para o ar-condicionado, com infraestrutura dentro das normas.',
    img: '/rkm/service-eletrico.jpg',
    alt: 'Técnico instalando ponto elétrico para ar-condicionado',
  },
  {
    id: 'higienizacao',
    src: 'servico_higienizacao',
    title: 'Higienização de Ar-Condicionado',
    desc: 'Limpeza profunda da serpentina e da bandeja de dreno, com remoção de fungos e bactérias — ar mais saudável, sem cheiro.',
    img: '/rkm/service-higienizacao.jpg',
    alt: 'Técnico higienizando evaporadora de ar-condicionado',
  },
];

const WHY_US = [
  {
    icon: 'rkm-ic-gauge',
    title: 'Atendimento rápido',
    desc: 'Resposta ágil no WhatsApp, residencial ou empresarial.',
  },
  {
    icon: 'rkm-ic-tools',
    title: 'Equipe especializada',
    desc: 'Técnicos capacitados e equipados para cada tipo de serviço.',
  },
  {
    icon: 'rkm-ic-building',
    title: 'Residencial e empresarial',
    desc: 'De um split de quarto ao PMOC de uma rede de lojas.',
  },
  {
    icon: 'rkm-ic-shield',
    title: 'Peças e gás originais',
    desc: 'Garantia em mão de obra, peças e carga de gás.',
  },
  {
    icon: 'rkm-ic-map',
    title: 'Rio de Janeiro e região',
    desc: 'Atendimento ágil em toda a cidade e região metropolitana.',
  },
  {
    icon: 'rkm-ic-badge',
    title: 'Todas as marcas',
    desc: 'Daikin, Hitachi, Samsung, LG, Springer, Gree e mais.',
  },
];

const GALLERY = [
  {
    img: '/rkm/gallery-01.jpg',
    alt: 'Instalação residencial de ar-condicionado',
    cap: 'Instalação residencial — split inverter',
    big: true,
  },
  {
    img: '/rkm/gallery-02.jpg',
    alt: 'Manutenção de condensadora',
    cap: 'Manutenção preventiva em condensadora',
  },
  {
    img: '/rkm/gallery-03.jpg',
    alt: 'Cassete de teto em ambiente comercial',
    cap: 'Cassete de teto em sala comercial',
  },
  {
    img: '/rkm/gallery-04.jpg',
    alt: 'Recarga de gás com teste de vácuo',
    cap: 'Recarga de gás e teste de vácuo',
  },
  {
    img: '/rkm/gallery-05.jpg',
    alt: 'PMOC em ambiente empresarial',
    cap: 'PMOC — laudo técnico para empresa',
  },
  {
    img: '/rkm/gallery-06.jpg',
    alt: 'Higienização de evaporadora',
    cap: 'Higienização completa da evaporadora',
  },
];

const TESTIMONIALS = [
  {
    initials: 'BC',
    color: '#e07a45',
    name: 'Bruno Carvalho',
    meta: '3 avaliações · há 2 semanas',
    stars: 5,
    text: 'Instalaram o ar da sala em menos de 3 horas, equipe super educada e explicou tudo direitinho',
  },
  {
    initials: 'RA',
    color: '#1c8f8f',
    name: 'Renata Azevedo',
    meta: '5 avaliações · há 1 mês',
    stars: 5,
    text: 'Fiz o PMOC pra loja no Centro, vieram no prazo e o laudo saiu certinho. Recomendo.',
  },
  {
    initials: 'TN',
    color: '#5b5fc7',
    name: 'Thiago Nascimento',
    meta: '2 avaliações · há 3 semanas',
    stars: 5,
    text: 'Recarga de gás rápida, técnico chegou no horário combinado',
  },
  {
    initials: 'CD',
    color: '#c7861c',
    name: 'Camila Duarte',
    meta: '1 avaliação · há 6 dias',
    stars: 5,
    text: 'Higienização deixou o ar muito mais gelado, nem lembrava que fazia tanta diferença',
  },
  {
    initials: 'MR',
    color: '#1c8f8f',
    name: 'Marcelo Ribeiro',
    meta: '8 avaliações · há 4 meses',
    stars: 5,
    text: 'Já é a segunda vez que chamo, sempre pontuais e o preço combinado não muda depois.',
  },
  {
    initials: 'AF',
    color: '#e07a45',
    name: 'Aline Ferreira',
    meta: '1 avaliação · há 2 meses',
    stars: 4,
    text: 'Atendimento rápido pelo WhatsApp, no mesmo dia já tinha o orçamento',
  },
  {
    initials: 'RS',
    color: '#5b5fc7',
    name: 'Rodrigo Salgado',
    meta: '6 avaliações · há 9 meses',
    stars: 5,
    text: 'Instalação do split lá em Copacabana, capricharam no acabamento e limparam tudo depois',
  },
];

const PARTNERS: { name: string; file: string; onDark?: boolean }[] = [
  { name: 'Riachuelo', file: 'riachuelo.png' },
  { name: 'Casas Bahia', file: 'casas-bahia.png' },
  { name: 'Ponto Frio', file: 'ponto-frio.png' },
  { name: 'Mr Cheney', file: 'mr-cheney.png' },
  { name: 'Drogaria Pacheco', file: 'drogaria-pacheco.png' },
  { name: 'Drogaria São Paulo', file: 'drogaria-sao-paulo.png' },
  { name: 'HNT', file: 'hnt.png' },
  { name: 'KFC', file: 'kfc.svg' },
  { name: 'Natura', file: 'natura.png' },
  { name: 'O Boticário', file: 'o-boticario.png' },
  { name: 'Patroni', file: 'patroni.svg' },
  { name: 'Griletto', file: 'griletto.svg', onDark: true },
  { name: 'Bacio di Latte', file: 'bacio-di-latte.svg' },
  { name: 'Batata Inglesa', file: 'batata-inglesa.png' },
  { name: 'Restaurante Viena', file: 'viena.png' },
  { name: 'Banco Itaú', file: 'itau.png' },
];

const FAQS = [
  {
    q: 'Quanto tempo leva uma instalação?',
    a: 'Uma instalação residencial padrão leva entre 2 e 4 horas, dependendo da distância entre a unidade interna e a externa. Serviços comerciais com várias máquinas têm prazo definido no orçamento.',
  },
  {
    q: 'Vocês atendem aos sábados?',
    a: 'Sim, atendemos de segunda a sábado, com horários flexíveis. Para urgências, chame no WhatsApp que verificamos a disponibilidade no mesmo dia.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'Fazemos uma visita técnica ou avaliamos pelas fotos enviadas no WhatsApp para chegar ao valor exato do serviço, sem compromisso.',
  },
  {
    q: 'Quais marcas vocês instalam e atendem?',
    a: 'Trabalhamos com todas as marcas do mercado — Daikin, Hitachi, Samsung, LG, Springer, Gree, Midea e TCL — de 9.000 a 60.000 BTUs.',
  },
  {
    q: 'O que é PMOC e minha empresa precisa?',
    a: 'É o Plano de Manutenção, Operação e Controle, documento exigido para ambientes comerciais com ar-condicionado central ou múltiplos aparelhos. Elaboramos e executamos o plano completo, com laudos para fiscalização.',
  },
  {
    q: 'O serviço tem garantia?',
    a: 'Sim, todo serviço executado sai com garantia. Peças e gás seguem a garantia do fabricante.',
  },
];

export default function RkmClimatizacaoLanding({
  fontVariable,
}: {
  fontVariable: string;
}) {
  const testiTrack = useRef<HTMLDivElement>(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let closed = false;
    try {
      closed = sessionStorage.getItem('rkmPromoClosed') === '1';
    } catch {
      /* sessionStorage indisponível */
    }
    if (closed) return;
    const timer = setTimeout(() => setPopupOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  function closePopup() {
    setPopupOpen(false);
    try {
      sessionStorage.setItem('rkmPromoClosed', '1');
    } catch {
      /* sessionStorage indisponível */
    }
  }

  useEffect(() => {
    if (!popupOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closePopup();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [popupOpen]);

  function scrollTesti(dir: 1 | -1) {
    const track = testiTrack.current;
    if (!track) return;
    const card = track.querySelector('.testi-card');
    const amount = card
      ? (card.getBoundingClientRect().width + 18) * dir
      : 300 * dir;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <div className={`rkm-page ${fontVariable}`}>
      <IconSprite />

      {/* ===================== HEADER ===================== */}
      <header className="site-header">
        <div className="container">
          <a
            className="brand"
            href="#top"
            aria-label="RKM Climatização — início"
          >
            <RkmLogo className="logo-mark" id="header" />
            <span className="brand-name">
              RKM Climatização
              <small>AR-CONDICIONADO · RIO DE JANEIRO</small>
            </span>
          </a>
          <div className="header-actions">
            <WaLink src="header" className="btn btn-wa">
              <svg className="ic">
                <use href="#rkm-ic-whatsapp" />
              </svg>
              WhatsApp
            </WaLink>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="hero">
          <div className="container">
            <div className="hero-copy">
              <span className="eyebrow">
                Climatização residencial e empresarial
              </span>
              <h1>
                Climatização completa para sua casa ou empresa no{' '}
                <em>Rio de Janeiro</em>
              </h1>
              <p className="hero-lede">
                Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e
                higienização de ar-condicionado. Fale agora no WhatsApp e receba
                seu orçamento ainda hoje.
              </p>
              <div className="hero-actions">
                <WaLink src="hero_principal" className="btn btn-wa btn-lg">
                  <svg className="ic">
                    <use href="#rkm-ic-whatsapp" />
                  </svg>
                  Chamar no WhatsApp agora
                </WaLink>
              </div>
              <ul className="hero-bullets">
                <li>
                  <svg>
                    <use href="#rkm-ic-check-circle" />
                  </svg>
                  Técnicos especializados
                </li>
                <li>
                  <svg>
                    <use href="#rkm-ic-check-circle" />
                  </svg>
                  Atendimento rápido
                </li>
                <li>
                  <svg>
                    <use href="#rkm-ic-check-circle" />
                  </svg>
                  Serviço com garantia
                </li>
              </ul>
              <a className="rating-chip" href="#depoimentos">
                <span className="stars">
                  <Stars />
                </span>
                <b>4.9</b>
                <span>avaliação média no Google</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===================== TRUST BAND ===================== */}
        <section className="trust-band">
          <div className="container">
            <div className="trust-item">
              <svg>
                <use href="#rkm-ic-gauge" />
              </svg>
              <b>Equipe especializada</b>
              <span>Técnicos capacitados e equipados</span>
            </div>
            <div className="trust-item">
              <svg>
                <use href="#rkm-ic-clock" />
              </svg>
              <b>Atendimento rápido</b>
              <span>Resposta no mesmo dia pelo WhatsApp</span>
            </div>
            <div className="trust-item">
              <svg>
                <use href="#rkm-ic-shield" />
              </svg>
              <b>Serviço garantido</b>
              <span>Garantia em mão de obra, peças e gás</span>
            </div>
            <div className="trust-item">
              <svg>
                <use href="#rkm-ic-building" />
              </svg>
              <b>Residencial e empresarial</b>
              <span>Da sua casa ao PMOC da sua empresa</span>
            </div>
          </div>
        </section>

        {/* ===================== SERVICES ===================== */}
        <section id="servicos">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">O que fazemos</span>
              <h2>Serviços de climatização de ponta a ponta</h2>
              <p>
                Da instalação ao laudo de PMOC — cuidamos de cada etapa do
                ar-condicionado da sua casa ou empresa.
              </p>
            </div>
            <div className="services-grid">
              {SERVICES.map((svc) => (
                <article className="svc-card" key={svc.id}>
                  <div className="svc-photo">
                    {/* oxlint-disable-next-line next/no-img-element */}
                    <img src={svc.img} alt={svc.alt} loading="lazy" />
                  </div>
                  <div className="svc-body">
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                    <WaLink src={svc.src} className="svc-link">
                      <svg>
                        <use href="#rkm-ic-whatsapp" />
                      </svg>
                      Solicitar orçamento
                    </WaLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== ABOUT US ===================== */}
        <section className="about-us">
          <div className="container">
            <div className="about-photo">
              {/* oxlint-disable-next-line next/no-img-element */}
              <img
                src="/rkm/about-us.jpg"
                alt="Técnico da RKM Climatização instalando ar-condicionado no Rio de Janeiro"
                loading="lazy"
              />
            </div>
            <div className="about-copy">
              <span className="eyebrow">Quem somos</span>
              <h2>Uma equipe pronta para cuidar do seu ar-condicionado</h2>
              <p>
                A RKM Climatização atende famílias e empresas no Rio de Janeiro
                que querem resolver o ar-condicionado de uma vez — sem depender
                de terceirizado, sem sumiço depois do serviço.
              </p>
              <p>
                Nossos técnicos seguem as orientações de cada fabricante em toda
                instalação, manutenção ou recarga de gás. Do primeiro contato no
                WhatsApp até a garantia do serviço, cuidamos de tudo para você.
              </p>
              <ul className="about-stats">
                <li>
                  <svg>
                    <use href="#rkm-ic-badge" />
                  </svg>
                  Técnicos especializados
                </li>
                <li>
                  <svg>
                    <use href="#rkm-ic-tools" />
                  </svg>
                  Equipamentos próprios
                </li>
                <li>
                  <svg>
                    <use href="#rkm-ic-building" />
                  </svg>
                  Residencial e empresarial
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================== WHY US ===================== */}
        <section className="why-us">
          <div className="container">
            <div className="why-copy">
              <span className="eyebrow">Por que a RKM Climatização</span>
              <h2>Time preparado, do orçamento ao pós-serviço</h2>
              <p>
                Atendimento direto, sem enrolação: quem orça e assina o serviço
                é quem instala. Isso significa combinado é combinado — no preço
                e no prazo.
              </p>
            </div>
            <ul className="why-list">
              {WHY_US.map((item) => (
                <li className="why-item" key={item.title}>
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
            </ul>
          </div>
        </section>

        {/* ===================== GALLERY ===================== */}
        <section id="galeria">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Trabalhos realizados</span>
              <h2>Instalações e manutenções recentes</h2>
              <p>
                Uma amostra de serviços entregues em residências, lojas e
                empresas no Rio de Janeiro.
              </p>
            </div>
            <div className="gallery-grid">
              {GALLERY.map((item) => (
                <div
                  className={`gallery-item${item.big ? ' big' : ''}`}
                  key={item.img}
                >
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <span className="gallery-cap">{item.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section id="depoimentos">
          <div className="container">
            <div className="testi-head">
              <div className="section-head">
                <span className="eyebrow">Depoimentos</span>
                <h2>Clientes reais recomendam a RKM Climatização</h2>
              </div>
              <div className="testi-head-right">
                <div className="rating-card">
                  <div className="word">EXCELENTE</div>
                  <div className="stars">
                    <Stars />
                  </div>
                  <div className="score">
                    <b>4.9</b> · Com base em 127 avaliações
                  </div>
                  <div className="google">
                    <svg>
                      <use href="#rkm-ic-google" />
                    </svg>
                    <span>Google</span>
                  </div>
                </div>
                <div className="testi-nav">
                  <button
                    className="nav-btn"
                    aria-label="Depoimento anterior"
                    onClick={() => scrollTesti(-1)}
                  >
                    <svg>
                      <use href="#rkm-ic-chevron-left" />
                    </svg>
                  </button>
                  <button
                    className="nav-btn"
                    aria-label="Próximo depoimento"
                    onClick={() => scrollTesti(1)}
                  >
                    <svg>
                      <use href="#rkm-ic-chevron-right" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="testi-track" ref={testiTrack}>
              {TESTIMONIALS.map((t) => (
                <article className="testi-card" key={t.name}>
                  <svg className="testi-google">
                    <use href="#rkm-ic-google" />
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
          </div>
        </section>

        {/* ===================== PARTNERS ===================== */}
        <section className="partners">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Parceiros</span>
              <h2 style={{ fontSize: 'var(--fs-xl)' }}>
                Empresas que confiam na RKM Climatização
              </h2>
            </div>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  className={`partner-card${p.onDark ? ' on-dark' : ''}`}
                  key={`${p.file}-${i}`}
                  aria-hidden={i >= PARTNERS.length}
                >
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img
                    src={`/rkm/partners/${p.file}`}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section id="faq">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Dúvidas frequentes</span>
              <h2>Perguntas antes de chamar</h2>
            </div>
            <div className="faq-layout">
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
                        <use href="#rkm-ic-plus" />
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
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="final-cta">
          <div className="container">
            <h2>Chame agora e receba seu orçamento ainda hoje</h2>
            <p>
              Residencial ou empresarial, instalação, manutenção ou PMOC — fale
              com quem executa o serviço, sem intermediário.
            </p>
            <WaLink src="cta_final" className="btn btn-wa btn-lg">
              <svg className="ic">
                <use href="#rkm-ic-whatsapp" />
              </svg>
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
                <RkmLogo className="logo-mark" id="footer" />
                <b>RKM Climatização</b>
              </div>
              <p className="tag">
                Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e
                higienização de ar-condicionado — residencial e empresarial no
                Rio de Janeiro.
              </p>
            </div>
            <div className="footer-col">
              <h5>Contato</h5>
              <WaLink src="footer" className="wa-line">
                <svg>
                  <use href="#rkm-ic-whatsapp" />
                </svg>
                {WHATSAPP_DISPLAY}
              </WaLink>
              <ul>
                <li>
                  <a href="#servicos">Ver serviços</a>
                </li>
                <li>
                  <a href="#depoimentos">Depoimentos</a>
                </li>
                <li>
                  <a href="#faq">Dúvidas frequentes</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Área de atendimento</h5>
              <ul>
                <li>Zona Sul do Rio</li>
                <li>Zona Norte do Rio</li>
                <li>Zona Oeste e Barra</li>
                <li>Centro do Rio</li>
                <li>Niterói e São Gonçalo</li>
                <li>Região Metropolitana</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 RKM Climatização. Todos os direitos reservados.</span>
            <span>
              Instalação · Manutenção · Recarga de gás · PMOC · Elétrico ·
              Higienização
            </span>
          </div>
        </div>
      </footer>

      {/* ===================== FLOATING WHATSAPP ===================== */}
      <WaLink src="botao_flutuante" className="wa-float">
        <svg>
          <use href="#rkm-ic-whatsapp" />
        </svg>
      </WaLink>

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
          aria-labelledby="rkm-popup-title"
        >
          {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
          <div className="popup-photo">
            {/* oxlint-disable-next-line next/no-img-element */}
            <img
              src="/rkm/popup.jpg"
              alt="Evaporadora de ar-condicionado instalada"
            />
            <button
              className="popup-close"
              aria-label="Fechar"
              onClick={closePopup}
            >
              <svg>
                <use href="#rkm-ic-close" />
              </svg>
            </button>
          </div>
          <div className="popup-offer">
            <span className="badge">OFERTA POR TEMPO LIMITADO</span>
            <div className="big" id="rkm-popup-title">
              10% OFF
            </div>
            <p className="desc">
              em instalação e manutenção de ar-condicionado no Rio de Janeiro
            </p>
          </div>
          <div className="popup-body">
            <ul className="popup-list">
              <li>
                <svg>
                  <use href="#rkm-ic-check" />
                </svg>
                Válido para orçamentos solicitados hoje
              </li>
              <li>
                <svg>
                  <use href="#rkm-ic-check" />
                </svg>
                Todos os serviços com garantia
              </li>
              <li>
                <svg>
                  <use href="#rkm-ic-check" />
                </svg>
                Pagamento no Pix, cartão ou boleto
              </li>
            </ul>
            <WaLink src="popup" className="btn btn-wa btn-block">
              <svg className="ic">
                <use href="#rkm-ic-whatsapp" />
              </svg>
              Resgatar meu 10% no WhatsApp
            </WaLink>
            <button
              className="popup-dismiss"
              type="button"
              onClick={closePopup}
            >
              Não, obrigado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
