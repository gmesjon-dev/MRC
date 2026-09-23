import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MkClimatizacaoLanding from './MkClimatizacaoLanding';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-mk',
  display: 'swap',
});

const title =
  'MK Climatização — Ar-Condicionado em Fortaleza | Orçamento no WhatsApp';
const description =
  'Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e higienização de ar-condicionado em Fortaleza. Atendimento residencial e empresarial. Fale agora pelo WhatsApp.';

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/mk/logo.svg',
    apple: '/mk/logo.svg',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/mk/hero-desktop.jpg', width: 2000, height: 1100 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/mk/hero-desktop.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <MkClimatizacaoLanding fontVariable={inter.variable} />;
}
