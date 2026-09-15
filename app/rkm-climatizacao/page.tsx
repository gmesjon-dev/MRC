import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RkmClimatizacaoLanding from './RkmClimatizacaoLanding';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-rkm',
  display: 'swap',
});

const title =
  'RKM Climatização — Ar-Condicionado no Rio de Janeiro | Orçamento no WhatsApp';
const description =
  'Instalação, manutenção, recarga de gás, PMOC, projeto elétrico e higienização de ar-condicionado no Rio de Janeiro. Atendimento residencial e empresarial. Fale agora pelo WhatsApp.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <RkmClimatizacaoLanding fontVariable={inter.variable} />;
}
