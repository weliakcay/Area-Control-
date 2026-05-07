import type { Metadata } from 'next';
import './globals.css';
import { fontDisplay, fontSans, fontMono } from '@/lib/fonts';
import LenisProvider from '@/components/layout/LenisProvider';
import HydrationGuard from '@/components/layout/HydrationGuard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'tr_TR',
    type: 'website',
    images: ['/og.svg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1} ${site.address.line2}`,
    addressLocality: site.address.city,
    addressCountry: 'TR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      translate="no"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="notranslate" suppressHydrationWarning>
        <JsonLd id="ld-org" data={orgLd} />
        <HydrationGuard>
          <LenisProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </HydrationGuard>
      </body>
    </html>
  );
}
