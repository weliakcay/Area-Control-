# Area Control Web Sitesi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Area Control Belgelendirme için 6 sayfalık Next.js 15 statik site — Dark Editorial estetikte, scroll animasyonlu, kırmızı/siyah paletli, TR dilinde (EN altyapı hazır).

**Architecture:** Next.js 15 App Router + `output: 'export'` ile statik build; Tailwind CSS v4, Framer Motion + GSAP/ScrollTrigger, Lenis smooth scroll, next-intl i18n, Web3Forms iletişim formu. Tüm metinler `messages/tr.json` + `content/*.ts` altında, kodda hardcoded yok.

**Tech Stack:** Next.js 15, TypeScript strict, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis (react-lenis), next-intl, next/font, Web3Forms.

**Spec ref:** `docs/superpowers/specs/2026-04-17-area-control-site-design.md`

---

## Notlar

- **Test stratejisi:** Pure UI/marketing sitesi — jest/vitest birim testleri bu proje icin gereksiz overhead. Build basarisi + manuel smoke test (dev server + production build) + Lighthouse birincil dogrulama yontemleridir. Her task sonunda `npm run build` hatasiz tamamlanmali.
- **Commit disiplini:** Her task ayri commit.
- **Proje yolu (PROJE_ROOT):** `/Users/veliakcay/Documents/projeler/area-control-site/`. Tum path'ler bu kok altinda.

---

## File Structure

Olusturulacak / degistirilecek ana dosyalar:

```
area-control-site/
|- package.json                           # Task 1
|- tsconfig.json                          # Task 1
|- next.config.mjs                        # Task 1
|- postcss.config.mjs                     # Task 2
|- tailwind.config.ts                     # Task 2
|- .gitignore                             # Task 1
|- .env.local.example                     # Task 1
|- app/
|  |- globals.css                         # Task 2
|  |- layout.tsx                          # Task 4
|  |- page.tsx                            # Task 10 (composition)
|  |- not-found.tsx                       # Task 14
|  |- sitemap.ts                          # Task 14
|  |- robots.ts                           # Task 14
|  |- hizmetler/
|  |  |- sistem-belgelendirme/page.tsx    # Task 13
|  |  |- tedarikci-denetimi/page.tsx      # Task 13
|  |  `- hijyen-gida-su/page.tsx          # Task 13
|  |- hakkimizda/page.tsx                 # Task 12
|  `- iletisim/page.tsx                   # Task 11
|- components/
|  |- layout/ (Header, Footer, LenisProvider)        # Task 4
|  |- ui/ (Button, KickerLabel, Reveal, Counter,
|  |       StandardCard, Accordion, JsonLd)          # Task 5
|  |- sections/ (Hero, About, ServicesTriple,
|  |              ProcessHorizontal, StandardsMarquee,
|  |              Clients, VideoQuote, Faq, CtaFooter,
|  |              ServiceDetail)                     # Tasks 6-10, 13
|  `- forms/ContactForm.tsx                          # Task 11
|- content/ (site, standards, services, process, faq) # Task 3
|- lib/fonts.ts                                       # Task 3
|- messages/tr.json                                   # Task 3
`- public/ (logo.svg, favicon.svg, og.svg, media/)    # Task 1, 14
```

---

## Task 1: Proje iskeleti + logo

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `.gitignore`, `.env.local.example`, `public/logo.svg`

- [ ] **Step 1: Projeye git**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
```

- [ ] **Step 2: `.gitignore` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/.gitignore`

```
node_modules/
.next/
out/
.env.local
.DS_Store
*.log
logo-source.svg
```

- [ ] **Step 3: `package.json` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/package.json`

```json
{
  "name": "area-control-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-intl": "^3.26.0",
    "framer-motion": "^11.15.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.20"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.2",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.0.3"
  }
}
```

- [ ] **Step 4: `tsconfig.json` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

- [ ] **Step 5: `next.config.mjs` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 6: `.env.local.example` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/.env.local.example`

```
# Web3Forms public access key — https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
```

- [ ] **Step 7: Logo dosyasini kopyala**

```bash
mkdir -p /Users/veliakcay/Documents/projeler/area-control-site/public
cp "/Users/veliakcay/Documents/projeler/area control /logo.svg" /Users/veliakcay/Documents/projeler/area-control-site/public/logo.svg
```

- [ ] **Step 8: `npm install` calistir**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm install
```

Beklenen: 0 error, `node_modules/` ve `package-lock.json` olusur.

- [ ] **Step 9: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "chore: bootstrap Next.js 15 project with deps and logo"
```

---

## Task 2: Tailwind v4 + globals.css + tema

**Files:**
- Create: `postcss.config.mjs`, `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: `postcss.config.mjs` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/postcss.config.mjs`

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 2: `tailwind.config.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        burgundy: '#440709',
        blood: '#7A0F14',
        crimson: '#A0141A',
        cream: '#EBE2D3',
        gold: '#B8956A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widestest: '0.3em',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: `app/globals.css` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/globals.css`

```css
@import 'tailwindcss';

@theme {
  --color-ink: #0A0A0A;
  --color-burgundy: #440709;
  --color-blood: #7A0F14;
  --color-crimson: #A0141A;
  --color-cream: #EBE2D3;
  --color-gold: #B8956A;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-sans: 'Instrument Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; }

html, body {
  background: var(--color-ink);
  color: var(--color-cream);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
}

::selection {
  background: var(--color-crimson);
  color: var(--color-cream);
}

.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>");
}

:focus-visible {
  outline: 2px solid var(--color-crimson);
  outline-offset: 4px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

html { scroll-behavior: smooth; }

.display-xl {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
}
.display-lg {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
}
.kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-crimson);
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: tailwind v4 theme tokens and base styles"
```

---

## Task 3: Content layer + fonts + i18n iskeleti

**Files:**
- Create: `lib/fonts.ts`, `content/site.ts`, `content/standards.ts`, `content/services.ts`, `content/process.ts`, `content/faq.ts`, `messages/tr.json`

- [ ] **Step 1: `lib/fonts.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/lib/fonts.ts`

```ts
import { Playfair_Display, Instrument_Sans, JetBrains_Mono } from 'next/font/google';

export const fontDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});
```

- [ ] **Step 2: `content/site.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/content/site.ts`

```ts
export const site = {
  name: 'Area Control',
  legalName: 'Area Control Belgelendirme Gozetim ve Teknik Kontrol Hizmetleri A.S.',
  tagline: 'Guvenin kapsami, denetimle baslar.',
  description:
    'Antalya merkezli, TURKAK akreditasyonu ile otel ve restoran isletmeleri icin sistem belgelendirme, tedarikci denetimi ve hijyen-gida-su denetimi hizmetleri.',
  address: {
    line1: 'Zerdalilik Mah. 1380 Sok.',
    line2: 'Gulgun Apt. Sitesi No:8/6',
    city: 'Antalya',
    country: 'Turkiye',
  },
  phone: '+90 537 267 0972',
  phoneDisplay: '0537 267 0972',
  phoneE164: '+905372670972',
  whatsapp: '905372670972',
  whatsappMessage: 'Merhaba, Area Control hizmetleri hakkinda bilgi almak istiyorum.',
  email: 'info@bixkurumsal.com',
  accreditations: [
    { code: 'TURKAK', note: 'SigmaCert ortakligi uzerinden' },
    { code: 'HAK', note: 'Helal belgelendirme akreditasyonu' },
  ],
  metrics: [
    { value: '150+', label: 'Tamamlanan Denetim' },
    { value: '18', label: 'ISO Standardi' },
    { value: 'TURKAK', label: 'Akreditasyon' },
  ],
  url: 'https://areacontrol.com.tr',
  web3forms: {
    endpoint: 'https://api.web3forms.com/submit',
  },
};

export type Site = typeof site;
```

**Not:** JSON/TS'teki tum Turkce ozel karakterler (c-cedilla, g-breve, i-dotless, o-umlaut, s-cedilla, u-umlaut) UTF-8 olarak gercek karakterle yaziliyor — yukarida ASCII-safe gorunuyor ama dosyaya yazilirken gercek karakter kullanilacak. Editor tarafindan otomatik UTF-8 saving ile.

**Actual content string for this file's `site.ts` (use these Turkish characters verbatim):**

- `legalName`: `Area Control Belgelendirme Gozetim ve Teknik Kontrol Hizmetleri A.S.` → should be: `Area Control Belgelendirme Gozetim ve Teknik Kontrol Hizmetleri A.Ş.` (capital S-cedilla at end; other o/u left as-is)
- `tagline`: `Guvenin kapsami, denetimle baslar.` → should be: `Güvenin kapsamı, denetimle başlar.` (g-umlaut, i-dotless, s-cedilla)
- `description`: `Antalya merkezli, TURKAK akreditasyonu ile otel ve restoran isletmeleri icin sistem belgelendirme, tedarikci denetimi ve hijyen-gida-su denetimi hizmetleri.` → should be: `Antalya merkezli, TÜRKAK akreditasyonu ile otel ve restoran işletmeleri için sistem belgelendirme, tedarikçi denetimi ve hijyen-gıda-su denetimi hizmetleri.`
- `address.line2`: `Gulgun Apt. Sitesi No:8/6` → `Gülgün Apt. Sitesi No:8/6`
- `address.country`: `Turkiye` → `Türkiye`
- `whatsappMessage`: `Merhaba, Area Control hizmetleri hakkinda bilgi almak istiyorum.` → `Merhaba, Area Control hizmetleri hakkında bilgi almak istiyorum.`
- `accreditations[0].code`: `TURKAK` → `TÜRKAK`
- `accreditations[0].note`: `SigmaCert ortakligi uzerinden` → `SigmaCert ortaklığı üzerinden`
- `metrics[1].label`: `ISO Standardi` → `ISO Standardı`
- `metrics[2].value`: `TURKAK` → `TÜRKAK`

**Tum dosyalarda ayni kural:** asagida gordugunuz ASCII-safe Turkce'yi, gercek dogru Turkce karakterlerle yaziniz. Final dosyada dogru Turkce yer almali.

- [ ] **Step 3: `content/standards.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/content/standards.ts`

```ts
export type StandardCategory =
  | 'quality' | 'environment' | 'food' | 'safety'
  | 'info' | 'energy' | 'supply' | 'medical' | 'other';

export type Standard = {
  code: string;
  shortCode: string;
  name: string;
  description: string;
  category: StandardCategory;
};

export const standards: Standard[] = [
  {
    code: 'ISO 9001:2015',
    shortCode: '9001',
    name: 'Kalite Yonetim Sistemi',
    description: 'Urun ve hizmet kalitesinin sistematik yonetimi; sureclerin iyilestirilmesi ve musteri memnuniyetinin artirilmasi.',
    category: 'quality',
  },
  {
    code: 'ISO 14001:2015',
    shortCode: '14001',
    name: 'Cevre Yonetim Sistemi',
    description: 'Cevresel etkilerin sistemli kontrolu ve surdurulebilirlik yukumluluklerinin yerine getirilmesi.',
    category: 'environment',
  },
  {
    code: 'ISO 22000:2018',
    shortCode: '22000',
    name: 'Gida Guvenligi Yonetim Sistemi',
    description: 'Gida zincirinin her asamasinda guvenligin sistematik denetimi; otel ve restoran operasyonlarinin merkezinde.',
    category: 'food',
  },
  {
    code: 'ISO 45001:2018',
    shortCode: '45001',
    name: 'Is Sagligi ve Guvenligi',
    description: 'Calisma ortaminda risklerin belirlenmesi, onleyici kontrollerin kurulmasi ve surdurulmesi.',
    category: 'safety',
  },
  {
    code: 'ISO 50001:2018',
    shortCode: '50001',
    name: 'Enerji Yonetim Sistemi',
    description: 'Enerji performansinin izlenmesi, verimliligin artirilmasi ve maliyet kontrolu.',
    category: 'energy',
  },
  {
    code: 'ISO/IEC 27001:2022',
    shortCode: '27001',
    name: 'Bilgi Guvenligi Yonetim Sistemi',
    description: 'Bilgi varliklarinin gizlilik, butunluk ve erisilebilirlik kontrol altinda tutulmasi.',
    category: 'info',
  },
  {
    code: 'ISO 10002:2018',
    shortCode: '10002',
    name: 'Musteri Memnuniyeti Yonetim Sistemi',
    description: 'Sikayet yonetimi, geri bildirim surecleri ve musteri deneyiminin sistemli iyilestirilmesi.',
    category: 'quality',
  },
  {
    code: 'ISO 13485:2016',
    shortCode: '13485',
    name: 'Tibbi Cihaz Kalite Yonetim Sistemi',
    description: 'Tibbi cihaz uretiminin ve tedarikinin regulatif uyumla yonetilmesi.',
    category: 'medical',
  },
  {
    code: 'ISO/IEC 20000-1:2011',
    shortCode: '20000-1',
    name: 'Bilgi Teknolojileri Hizmet Yonetim Sistemi',
    description: 'IT hizmetlerinin sistemli yonetimi, hizmet seviyelerinin surekliligi.',
    category: 'info',
  },
  {
    code: 'ISO 22301:2019',
    shortCode: '22301',
    name: 'Is Surekliligi Yonetim Sistemi',
    description: 'Olagandisi durumlarda operasyonel surekliligin guvence altina alinmasi.',
    category: 'safety',
  },
  {
    code: 'ISO 31000:2018',
    shortCode: '31000',
    name: 'Risk Yonetim Sistemi',
    description: 'Kurumsal risklerin sistematik tanimlanmasi, degerlendirilmesi ve kontrolu.',
    category: 'safety',
  },
  {
    code: 'ISO 28000:2007',
    shortCode: '28000',
    name: 'Tedarik Zinciri Guvenlik Sistemi',
    description: 'Tedarik zinciri boyunca guvenlik risklerinin yonetilmesi ve izlenmesi.',
    category: 'supply',
  },
  {
    code: 'ISO/IEC 27701:2019',
    shortCode: '27701',
    name: 'Kisisel Veri Gizliligi Yonetim Sistemi',
    description: 'KVKK/GDPR uyumu icin kisisel veri isleme sureclerinin sistematik yonetimi.',
    category: 'info',
  },
  {
    code: 'ISO 14064-1',
    shortCode: '14064',
    name: 'Karbon Ayak Izi Dogrulama',
    description: 'Sera gazi emisyonlarinin olcumu, raporlanmasi ve azaltim hedeflerinin dogrulanmasi.',
    category: 'environment',
  },
  {
    code: 'GMP',
    shortCode: 'GMP',
    name: 'Iyi Uretim Uygulamalari',
    description: 'Uretim proseslerinin hijyen ve kalite standartlarina uygun yurutulmesi.',
    category: 'food',
  },
  {
    code: 'Helal Belgelendirme',
    shortCode: 'Helal',
    name: 'Helal Gida Belgelendirme',
    description: 'Helal gereklilikler dogrultusunda gida ve hizmet sureclerinin belgelendirilmesi.',
    category: 'food',
  },
];
```

**Turkce karakter kullanim kurali:** Yukaridaki ASCII yazimi gercek dogru Turkce karakterlerle yazin (ornek: `Yonetim` → `Yönetim`, `Cevre` → `Çevre`, `Is` → `İş`, `Sikayet` → `Şikayet`, `Uretim` → `Üretim`, `Gida` → `Gıda`, `Guvenlik` → `Güvenlik`). Her Turkce sozcukte ozel karakter varsa tam dogru yazim uygulanmali. Tum dosyalarda bu kural gecerli.

- [ ] **Step 4: `content/process.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/content/process.ts`

```ts
export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Teklif ve Kapsam Tespiti',
    description: 'Operasyonunuzu birlikte inceleriz; hedeflenen standart, kapsam ve zaman cizelgesi belirlenir. Seffaf teklif hazirlariz.',
  },
  {
    number: '02',
    title: 'On Denetim',
    description: 'Hazirlik duzeyinizi degerlendirir, bosluk analizini raporlariz. Belgelendirmeye girmeden once eksikler netlesir.',
  },
  {
    number: '03',
    title: 'Belgelendirme Denetimi',
    description: 'Bagimsiz denetci sahada kapsamli kontrol gerceklestirir; uyum kanitlanir, belge duzenlenir.',
  },
  {
    number: '04',
    title: 'Yillik Gozetim',
    description: 'Belge gecerliligi boyunca yillik takip denetimleri ile sistemin surekliligi dogrulanir.',
  },
];
```

- [ ] **Step 5: `content/services.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/content/services.ts`

```ts
export type ServiceSlug = 'sistem-belgelendirme' | 'tedarikci-denetimi' | 'hijyen-gida-su';

export type Service = {
  slug: ServiceSlug;
  number: '01' | '02' | '03';
  title: string;
  tagline: string;
  summary: string;
  heroIntro: string;
  scope: string[];
  benefits: string[];
  relatedStandards: string[];
};

export const services: Service[] = [
  {
    slug: 'sistem-belgelendirme',
    number: '01',
    title: 'Sistem Belgelendirme',
    tagline: 'Operasyonunuzun her katmani icin akredite belgelendirme.',
    summary: 'ISO 9001\'den 22000\'e, uluslararasi standartlarda sistemlerinizi belgelendirir; surdurulebilir uyum kazandiririz.',
    heroIntro:
      'Sistem belgelendirme, kurumunuzun sureclerini uluslararasi bir disipline baglamaktir. Kalite, gida guvenligi, cevre, is sagligi ve bilgi guvenligi basta olmak uzere 16 farkli yonetim sistemi standardinda TURKAK akrediteli belgelendirme hizmeti sunuyoruz.',
    scope: [
      'Kapsam tespiti ve standart secimi danismanligi',
      'Bosluk analizi ve on denetim',
      'Belgelendirme denetimi (Evre 1 & Evre 2)',
      'Belge duzenleme ve yillik gozetim denetimleri',
      'Yenileme denetimleri (3 yillik dongu)',
    ],
    benefits: [
      'Uluslararasi taninirlik ve ihracat pazarinda rekabet avantaji',
      'Operasyonel verimlilik ve risk yonetimi',
      'Musteri ve tedarikci nezdinde guven',
      'Regulatif uyumun belgelenmesi',
    ],
    relatedStandards: ['9001', '14001', '22000', '45001', '27001', '50001', '10002', '22301', '28000', '31000'],
  },
  {
    slug: 'tedarikci-denetimi',
    number: '02',
    title: 'Tedarikci Denetimi',
    tagline: 'Mal girdiginiz kapidan baslayan denetim.',
    summary: 'Tedarikcilerinizi sahada denetler, risklerini gorunur kilar; operasyon kalitesini kaynaginda guvence altina aliriz.',
    heroIntro:
      'Tedarikci denetimi, mal ve hizmet aldiginiz firmalarin sizin standartlarinizla uyumunu dogrular. Otel ve restoran operasyonlarinda girdi kalitesi, misafir deneyiminin sessiz garantorudur.',
    scope: [
      'Tedarikci risk siniflandirmasi ve onceliklendirme',
      'Saha denetimi (GMP, hijyen, kalite)',
      'Dokumantasyon ve izlenebilirlik kontrolu',
      'Denetim raporu ve duzeltici faaliyet takibi',
      'Yillik periyodik tedarikci degerlendirmesi',
    ],
    benefits: [
      'Tedarik zincirinde ongorulebilirlik',
      'Girdi kaynakli sikayetlerin azalmasi',
      'Regulasyon denetimlerinde hazir dokumantasyon',
      'Tedarikci performansinin olculebilirligi',
    ],
    relatedStandards: ['28000', '22000', 'GMP'],
  },
  {
    slug: 'hijyen-gida-su',
    number: '03',
    title: 'Hijyen, Gida & Su Denetimi',
    tagline: 'Misafirinizin guvenli deneyimi icin saha denetimi ve laboratuvar analizi.',
    summary: 'Mutfak, buffe, havuz, depo — operasyonun tum temas noktalarinda hijyen denetimi ve akredite laboratuvar analizi.',
    heroIntro:
      'Hijyen ve gida guvenligi, otel ve restoran itibarinin gozle gorulmeyen ama her an fark edilen boyutudur. Sahada denetim ve laboratuvar analizini birlestirerek hem onlem hem belge uretiyoruz.',
    scope: [
      'Mutfak ve buffe hijyen denetimi (ATP, surunta testleri)',
      'Gida mikrobiyolojik ve kimyasal analizi',
      'Icme suyu, kullanma suyu ve havuz suyu analizi',
      'Pestisit kalinti analizi',
      'Helal gida uygunluk kontrolu',
      'Legionella ve su sistemleri degerlendirmesi',
    ],
    benefits: [
      'Gida kaynakli risklerin erken tespiti',
      'Regulasyonlara (Tarim Bakanligi, Il Saglik) uyum',
      'Misafir sikayetlerinde belgeye dayali savunma',
      'Operasyon ekibinin sureklilik kulturu',
    ],
    relatedStandards: ['22000', 'GMP', 'Helal'],
  },
];
```

- [ ] **Step 6: `content/faq.ts` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/content/faq.ts`

```ts
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'Belgelendirme sureci ne kadar suruyor?',
    answer:
      'Standarda ve isletme buyuklugune gore degismekle birlikte, on denetimden belgelendirmeye tipik surec 6-12 haftadir. Hazirlik duzeyiniz yuksekse daha hizli tamamlanabilir; kapsamli eksikler varsa duzeltme icin ek sure gerekebilir.',
  },
  {
    question: 'Hangi akreditasyon kurumu uzerinden belgelendirme yapiyorsunuz?',
    answer:
      'Sistem belgelendirme hizmetlerimizi SigmaCert ortakligi uzerinden TURKAK akreditasyonu ile sunuyoruz. Helal belgelendirmede HAK akreditasyonu kullanilmaktadir.',
  },
  {
    question: 'Denetim ucretleri neye gore belirleniyor?',
    answer:
      'Fiyat; secilen standart, kapsam, calisan sayisi, lokasyon sayisi ve denetim suresine gore belirlenir. Teklif asamasinda net butce paylasiriz; surpriz kalem cikarmayiz.',
  },
  {
    question: 'Belge aldiktan sonra surec bitiyor mu?',
    answer:
      'Hayir. Belge gecerliligi 3 yildir ve yillik gozetim denetimleri ile surekliligi dogrulanir. 3. yilin sonunda yenileme denetimi ile belge yenilenir.',
  },
  {
    question: 'Otel disindaki sektorlere de hizmet veriyor musunuz?',
    answer:
      'Evet. Odak alanimiz otel ve restoran olsa da, gida uretim tesisleri, saglik kuruluslari, uretim firmalari ve hizmet sektorunde yer alan isletmelere de belgelendirme ve denetim hizmeti sunuyoruz.',
  },
  {
    question: 'Hijyen analizi ne siklikta yapilmali?',
    answer:
      'Operasyon yogunluguna gore degisir; genel oneri mutfak ve buffe hijyen denetiminin aylik, su analizlerinin en az uc aylik, Legionella kontrolunun yillik periyotlarda yapilmasidir. Risk bazli ozel plan cikartiyoruz.',
  },
  {
    question: 'Tedarikci denetimi zorunlu mu?',
    answer:
      'Regulatif zorunluluk degildir, ancak ISO 22000 ve benzeri sistemlerde tedarikci degerlendirmesi sarttir. Ayrica misafir guvenligi acisindan tedarikci denetimi en yuksek kaldiraca sahip uygulamalardan biridir.',
  },
];
```

- [ ] **Step 7: `messages/tr.json` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/messages/tr.json`

```json
{
  "nav": {
    "services": "Hizmetler",
    "about": "Hakkimizda",
    "contact": "Iletisim",
    "cta": "Teklif Al"
  },
  "hero": {
    "kicker": "Certified Trust | Belgelendirme | Denetim | Kontrol",
    "titleBefore": "Guvenin",
    "titleItalic": "kapsami",
    "titleAfter": ", denetimle baslar.",
    "intro": "Antalya merkezli, TURKAK akreditasyonu ile otel ve restoran isletmelerinizi uluslararasi standartlara tasiyoruz.",
    "ctaPrimary": "Teklif Alin",
    "ctaSecondary": "Hizmetlerimiz"
  },
  "about": {
    "kicker": "01 | Biz Kimiz",
    "title": "Belgelendirme yuzeysel degil, sistemsel bir disiplindir.",
    "p1": "Area Control, Antalya merkezli; otel ve restoran operasyonlarinin kalitesini uluslararasi standartlara baglayan bagimsiz bir belgelendirme ve denetim sirketidir.",
    "p2": "SigmaCert ortakligi uzerinden TURKAK akreditasyonuyla calisiriz. Amacimiz sertifika toplamak degil, misafirinize sundugunuz guvenin gorunur kanitini olusturmaktir."
  },
  "services": {
    "kicker": "02 | Hizmetler",
    "title": "Uc baslik. Tek bir ortak.",
    "intro": "Sistem belgelendirmeden saha denetimine, operasyonunuzun tum temas noktalarinda yanindayiz."
  },
  "process": {
    "kicker": "03 | Surec",
    "title": "Seffaf dort adimda belgelendirme.",
    "intro": "Her adim, eksikleri net gormeniz icin tasarlandi. Surpriz fatura, surpriz kapsam yok."
  },
  "standards": {
    "kicker": "04 | Standart Kutuphanesi",
    "title": "16 yonetim sistemi standardi.",
    "intro": "Kalite, cevre, gida, bilgi guvenligi, enerji ve is guvenligi alanlarinda akrediteli belgelendirme."
  },
  "clients": {
    "kicker": "05 | Kimlerle Calisiyoruz",
    "title": "Antalya'nin en iyi isletmeleri ile ortaklik.",
    "intro": "5 yildizli oteller, butik konseptler, zincir restoranlar — hepsi farkli ama ayni standarda bagli."
  },
  "video": {
    "kicker": "06 | Saha",
    "quote": "Denetim, iyi bir otelin misafire soylemedigi ama her gun tekrarladigi sozdur."
  },
  "faq": {
    "kicker": "07 | Sikca Sorulanlar",
    "title": "Akildaki ilk sorular."
  },
  "cta": {
    "kicker": "08 | Iletisim",
    "title": "Teklif alalim.",
    "intro": "Hangi hizmet icin geldiginizi secin, 24 saat icinde kapsamli bir teklifle donuyoruz.",
    "form": {
      "name": "Ad Soyad",
      "company": "Kurum",
      "phone": "Telefon",
      "email": "E-posta",
      "service": "Hizmet",
      "message": "Mesaj",
      "submit": "Gonder",
      "servicePlaceholder": "Hizmet secin",
      "serviceOther": "Diger / Genel Bilgi",
      "success": "Mesajiniz iletildi. En kisa surede donus yapacagiz."
    }
  },
  "footer": {
    "tagline": "Belgelendirme, gozetim ve teknik kontrol.",
    "servicesHeading": "Hizmetler",
    "companyHeading": "Kurumsal",
    "contactHeading": "Iletisim",
    "copyright": "Tum haklari saklidir."
  }
}
```

**Turkce karakter kurali:** Yukaridaki metinleri dosyaya yazarken TR karakterlerini dogru yazin (c-cedilla, g-breve, i-dotless/dotted, o-umlaut, s-cedilla, u-umlaut). Ayrica `"Certified Trust | Belgelendirme | Denetim | Kontrol"` yerine separator olarak `·` (middle dot, U+00B7) kullanin — daha editoryel goruntu icin. Tum kicker ayraclari `·` olacak.

- [ ] **Step 8: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: content layer (site/standards/services/process/faq) and fonts"
```

---

## Task 4: Layout + Header + Footer + Lenis + JsonLd component

**Files:**
- Create: `app/layout.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/LenisProvider.tsx`, `components/ui/JsonLd.tsx`, `public/logo-dark-bg.svg`

- [ ] **Step 1: Koyu zemin logo varyanti**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/public/logo-dark-bg.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="ac-g" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#A0141A"/>
      <stop offset="1" stop-color="#440709"/>
    </linearGradient>
  </defs>
  <path d="M60 16 L100 100 L84 100 L76 82 L44 82 L36 100 L20 100 Z M60 40 L50 70 L70 70 Z" fill="url(#ac-g)"/>
</svg>
```

Not: Bu basitlestirilmis bir A-ikon fallback'idir. Gercek gradient A orijinal `logo.svg` icinde embedded PNG olarak duruyor. Header'da orijinal `logo.svg`'yi ince krem container icinde gosterecegiz; bu fallback SVG favicon ve minik ikon durumlari icin yedek kalir.

- [ ] **Step 2: `components/ui/JsonLd.tsx` olustur (security hook-safe wrapper)**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/JsonLd.tsx`

```tsx
type Props = { data: Record<string, unknown> };

export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
```

Guvenlik notu: `data` param compile-time olarak uygulama icinden gelir (kullanici girdisi degil); yine de XSS-safe escape uygulandi. Next.js'in `application/ld+json` tipi icin standart yaklasimdir.

- [ ] **Step 3: `components/layout/LenisProvider.tsx` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/layout/LenisProvider.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      gestureOrientation: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 4: `components/layout/Header.tsx` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/layout/Header.tsx`

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-ink/70 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label={site.name}>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-cream/95 p-1">
            <Image src="/logo.svg" alt={site.name} width={28} height={28} priority />
          </span>
          <span className="hidden sm:inline-flex flex-col leading-none">
            <span className="font-display text-[0.95rem] tracking-wide text-cream">
              AREA<span className="text-crimson">CONTROL</span>
            </span>
            <span className="text-[0.55rem] tracking-[0.25em] uppercase text-cream/45 font-mono mt-0.5">
              Belgelendirme · Gozetim · Kontrol
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[0.82rem] tracking-wide text-cream/75">
          <div className="relative group">
            <Link href="/#hizmetler" className="hover:text-cream transition-colors">
              {tr.nav.services}
            </Link>
            <div className="absolute left-0 top-full mt-4 w-72 bg-ink/95 backdrop-blur-md border border-white/5 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/hizmetler/sistem-belgelendirme" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">01</span>Sistem Belgelendirme
              </Link>
              <Link href="/hizmetler/tedarikci-denetimi" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">02</span>Tedarikci Denetimi
              </Link>
              <Link href="/hizmetler/hijyen-gida-su" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">03</span>Hijyen, Gida &amp; Su
              </Link>
            </div>
          </div>
          <Link href="/hakkimizda" className="hover:text-cream transition-colors">{tr.nav.about}</Link>
          <Link href="/iletisim" className="hover:text-cream transition-colors">{tr.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-crimson/60 text-cream text-[0.75rem] tracking-[0.2em] uppercase hover:bg-crimson hover:border-crimson transition-colors"
          >
            {tr.nav.cta}
            <span aria-hidden>&rarr;</span>
          </Link>
          <button
            className="md:hidden text-cream/80 w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1h20M0 7h20M0 13h14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ink/98 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          <Link href="/hizmetler/sistem-belgelendirme" onClick={() => setMenuOpen(false)} className="text-cream/80">Sistem Belgelendirme</Link>
          <Link href="/hizmetler/tedarikci-denetimi" onClick={() => setMenuOpen(false)} className="text-cream/80">Tedarikci Denetimi</Link>
          <Link href="/hizmetler/hijyen-gida-su" onClick={() => setMenuOpen(false)} className="text-cream/80">Hijyen, Gida &amp; Su</Link>
          <Link href="/hakkimizda" onClick={() => setMenuOpen(false)} className="text-cream/80">{tr.nav.about}</Link>
          <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="text-cream/80">{tr.nav.contact}</Link>
          <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex justify-center items-center px-4 py-3 bg-crimson text-cream uppercase tracking-[0.2em] text-[0.75rem]">
            {tr.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
```

(Turkce kurali: `Tedarikci` → `Tedarikçi`, `Gida` → `Gıda`, `Gozetim` → `Gözetim`, `Hakkimizda` → `Hakkımızda` gibi.)

- [ ] **Step 5: `components/layout/Footer.tsx` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/layout/Footer.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-cream p-1.5">
              <Image src="/logo.svg" alt={site.name} width={28} height={28} />
            </span>
            <span className="font-display text-cream text-lg">
              AREA<span className="text-crimson">CONTROL</span>
            </span>
          </div>
          <p className="text-cream/55 text-[0.82rem] leading-relaxed max-w-xs">
            {tr.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.servicesHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li><Link href="/hizmetler/sistem-belgelendirme" className="hover:text-crimson">Sistem Belgelendirme</Link></li>
            <li><Link href="/hizmetler/tedarikci-denetimi" className="hover:text-crimson">Tedarikci Denetimi</Link></li>
            <li><Link href="/hizmetler/hijyen-gida-su" className="hover:text-crimson">Hijyen, Gida &amp; Su</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.companyHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li><Link href="/hakkimizda" className="hover:text-crimson">Hakkimizda</Link></li>
            <li><Link href="/iletisim" className="hover:text-crimson">Iletisim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.contactHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li>
              <a href={`tel:${site.phoneE164}`} className="hover:text-crimson">{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-crimson">{site.email}</a>
            </li>
            <li className="text-cream/55 leading-relaxed">
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-cream/40 text-[0.75rem] font-mono">
          &copy; {new Date().getFullYear()} {site.legalName} &middot; {tr.footer.copyright}
        </p>
        <div className="flex items-center gap-4 text-cream/40 text-[0.7rem] font-mono">
          {site.accreditations.map((a) => (
            <span key={a.code} className="flex items-center gap-1">
              <span className="w-1 h-1 bg-crimson rounded-full" />
              {a.code}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: `app/layout.tsx` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { fontDisplay, fontSans, fontMono } from '@/lib/fonts';
import LenisProvider from '@/components/layout/LenisProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/ui/JsonLd';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - ${site.tagline}`,
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
    <html lang="tr" className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <JsonLd data={orgLd} />
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: root layout with header, footer, lenis, json-ld"
```

---

## Task 5: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`, `KickerLabel.tsx`, `Reveal.tsx`, `Counter.tsx`, `StandardCard.tsx`, `Accordion.tsx`

- [ ] **Step 1: `Button.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/Button.tsx`

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  'inline-flex items-center gap-2 px-5 py-3 text-[0.75rem] uppercase tracking-[0.25em] font-medium transition-all duration-300';

const styles: Record<Variant, string> = {
  primary: 'bg-crimson text-cream hover:bg-blood border border-crimson',
  outline: 'border border-cream/25 text-cream hover:border-crimson hover:text-crimson',
  ghost: 'text-cream/70 hover:text-crimson',
};

export default function Button({ href, onClick, variant = 'primary', children, external, className = '', ariaLabel }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: `KickerLabel.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/KickerLabel.tsx`

```tsx
export default function KickerLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.3em] uppercase text-crimson">
      <span className="w-8 h-px bg-crimson/60" aria-hidden />
      {children}
    </span>
  );
}
```

- [ ] **Step 3: `Reveal.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/Reveal.tsx`

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createElement } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li';
  className?: string;
  once?: boolean;
};

export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '', once = true }: Props) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return createElement(as, { className }, children);
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.8, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 4: `Counter.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/Counter.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { to: string; duration?: number; className?: string };

export default function Counter({ to, duration = 1400, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = to.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : NaN;
  const suffix = match ? match[2] : '';
  const [value, setValue] = useState<string>(Number.isNaN(numeric) ? to : '0');

  useEffect(() => {
    if (Number.isNaN(numeric) || !ref.current) return;
    const el = ref.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(`${numeric}${suffix}`);
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(`${Math.floor(numeric * eased)}${suffix}`);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, suffix, duration]);

  return <span ref={ref} className={className}>{value}</span>;
}
```

- [ ] **Step 5: `StandardCard.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/StandardCard.tsx`

```tsx
import type { Standard } from '@/content/standards';

const categoryColor: Record<Standard['category'], string> = {
  quality: 'from-crimson/20',
  environment: 'from-green-900/20',
  food: 'from-amber-900/20',
  safety: 'from-orange-900/20',
  info: 'from-blue-900/20',
  energy: 'from-yellow-900/20',
  supply: 'from-purple-900/20',
  medical: 'from-rose-900/20',
  other: 'from-white/10',
};

export default function StandardCard({ s }: { s: Standard }) {
  return (
    <article
      className={`relative group w-72 shrink-0 h-56 rounded-sm bg-gradient-to-br ${categoryColor[s.category]} to-ink border border-white/5 p-6 flex flex-col justify-between overflow-hidden hover:border-crimson/40 transition-colors`}
    >
      <div>
        <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-crimson/80 mb-2">
          {s.code}
        </div>
        <h3 className="font-display text-xl text-cream leading-tight">
          {s.name}
        </h3>
      </div>
      <p className="text-cream/55 text-[0.8rem] leading-relaxed line-clamp-3">
        {s.description}
      </p>
      <div className="absolute -right-4 -bottom-6 font-display text-[7rem] leading-none text-white/[0.03] select-none">
        {s.shortCode}
      </div>
    </article>
  );
}
```

- [ ] **Step 6: `Accordion.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/ui/Accordion.tsx`

```tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Item = { question: string; answer: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 border-t border-b border-white/5">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span className="font-display text-xl md:text-2xl text-cream group-hover:text-crimson transition-colors">
                {it.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45 border-crimson text-crimson' : 'text-cream/60'}`}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" /></svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.8, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pr-12 text-cream/65 leading-relaxed max-w-3xl">
                    {it.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: ui primitives (button, kicker, reveal, counter, standard card, accordion)"
```

---

## Task 6: Hero section + build dogrulama

**Files:**
- Create: `components/sections/Hero.tsx`, `app/page.tsx` (placeholder)

- [ ] **Step 1: `Hero.tsx` olustur**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/Hero.tsx`

```tsx
'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import tr from '@/messages/tr.json';
import Button from '@/components/ui/Button';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = tr.hero.titleBefore.split(' ')
    .concat([`__ITALIC__${tr.hero.titleItalic}`])
    .concat(tr.hero.titleAfter.trim().split(' '));

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-ink grain isolate pt-20 pb-16"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        aria-hidden
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(160,20,26,0.35),transparent_55%),radial-gradient(ellipse_at_78%_78%,rgba(68,7,9,0.6),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink" />
      </motion.div>

      <motion.div style={reduce ? undefined : { opacity }} className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-crimson mb-8 flex items-center gap-4"
        >
          <span className="w-10 h-px bg-crimson/60" aria-hidden />
          {tr.hero.kicker}
        </motion.div>

        <h1 className="display-xl text-cream max-w-5xl">
          {words.map((w, i) => {
            const isItalic = w.startsWith('__ITALIC__');
            const word = isItalic ? w.replace('__ITALIC__', '') : w;
            return (
              <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.06,
                    ease: [0.22, 0.8, 0.36, 1],
                  }}
                  className={`inline-block ${isItalic ? 'italic text-crimson font-normal' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 max-w-xl text-cream/70 leading-relaxed"
        >
          {tr.hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/iletisim" variant="primary">
            {tr.hero.ctaPrimary}
            <span aria-hidden>&rarr;</span>
          </Button>
          <Button href="/#hizmetler" variant="outline">
            {tr.hero.ctaSecondary}
          </Button>
        </motion.div>

        {!reduce && (
          <div
            aria-hidden
            className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-dashed border-crimson/40 items-center justify-center"
            style={{ animation: 'ac-spin 30s linear infinite' }}
          >
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
              <defs>
                <path id="hero-circ" d="M80,80 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0" />
              </defs>
              <text fill="rgba(235,226,211,0.55)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="4">
                <textPath href="#hero-circ">
                  TURKAK &middot; HAK &middot; ISO 9001 &middot; ISO 22000 &middot; BELGELENDIRME &middot;
                </textPath>
              </text>
            </svg>
            <span className="font-display italic text-crimson text-sm">since 2009</span>
          </div>
        )}

        <div className="absolute left-6 lg:left-10 bottom-8 flex items-center gap-3 text-cream/40 text-[0.7rem] font-mono tracking-[0.3em] uppercase">
          <span className="w-8 h-px bg-cream/40" aria-hidden />
          Scroll
        </div>
      </motion.div>

      <style>{`
        @keyframes ac-spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Anasayfa placeholder**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/page.tsx`

```tsx
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-[50vh]" />
    </>
  );
}
```

- [ ] **Step 3: Build testi**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

Beklenen: Hatasiz tamamlanir; `out/index.html`, `out/404.html` (default) olusur.

- [ ] **Step 4: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: hero section with mask reveal and parallax"
```

---

## Task 7: About + ServicesTriple

**Files:**
- Create: `components/sections/About.tsx`, `components/sections/ServicesTriple.tsx`

- [ ] **Step 1: `About.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/About.tsx`

```tsx
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import tr from '@/messages/tr.json';
import { site } from '@/content/site';

export default function About() {
  return (
    <section className="relative py-28 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal as="div">
            <KickerLabel>{tr.about.kicker}</KickerLabel>
          </Reveal>
        </div>
        <div className="md:col-span-8 space-y-8">
          <Reveal as="h2" className="display-lg text-cream">
            {tr.about.title}
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl text-cream/70 leading-relaxed">
            <Reveal as="p" delay={0.05}>{tr.about.p1}</Reveal>
            <Reveal as="p" delay={0.15}>{tr.about.p2}</Reveal>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
            {site.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div>
                  <div className="font-display text-4xl md:text-5xl text-crimson leading-none">
                    <Counter to={m.value} />
                  </div>
                  <div className="mt-3 font-mono text-[0.7rem] tracking-[0.25em] uppercase text-cream/50">
                    {m.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `ServicesTriple.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/ServicesTriple.tsx`

```tsx
import Link from 'next/link';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';
import { services } from '@/content/services';

export default function ServicesTriple() {
  return (
    <section id="hizmetler" className="relative py-28 md:py-36 border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <Reveal><KickerLabel>{tr.services.kicker}</KickerLabel></Reveal>
          </div>
          <div className="md:col-span-8 space-y-5">
            <Reveal as="h2" className="display-lg text-cream">{tr.services.title}</Reveal>
            <Reveal as="p" delay={0.1} className="text-cream/65 max-w-xl leading-relaxed">
              {tr.services.intro}
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group relative block h-full min-h-[380px] bg-gradient-to-br from-burgundy/30 to-transparent border border-white/5 p-8 overflow-hidden transition-all duration-500 hover:border-crimson/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/0 to-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col h-full">
                  <div className="font-display text-7xl md:text-8xl text-crimson/70 group-hover:text-crimson transition-colors leading-none">
                    {s.number}
                  </div>
                  <h3 className="mt-8 font-display text-2xl md:text-3xl text-cream leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-cream/60 text-[0.9rem] leading-relaxed flex-1">
                    {s.tagline}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] tracking-[0.3em] uppercase text-crimson font-mono">
                    <span className="w-6 h-px bg-crimson group-hover:w-10 transition-all" />
                    Detay
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Anasayfaya bagla**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/page.tsx` (overwrite)

```tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <div className="min-h-[30vh]" />
    </>
  );
}
```

- [ ] **Step 4: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 5: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: about and services triple sections"
```

---

## Task 8: ProcessHorizontal + StandardsMarquee

**Files:**
- Create: `components/sections/ProcessHorizontal.tsx`, `components/sections/StandardsMarquee.tsx`

- [ ] **Step 1: `ProcessHorizontal.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/ProcessHorizontal.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import KickerLabel from '@/components/ui/KickerLabel';
import tr from '@/messages/tr.json';
import { processSteps } from '@/content/process';

export default function ProcessHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (prefersReduced || !isDesktop) return;

    let cleanup: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const panels = track.children.length;
      const distance = (panels - 1) * window.innerWidth;

      const st = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        st.scrollTrigger?.kill();
        st.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="surec"
      className="relative border-t border-white/5 bg-ink overflow-hidden lg:h-[100svh]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 lg:pt-20 pb-6 lg:absolute lg:top-10 lg:left-0 lg:right-0 lg:z-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <KickerLabel>{tr.process.kicker}</KickerLabel>
            <h2 className="mt-4 display-lg text-cream max-w-2xl">{tr.process.title}</h2>
          </div>
          <p className="text-cream/55 max-w-md leading-relaxed">{tr.process.intro}</p>
        </div>
      </div>

      <div className="lg:h-full lg:flex lg:items-center">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 lg:gap-0 px-6 lg:px-0 pb-20 lg:pb-0"
          style={{ width: 'max-content' }}
        >
          {processSteps.map((step, i) => (
            <article
              key={step.number}
              className="relative lg:w-screen lg:h-screen flex items-center"
            >
              <div className="mx-auto max-w-7xl w-full px-6 lg:px-20 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <div className="font-display text-[7rem] md:text-[10rem] lg:text-[14rem] leading-none text-crimson/25 select-none">
                    {step.number}
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-crimson/60" />
                    Adim {i + 1} / {processSteps.length}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-cream leading-tight mb-6">
                    {step.title}
                  </h3>
                  <p className="text-cream/65 leading-relaxed text-lg max-w-xl">
                    {step.description}
                  </p>
                  <div className="mt-10 h-px w-full bg-white/5 relative overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-crimson"
                      style={{ width: `${((i + 1) / processSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `StandardsMarquee.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/StandardsMarquee.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KickerLabel from '@/components/ui/KickerLabel';
import StandardCard from '@/components/ui/StandardCard';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';
import { standards, type Standard } from '@/content/standards';

export default function StandardsMarquee() {
  const [active, setActive] = useState<Standard | null>(null);
  const looped = [...standards, ...standards];

  return (
    <section id="standartlar" className="relative py-28 md:py-36 border-t border-white/5 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal><KickerLabel>{tr.standards.kicker}</KickerLabel></Reveal>
          </div>
          <div className="md:col-span-8 space-y-4">
            <Reveal as="h2" className="display-lg text-cream">{tr.standards.title}</Reveal>
            <Reveal as="p" delay={0.1} className="text-cream/65 max-w-xl leading-relaxed">
              {tr.standards.intro}
            </Reveal>
          </div>
        </div>
      </div>

      <div className="group relative">
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] will-change-transform">
          {looped.map((s, i) => (
            <button
              key={`${s.code}-${i}`}
              onClick={() => setActive(s)}
              className="text-left focus:outline-none focus-visible:outline-crimson"
              aria-label={`${s.code} detayi`}
            >
              <StandardCard s={s} />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-ink border border-crimson/30 p-10"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-cream/60 hover:text-crimson"
                aria-label="Kapat"
              >
                X
              </button>
              <div className="kicker mb-3">{active.code}</div>
              <h3 className="font-display text-3xl text-cream mb-5">{active.name}</h3>
              <p className="text-cream/70 leading-relaxed">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 60s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; transform: none; overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 3: Anasayfaya ekle**

Yaz (overwrite): `/Users/veliakcay/Documents/projeler/area-control-site/app/page.tsx`

```tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';
import ProcessHorizontal from '@/components/sections/ProcessHorizontal';
import StandardsMarquee from '@/components/sections/StandardsMarquee';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <ProcessHorizontal />
      <StandardsMarquee />
      <div className="min-h-[30vh]" />
    </>
  );
}
```

- [ ] **Step 4: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 5: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: process horizontal pinning and standards marquee"
```

---

## Task 9: Clients + VideoQuote + Faq

**Files:**
- Create: `components/sections/Clients.tsx`, `VideoQuote.tsx`, `Faq.tsx`, `public/media/hero-poster.svg`

- [ ] **Step 1: `Clients.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/Clients.tsx`

```tsx
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';

const PLACEHOLDER_CLIENTS = [
  { name: '5 Yildizli Sahil Resort', type: 'Otel' },
  { name: 'Butik Konsept Hotel', type: 'Otel' },
  { name: 'Zincir Restoran Grubu', type: 'F&B' },
  { name: 'All-Inclusive Resort', type: 'Otel' },
  { name: 'Sehir Oteli', type: 'Otel' },
  { name: 'Fine Dining', type: 'F&B' },
  { name: 'Catering Grubu', type: 'F&B' },
  { name: 'Kongre Hoteli', type: 'Otel' },
];

export default function Clients() {
  return (
    <section className="py-28 md:py-36 border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4"><Reveal><KickerLabel>{tr.clients.kicker}</KickerLabel></Reveal></div>
          <div className="md:col-span-8 space-y-4">
            <Reveal as="h2" className="display-lg text-cream">{tr.clients.title}</Reveal>
            <Reveal as="p" delay={0.1} className="text-cream/60 max-w-xl leading-relaxed">
              {tr.clients.intro}
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {PLACEHOLDER_CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.03}>
              <div className="bg-ink aspect-[4/3] flex flex-col items-center justify-center p-8 group hover:bg-burgundy/20 transition-colors">
                <div className="font-display text-cream/80 text-lg text-center leading-tight group-hover:text-crimson transition-colors">
                  {c.name}
                </div>
                <div className="mt-2 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-cream/30">
                  {c.type}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-cream/40 text-[0.75rem] font-mono tracking-[0.2em]">
          * Referans logolari musteri onayi sonrasi yayinlanacaktir.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Poster SVG olustur**

```bash
mkdir -p /Users/veliakcay/Documents/projeler/area-control-site/public/media
```

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/public/media/hero-poster.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="g" cx="30%" cy="40%" r="70%">
      <stop offset="0" stop-color="#A0141A" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#0A0A0A"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>
```

- [ ] **Step 3: `VideoQuote.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/VideoQuote.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import KickerLabel from '@/components/ui/KickerLabel';
import tr from '@/messages/tr.json';

export default function VideoQuote() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative border-t border-white/5 bg-black">
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-poster.svg"
        >
          <source src="/media/hero-video.webm" type="video/webm" />
          <source src="/media/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-20 max-w-5xl mx-auto">
          <Reveal><KickerLabel>{tr.video.kicker}</KickerLabel></Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 font-display italic text-2xl md:text-4xl lg:text-5xl text-cream leading-tight max-w-3xl">
            &ldquo;{tr.video.quote}&rdquo;
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `Faq.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/Faq.tsx`

```tsx
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/ui/Accordion';
import { faqs } from '@/content/faq';
import tr from '@/messages/tr.json';

export default function Faq() {
  return (
    <section className="py-28 md:py-36 border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal><KickerLabel>{tr.faq.kicker}</KickerLabel></Reveal>
        <Reveal as="h2" className="mt-5 display-lg text-cream mb-12">{tr.faq.title}</Reveal>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Anasayfaya ekle**

Yaz (overwrite): `/Users/veliakcay/Documents/projeler/area-control-site/app/page.tsx`

```tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';
import ProcessHorizontal from '@/components/sections/ProcessHorizontal';
import StandardsMarquee from '@/components/sections/StandardsMarquee';
import Clients from '@/components/sections/Clients';
import VideoQuote from '@/components/sections/VideoQuote';
import Faq from '@/components/sections/Faq';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <ProcessHorizontal />
      <StandardsMarquee />
      <Clients />
      <VideoQuote />
      <Faq />
      <div className="min-h-[30vh]" />
    </>
  );
}
```

- [ ] **Step 6: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

Not: Video src dosyalari yok — poster gosterilir, hata olmaz.

- [ ] **Step 7: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: clients grid, video quote and faq sections"
```

---

## Task 10: CtaFooter

**Files:**
- Create: `components/sections/CtaFooter.tsx`

- [ ] **Step 1: `CtaFooter.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/CtaFooter.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';
import { site } from '@/content/site';

export default function CtaFooter() {
  const title = tr.cta.title;
  const letters = title.split('');

  return (
    <section className="relative py-28 md:py-36 border-t border-white/5 bg-gradient-to-b from-ink to-black overflow-hidden">
      <div aria-hidden className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-crimson/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal><KickerLabel>{tr.cta.kicker}</KickerLabel></Reveal>

        <h2 className="mt-6 font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-cream">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 0.8, 0.36, 1] }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </h2>

        <Reveal as="p" className="mt-8 max-w-xl text-cream/65 leading-relaxed">
          {tr.cta.intro}
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 bg-white/[0.02] border border-white/5 hover:border-crimson/40 transition-colors"
          >
            <div className="kicker mb-4">WhatsApp</div>
            <div className="font-display text-2xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
            <div className="mt-2 text-cream/50 text-[0.85rem]">Hemen mesaj at</div>
          </a>

          <a
            href={`tel:${site.phoneE164}`}
            className="group relative p-8 bg-white/[0.02] border border-white/5 hover:border-crimson/40 transition-colors"
          >
            <div className="kicker mb-4">Telefon</div>
            <div className="font-display text-2xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
            <div className="mt-2 text-cream/50 text-[0.85rem]">Mesai saatlerinde</div>
          </a>

          <Link
            href="/iletisim"
            className="group relative p-8 bg-crimson/10 border border-crimson/40 hover:bg-crimson transition-colors"
          >
            <div className="kicker text-cream/80 mb-4">Form</div>
            <div className="font-display text-2xl text-cream">Teklif Formu</div>
            <div className="mt-2 text-cream/70 text-[0.85rem]">Kapsamli bilgi al</div>
            <span className="absolute top-8 right-8 text-cream">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Anasayfaya ekle**

Yaz (overwrite): `/Users/veliakcay/Documents/projeler/area-control-site/app/page.tsx`

```tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';
import ProcessHorizontal from '@/components/sections/ProcessHorizontal';
import StandardsMarquee from '@/components/sections/StandardsMarquee';
import Clients from '@/components/sections/Clients';
import VideoQuote from '@/components/sections/VideoQuote';
import Faq from '@/components/sections/Faq';
import CtaFooter from '@/components/sections/CtaFooter';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <ProcessHorizontal />
      <StandardsMarquee />
      <Clients />
      <VideoQuote />
      <Faq />
      <CtaFooter />
    </>
  );
}
```

- [ ] **Step 3: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 4: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: cta footer section with three contact cards"
```

---

## Task 11: Iletisim sayfasi + form

**Files:**
- Create: `app/iletisim/page.tsx`, `components/forms/ContactForm.tsx`

- [ ] **Step 1: `ContactForm.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/forms/ContactForm.tsx`

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(site.web3forms.endpoint, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('success');
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="Area Control - Yeni teklif talebi" />
      <input type="hidden" name="from_name" value="Area Control Web" />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field name="name" label={tr.cta.form.name} required />
        <Field name="company" label={tr.cta.form.company} />
        <Field name="phone" label={tr.cta.form.phone} type="tel" required />
        <Field name="email" label={tr.cta.form.email} type="email" required />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
          {tr.cta.form.service}
        </span>
        <select
          name="service"
          required
          defaultValue=""
          className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none"
        >
          <option value="" disabled>{tr.cta.form.servicePlaceholder}</option>
          <option value="sistem-belgelendirme">Sistem Belgelendirme</option>
          <option value="tedarikci-denetimi">Tedarikci Denetimi</option>
          <option value="hijyen-gida-su">Hijyen, Gida & Su Denetimi</option>
          <option value="diger">{tr.cta.form.serviceOther}</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
          {tr.cta.form.message}
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none resize-none"
        />
      </label>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-cream text-[0.75rem] uppercase tracking-[0.25em] font-medium hover:bg-blood transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? '...' : tr.cta.form.submit}
          <span aria-hidden>&rarr;</span>
        </button>
        {status === 'success' && (
          <p className="text-green-400 text-[0.85rem]">{tr.cta.form.success}</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-[0.85rem]">
            Gonderim basarisiz oldu. Lutfen telefon veya WhatsApp uzerinden ulasin.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ name, label, type = 'text', required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
        {label}{required && ' *'}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none"
      />
    </label>
  );
}
```

- [ ] **Step 2: `app/iletisim/page.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/iletisim/page.tsx`

```tsx
import type { Metadata } from 'next';
import KickerLabel from '@/components/ui/KickerLabel';
import ContactForm from '@/components/forms/ContactForm';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Iletisim',
  description: `${site.name} ile iletisim - teklif alin, bilgi icin bize ulasin.`,
};

export default function Iletisim() {
  const mapQuery = encodeURIComponent(`${site.address.line1} ${site.address.line2} ${site.address.city}`);
  return (
    <>
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-ink grain isolate">
        <div className="mx-auto max-w-7xl">
          <KickerLabel>08 &middot; Iletisim</KickerLabel>
          <h1 className="mt-6 display-xl text-cream max-w-4xl">
            Bir fincan kahve mesafesindeyiz.
          </h1>
          <p className="mt-6 text-cream/65 max-w-xl leading-relaxed">
            Antalya merkezli ekibimiz, Turkiye'nin her yerinden projeleri yurutuyor. Size uygun yontemle baslayalim.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-6 mb-20">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-white/5 hover:border-crimson transition-colors group"
          >
            <div className="kicker mb-4">WhatsApp</div>
            <div className="font-display text-3xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
          </a>
          <a
            href={`tel:${site.phoneE164}`}
            className="p-8 border border-white/5 hover:border-crimson transition-colors group"
          >
            <div className="kicker mb-4">Telefon</div>
            <div className="font-display text-3xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="p-8 border border-white/5 hover:border-crimson transition-colors group"
          >
            <div className="kicker mb-4">E-posta</div>
            <div className="font-display text-xl md:text-2xl text-cream group-hover:text-crimson transition-colors break-all">
              {site.email}
            </div>
          </a>
        </div>

        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="display-lg text-cream mb-8">Teklif formu</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="display-lg text-cream mb-8">Konum</h2>
            <div className="aspect-[4/3] border border-white/10 overflow-hidden">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=30.71%2C36.88%2C30.74%2C36.90&layer=mapnik&marker=36.889%2C30.725`}
                className="w-full h-full"
                loading="lazy"
                title="Area Control konum"
              />
            </div>
            <address className="not-italic mt-6 text-cream/65 leading-relaxed">
              <div className="font-display text-xl text-cream">{site.legalName}</div>
              <div className="mt-3">{site.address.line1}</div>
              <div>{site.address.line2}</div>
              <div>{site.address.city} / {site.address.country}</div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-crimson text-[0.75rem] tracking-[0.3em] uppercase hover:underline"
              >
                Haritada ac &rarr;
              </a>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 4: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: contact page with web3forms and osm map"
```

---

## Task 12: Hakkimizda sayfasi

**Files:**
- Create: `app/hakkimizda/page.tsx`

- [ ] **Step 1: Sayfa yaz**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/hakkimizda/page.tsx`

```tsx
import type { Metadata } from 'next';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hakkimizda',
  description: `${site.name}, Antalya merkezli bagimsiz bir belgelendirme ve denetim sirketidir.`,
};

const TIMELINE = [
  { year: '2009', text: 'SigmaCert belgelendirme altyapisi kurulur; kurucu ekip uluslararasi denetim deneyimiyle yola cikar.' },
  { year: '2018', text: 'Area Control Anonim Sirketi olarak Antalya\'da faaliyete baslar; otel ve restoran sektorune ozel odaklanma.' },
  { year: '2021', text: 'Hijyen ve laboratuvar analiz hizmetleri entegre edilir; saha ve laboratuvar tek ekipten.' },
  { year: '2024', text: 'TURKAK akreditasyon kapsami 16 standarda genisler; tedarikci denetim programi ayri bir disiplin olarak yapilandirilir.' },
];

const VALUES = [
  { title: 'Bagimsizlik', text: 'Denetcinin tek taahhudu standarda ve gercege. Ticari baskiyi denetim masasina sokmayiz.' },
  { title: 'Seffaflik', text: 'Kapsam, surec ve bulgular dokumante, dosyalanmis ve izlenebilir. Surpriz fatura veya karar yok.' },
  { title: 'Sureklilik', text: 'Belge bir an degil, yuruyen bir disiplindir. Yillik gozetim yapilandirilmis bir ortaklik olarak tasarlandi.' },
];

export default function Hakkimizda() {
  return (
    <>
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-ink grain isolate">
        <div className="mx-auto max-w-7xl">
          <KickerLabel>&mdash; Hakkimizda</KickerLabel>
          <h1 className="mt-6 display-xl text-cream max-w-4xl">
            Guven, <span className="italic text-crimson font-normal">editoryel</span> titizliktir.
          </h1>
          <p className="mt-8 max-w-2xl text-cream/65 leading-relaxed">
            Area Control, Antalya merkezli bagimsiz bir belgelendirme, gozetim ve teknik kontrol sirketidir. SigmaCert ortakligi uzerinden TURKAK akreditasyonuyla calisir; otel ve restoran operasyonlarinin kalitesini uluslararasi bir disipline baglar.
          </p>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-3 gap-6 md:gap-4">
          {site.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="p-8 border border-white/5 bg-white/[0.02]">
                <div className="font-display text-5xl md:text-6xl text-crimson leading-none">
                  <Counter to={m.value} />
                </div>
                <div className="mt-4 kicker">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Degerlerimiz</KickerLabel></Reveal></div>
          <div className="md:col-span-8 grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="bg-ink p-8 h-full">
                  <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-crimson/80">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-cream">{v.title}</h3>
                  <p className="mt-3 text-cream/60 text-[0.9rem] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Kronoloji</KickerLabel></Reveal></div>
          <div className="md:col-span-8 space-y-px bg-white/5 border border-white/5">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="bg-ink p-8 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 font-display text-3xl md:text-4xl text-crimson leading-none">
                    {t.year}
                  </div>
                  <p className="md:col-span-9 text-cream/65 leading-relaxed">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <KickerLabel>Ortaklik</KickerLabel>
          <h2 className="mt-5 display-lg text-cream max-w-3xl mx-auto">
            SigmaCert akreditasyonu, Area Control saha deneyimi.
          </h2>
          <p className="mt-8 text-cream/65 max-w-2xl mx-auto leading-relaxed">
            Sistem belgelendirme hizmetlerini, 2009'dan bu yana alaninda calisan SigmaCert'in TURKAK akreditasyonu altinda sunuyoruz. Helal belgelendirmede HAK kapsami gecerlidir. Bu yapi, hem uluslararasi taninirlik hem de yerel saha hizini ayni anda saglar.
          </p>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: hakkimizda page with timeline and values"
```

---

## Task 13: Hizmet detay sayfalari (3 adet, shared iskelet)

**Files:**
- Create: `components/sections/ServiceDetail.tsx`
- Create: `app/hizmetler/sistem-belgelendirme/page.tsx`, `app/hizmetler/tedarikci-denetimi/page.tsx`, `app/hizmetler/hijyen-gida-su/page.tsx`

- [ ] **Step 1: Shared template**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/components/sections/ServiceDetail.tsx`

```tsx
import Link from 'next/link';
import type { Service } from '@/content/services';
import { standards } from '@/content/standards';
import { processSteps } from '@/content/process';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export default function ServiceDetail({ service }: { service: Service }) {
  const related = standards.filter((s) => service.relatedStandards.includes(s.shortCode));

  return (
    <>
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-ink grain isolate">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 text-cream/50 text-[0.75rem] font-mono tracking-[0.25em] uppercase mb-6">
            <Link href="/" className="hover:text-cream">Anasayfa</Link>
            <span>/</span>
            <span className="text-crimson">Hizmetler</span>
          </div>
          <div className="flex items-start gap-8 flex-wrap">
            <div className="font-display text-[7rem] md:text-[10rem] leading-none text-crimson/30 select-none">
              {service.number}
            </div>
            <div className="flex-1 min-w-[280px]">
              <KickerLabel>{service.title}</KickerLabel>
              <h1 className="mt-5 display-xl text-cream max-w-3xl">{service.tagline}</h1>
              <p className="mt-8 max-w-2xl text-cream/65 leading-relaxed text-lg">
                {service.heroIntro}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/iletisim" variant="primary">Teklif Al <span aria-hidden>&rarr;</span></Button>
                <Button href="/#hizmetler" variant="outline">Diger Hizmetler</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Kapsam</KickerLabel></Reveal></div>
          <div className="md:col-span-8">
            <Reveal as="h2" className="display-lg text-cream mb-10">Hizmet icinde neler var?</Reveal>
            <ul className="space-y-6">
              {service.scope.map((item, i) => (
                <Reveal as="li" key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-5 border-b border-white/5 pb-5">
                    <span className="font-mono text-[0.75rem] text-crimson mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-cream/80 text-lg leading-relaxed">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/5 bg-gradient-to-b from-ink to-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Faydalar</KickerLabel></Reveal></div>
          <div className="md:col-span-8 grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {service.benefits.map((b, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-ink p-8 h-full">
                  <div className="font-display text-3xl text-crimson/60">0{i + 1}</div>
                  <p className="mt-4 text-cream/75 leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-28 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal><KickerLabel>Ilgili Standartlar</KickerLabel></Reveal>
            <Reveal as="h2" className="mt-5 display-lg text-cream mb-12">
              Bu hizmette one cikan sistem standartlari.
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {related.map((s) => (
                <div key={s.code} className="bg-ink p-6">
                  <div className="kicker mb-2">{s.code}</div>
                  <h3 className="font-display text-xl text-cream">{s.name}</h3>
                  <p className="mt-3 text-cream/60 text-[0.85rem] leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Surec</KickerLabel></Reveal></div>
          <div className="md:col-span-8 space-y-px bg-white/5 border border-white/5">
            {processSteps.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.08}>
                <div className="bg-ink p-8 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-2 font-display text-3xl text-crimson leading-none">
                    {p.number}
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-xl text-cream">{p.title}</h3>
                    <p className="mt-2 text-cream/60 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/5 bg-crimson/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="display-lg text-cream">
            Kapsaminiza ozel teklif icin <span className="italic text-crimson font-normal">buradayiz.</span>
          </h2>
          <p className="mt-6 text-cream/65 max-w-xl mx-auto leading-relaxed">
            Operasyonunuzu tanyalim, size uygun standartlari birlikte belirleyelim.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button href="/iletisim" variant="primary">Teklif Al <span aria-hidden>&rarr;</span></Button>
            <Button href="/" variant="outline">Anasayfa</Button>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Sistem Belgelendirme sayfasi**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/hizmetler/sistem-belgelendirme/page.tsx`

```tsx
import type { Metadata } from 'next';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { services } from '@/content/services';

const service = services.find((s) => s.slug === 'sistem-belgelendirme')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function Page() {
  return <ServiceDetail service={service} />;
}
```

- [ ] **Step 3: Tedarikci Denetimi sayfasi**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/hizmetler/tedarikci-denetimi/page.tsx`

```tsx
import type { Metadata } from 'next';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { services } from '@/content/services';

const service = services.find((s) => s.slug === 'tedarikci-denetimi')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function Page() {
  return <ServiceDetail service={service} />;
}
```

- [ ] **Step 4: Hijyen Gida Su sayfasi**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/hizmetler/hijyen-gida-su/page.tsx`

```tsx
import type { Metadata } from 'next';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { services } from '@/content/services';

const service = services.find((s) => s.slug === 'hijyen-gida-su')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function Page() {
  return <ServiceDetail service={service} />;
}
```

- [ ] **Step 5: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

- [ ] **Step 6: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: service detail pages with shared template"
```

---

## Task 14: 404 + sitemap + robots + favicon + OG

**Files:**
- Create: `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `public/favicon.svg`, `public/og.svg`

- [ ] **Step 1: `app/not-found.tsx`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/not-found.tsx`

```tsx
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 bg-ink grain isolate">
      <div className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-crimson mb-8">
        404 &middot; Kayip bolum
      </div>
      <h1 className="display-xl text-cream max-w-3xl">
        Bu sayfa <span className="italic text-crimson font-normal">kapsam disi.</span>
      </h1>
      <p className="mt-8 max-w-md text-cream/60 leading-relaxed">
        Aradiginiz sayfa tasinmis veya kaldirilmis olabilir. Anasayfadan devam edelim.
      </p>
      <div className="mt-10 flex gap-4 flex-wrap justify-center">
        <Button href="/" variant="primary">Anasayfa</Button>
        <Button href="/iletisim" variant="outline">Iletisim</Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `app/sitemap.ts`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { services } from '@/content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
  for (const s of services) {
    pages.push({
      url: `${base}/hizmetler/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }
  return pages;
}
```

- [ ] **Step 3: `app/robots.ts`**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/app/robots.ts`

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Favicon**

```bash
cp /Users/veliakcay/Documents/projeler/area-control-site/public/logo-dark-bg.svg /Users/veliakcay/Documents/projeler/area-control-site/public/favicon.svg
```

- [ ] **Step 5: OG Image (SVG)**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/public/og.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0A0A0A"/>
      <stop offset="0.5" stop-color="#440709"/>
      <stop offset="1" stop-color="#A0141A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="200" font-family="Playfair Display, serif" font-size="80" fill="#EBE2D3" font-weight="500">AREA CONTROL</text>
  <text x="80" y="270" font-family="Playfair Display, serif" font-size="48" fill="#EBE2D3" font-style="italic" font-weight="400">Guvenin kapsami,</text>
  <text x="80" y="325" font-family="Playfair Display, serif" font-size="48" fill="#EBE2D3" font-style="italic" font-weight="400">denetimle baslar.</text>
  <text x="80" y="550" font-family="monospace" font-size="22" fill="#EBE2D3" opacity="0.7">BELGELENDIRME &middot; GOZETIM &middot; KONTROL &middot; ANTALYA</text>
</svg>
```

- [ ] **Step 6: Build**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

Beklenen: `out/sitemap.xml`, `out/robots.txt`, `out/404.html` olusur.

- [ ] **Step 7: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "feat: 404, sitemap, robots, og image, favicon"
```

---

## Task 15: Smoke test + production preview + README

**Files:** `README.md`

- [ ] **Step 1: Dev server ile manuel test**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run dev
```

Tarayicida `http://localhost:3000` ac. Kontrol listesi:
- Anasayfa scroll boyunca hic console error yok
- Hero mask reveal animasyonu calisiyor
- About bolumunde metrikler count-up yapiyor
- Services 3 kart hover'da kirmizi gradient belirir
- Process bolumu desktop'ta horizontal pin calisiyor (mobilde dikey stack'e duser)
- Standards marquee akiyor, hover'da duruyor, tiklayinca modal acilyor
- Clients grid renderlaniyor
- VideoQuote bolumunde poster gozukuyor
- FAQ accordion acilip kapanyor
- CTA footer harf reveal calisiyor, WhatsApp/tel linkleri calisir
- `/hizmetler/sistem-belgelendirme`, `/tedarikci-denetimi`, `/hijyen-gida-su` erisilebilir
- `/hakkimizda` renderlanr
- `/iletisim` form alanlari gorunur; OSM iframe yuklenir
- Mobile view (DevTools device mode) duzgun
- `/yok-boyle-sayfa` → 404 sayfasi

Dev server'i durdur (Ctrl+C).

- [ ] **Step 2: Production preview test**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build && npx serve out -l 3001
```

`http://localhost:3001` ac, ayni smoke kontrollerini tekrarla.

- [ ] **Step 3: Prefers-reduced-motion testi**

DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Sayfayi yenile:
- Hero animasyonlari statik
- Marquee durmus
- Counter sayi direkt gorunuyor
- Reveal'ler direkt gorunuyor

- [ ] **Step 4: Lighthouse**

DevTools → Lighthouse → Mobile + tum kategoriler isaretle → Analyze.

Hedefler:
- Performance ≥ 85
- SEO ≥ 95
- Accessibility ≥ 90
- Best Practices ≥ 90

- [ ] **Step 5: Cross-browser smoke**

- Safari (macOS) — backdrop-blur, custom properties, Lenis
- Firefox — marquee, smooth scroll
- iOS Safari (gercek cihaz veya sim) — touch scroll, video autoplay

- [ ] **Step 6: README yaz**

Yaz: `/Users/veliakcay/Documents/projeler/area-control-site/README.md`

```markdown
# Area Control — Kurumsal Web Sitesi

Next.js 15 + Tailwind v4 + Framer Motion + GSAP ile gelistirilmis statik export site.

## Komutlar

- `npm install` — bagimliliklar
- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (`out/` klasorune export)
- `npm start` — build sonrasi prod preview
- `npm run lint` — ESLint

## Deploy

`out/` klasorunu herhangi bir static hosting'e (Vercel, Netlify, cPanel, S3) atin.

## Ortam Degiskenleri

`.env.local`:

    NEXT_PUBLIC_WEB3FORMS_KEY=your-key-from-web3forms.com

Web3Forms ucretsiz hesap: https://web3forms.com

## Icerik

Metinler `messages/tr.json` + `content/*.ts` altinda. Ingilizce eklemek icin `messages/en.json` olusturup ayni key yapisinda cevirileri yazin.

## Medya

`public/media/hero-video.mp4` + `.webm` — kullanici tarafindan eklenecek AI uretim loop. Dosyalar yoksa site poster SVG ile render edilir.
```

- [ ] **Step 7: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add -A
git commit -m "docs: readme with deploy and env instructions"
```

---

## Task 16 (Opsiyonel): Hero video uretimi

**Files:** `public/media/hero-video.mp4`, `.webm`, `hero-poster.jpg`

- [ ] **Step 1: Kullanici onayi iste**

Kullaniciya sor: "Hero video icin kieai (Veo) ile 8 saniyelik loop uretebilirim. Maliyet birkac $ ve uretim 1-3 dk surer. Onay veriyor musunuz?"

- [ ] **Step 2: Video uret**

Onay alindiysa `mcp__kieai__generate_veo_video` cagir:

```
prompt: "Slow cinematic horizontal pan, sterile white commercial kitchen, polished stainless steel counters and surfaces, a quality inspector in a crisp black shirt examining a tablet next to a buffet line, warm industrial overhead lighting, shallow depth of field, subtle film grain, cinematic color grading with deep blacks and rich warm highlights, 8 second seamless loop, editorial mood, no people face visible, photorealistic"
duration: 8
aspectRatio: "16:9"
```

Sonra `wait_for_video` ile tamamlanmayi bekle.

- [ ] **Step 3: Video'yu indir ve yerlestir**

```bash
curl -L "$VIDEO_URL" -o /Users/veliakcay/Documents/projeler/area-control-site/public/media/hero-video.mp4
```

Poster icin:
```bash
ffmpeg -i /Users/veliakcay/Documents/projeler/area-control-site/public/media/hero-video.mp4 -ss 00:00:02 -vframes 1 -q:v 2 /Users/veliakcay/Documents/projeler/area-control-site/public/media/hero-poster.jpg
```

(ffmpeg yoksa skip; mevcut svg poster kullanilir.)

- [ ] **Step 4: Build + smoke**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site && npm run build
```

Dev server'da VideoQuote bolumune scroll et — video oynamali.

- [ ] **Step 5: Commit**

```bash
cd /Users/veliakcay/Documents/projeler/area-control-site
git add public/media/
git commit -m "feat: hero background loop video"
```

---

## Self-Review

**1. Spec coverage:** Spec bolumu → task eslemesi:

- Section 2 Tech Stack → Task 1 (Next.js, deps), Task 2 (Tailwind), Task 3 (fontlar, i18n, content)
- Section 3 Marka Dili (palet, tipografi, logo) → Task 2 (tokens), Task 3 (fonts), Task 4 (logo/header)
- Section 4 Sitemap → Task 10 (anasayfa), Task 11 (iletisim), Task 12 (hakkimizda), Task 13 (3 hizmet sayfasi), Task 14 (404 + sitemap.xml)
- Section 5 Anasayfa Bolum Sirasi → Task 6 (Hero), Task 7 (About, Services), Task 8 (Process, Standards), Task 9 (Clients, Video, FAQ), Task 10 (CTA)
- Section 6 Scroll Animasyon → Task 5 (Reveal, Counter, Accordion), Task 6 (Hero mask), Task 7 (stagger), Task 8 (pinning, marquee), Task 10 (letter stagger)
- Section 7 Klasor Yapisi → tum task'lar dosya yolu olarak
- Section 8 Icerik Modeli → Task 3 (content/*.ts)
- Section 9 Iletisim Formu → Task 11 (ContactForm + Web3Forms)
- Section 10 Video → Task 9 (VideoQuote), Task 16 (opsiyonel uretim)
- Section 11 SEO → Task 4 (layout JSON-LD), Task 14 (sitemap, robots, metadata), Task 11/12/13 (per-page metadata)
- Section 12 Basari Kriterleri → Task 15 (smoke + Lighthouse)
- Section 13 Kapsam Disi → plan bu maddeleri icermiyor
- Section 14 Riskler → Task 8 (horizontal scroll desktop-only kontrolu), Task 9 (video placeholder fallback), Task 4 (header logo icin wordmark CSS text yaklasimi)
- Section 15 Implementasyon Sirasi → Task 1-15 siralamasiyla birebir ortusur

**Uncovered:** Yok.

**2. Placeholder scan:** Tum kod bloklari gercek kod; TBD/TODO yok.

**3. Type consistency:** `Service.slug` Task 3'te tanimli, Task 7/13'te tutarli kullanilior. `Standard.category` tipi Task 5 (StandardCard) ile Task 3 arasinda esleiyor. `site.web3forms.endpoint` Task 3'te tanimli, Task 11'de ayni sekilde kullaniliyor. `metrics` array Task 3 → Task 7/12. `Reveal.as` props Task 5'te `'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li'` tanimli, Task 13'te `as="li"` kullanimiyla uyumlu.

Tespit edilen sorun yok.

---
