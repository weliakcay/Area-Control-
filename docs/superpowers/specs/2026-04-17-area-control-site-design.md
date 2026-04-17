# Area Control Kurumsal Web Sitesi — Tasarım Dokümanı

**Tarih:** 2026-04-17
**Durum:** Draft, user review bekleniyor
**Proje kökü:** `/Users/veliakcay/Documents/projeler/area-control-site/`

## 1. Özet

Area Control Belgelendirme Gözetim ve Teknik Kontrol Hizmetleri A.Ş. için 6 sayfalık, statik olarak export edilen, dark-editorial estetikte modern kurumsal web sitesi. Hedef kitle: Antalya ve çevresindeki otel + restoran işletmelerinin kalite/operasyon müdürleri ve satın alma departmanları. Sitenin tonu "sessiz lüks editoryel" — sıradan sertifikasyon sitelerinden ayrışmayı, logodaki koyu kırmızıyı marka üzerinden taşımayı ve güvenilir kurumsal hissi tipografi + scroll animasyon disipliniyle vermeyi hedefler.

SigmaCert'in sunduğu akreditasyon altında hizmetler otel/restoran müşterilerine iletilir. Üç ana hizmet:

1. Sistem Belgelendirme (ISO 9001, 14001, 22000, 45001, 27001, 50001, 10002, 22301, 28000, 31000, 13485, 20000-1, 27701, 14064-1, GMP, Helal)
2. Tedarikçi Denetimi
3. Hijyen, Gıda & Su Denetimi

## 2. Teknik Stack

- **Framework:** Next.js 15 + App Router, `output: 'export'` (statik export — `out/` klasörüne build)
- **Dil:** TypeScript strict
- **Styling:** Tailwind CSS v4 + CSS custom properties (tema değişkenleri)
- **Animasyon:** Framer Motion (component-level), GSAP + ScrollTrigger (pinning/scrub), Lenis (smooth scroll)
- **Fontlar:** `next/font` ile self-host — Playfair Display (display), Instrument Sans (body/UI), JetBrains Mono (teknik etiketler)
- **i18n:** `next-intl` altyapısı kurulu, şimdilik sadece `tr` locale aktif. Tüm metinler `messages/tr.json` + `content/*.ts` içinde
- **Form backend:** Web3Forms (3rd-party) — `info@bixkurumsal.com`'a POST; yanı sıra WhatsApp ve `tel:` CTA
- **SEO:** Per-route metadata, JSON-LD Organization + LocalBusiness, sitemap.xml, robots.txt, Open Graph image
- **Deploy:** Statik `out/` klasörü; Vercel / Netlify / cPanel uyumlu

## 3. Marka Dili

### 3.1 Konsept

"Dark Editorial" — koyu arkaplan, yüksek kontrast serif başlıklar, film grain dokusu, numaralı bölümler (01/02/03), gazete/editoryel kompozisyon. Ton: *"Denetlemek eğitimli bir iştir; güven editöryel titizliktir."*

### 3.2 Renk Paleti

- **Ink (base):** `#0A0A0A`
- **Burgundy derin:** `#440709`
- **Blood:** `#7A0F14`
- **Crimson (vurgu):** `#A0141A`
- **Cream (aydınlık kesimler):** `#EBE2D3`
- **Gold nötr (badge/aksan):** `#B8956A`
- **Kırmızı gradyanlar:** `linear-gradient(135deg, #440709 → #A0141A)` veya radyal hero içinde

### 3.3 Tipografi

- **Display:** Playfair Display (ağırlık 400-500, yüksek-kontrast klasik editoryel serif; italik aksanlı başlık vurgusu için 400 italic kullanılır)
- **Body + UI:** Instrument Sans (regular, medium)
- **Mono:** JetBrains Mono (küçük kicker/sertifika kodu)
- **Ölçek:** H1 40-64px, H2 32-48px, H3 20-28px, Body 14-16px, Label/Kicker 10-12px letter-spacing 3px uppercase

### 3.4 Logo

Kullanıcı tarafından `logo.svg` olarak sağlanan (içinde embedded PNG barındıran SVG kabuk, şeffaf arkaplan). Koyu zemin üstünde görünür; wordmark'ın siyah "AREA" kısmı koyu arkaplanda gözükmeyeceği için header'da beyaz wordmark varyantı gerekir. İki varyant üretilecek:

- `public/logo.svg` — orijinal, aydınlık/beyaz zemin için
- `public/logo-dark-bg.svg` — koyu zemin için wordmark beyaza çevrilmiş varyant (CSS filter ile runtime veya SVG kopyası editleyerek)

## 4. Sitemap

| Route | Sayfa | İçerik |
|---|---|---|
| `/` | Anasayfa | 9 scroll bölümlü tek sayfa |
| `/hizmetler/sistem-belgelendirme` | Sistem Belgelendirme detay | Kapsam + ISO liste + süreç + CTA |
| `/hizmetler/tedarikci-denetimi` | Tedarikçi Denetimi detay | Aynı iskelet, tedarikçi içeriği |
| `/hizmetler/hijyen-gida-su` | Hijyen Gıda Su detay | Hijyen + gıda analizi + su + pestisit + helal |
| `/hakkimizda` | Hakkımızda | Manifesto + akreditasyon + SigmaCert partnership + timeline |
| `/iletisim` | İletişim | WhatsApp/tel CTA + form + harita |
| `/404` | Not found | Editoryel minimal |

## 5. Anasayfa Bölüm Sırası (Scroll)

- **00 · Hero** — Başlık mask reveal + dönen rozet + grain doku + arka plan parallax
- **01 · Biz kimiz** — Manifesto + count-up metrikler (150+ / 18 / TÜRKAK)
- **02 · Hizmetler (3 kart)** — Hover'da kart genişleyen kırmızı gradient
- **03 · Süreç (4 adım)** — Desktop: GSAP horizontal scroll pinning; mobile: dikey stack
- **04 · Standart kütüphanesi** — Yatay marquee (pause on hover), kart tıklanınca modal
- **05 · Referanslar** — Placeholder grid (grayscale → renkli hover)
- **06 · Video loop** — Scroll viewport'a girince play/pause
- **07 · SSS** — Accordion, 1 açık kural
- **08 · CTA footer** — Gigant serif başlık + form önizleme + WhatsApp/tel/email

## 6. Scroll Animasyon Detayları

### Teknik yaklaşım

- Lenis tüm sayfada smooth-scroll sağlar (`react-lenis` provider)
- GSAP ScrollTrigger pinning + scrub gereken yerlerde (03 Süreç)
- Framer Motion `whileInView` + `viewport` basit enter-animasyonları için
- Reveal wrapper component (`components/ui/Reveal.tsx`) — clip-path mask reveal primitive
- Counter component — `IntersectionObserver` + `requestAnimationFrame` count-up

### Bölüm-bazlı

| Bölüm | Tetik | Detay |
|---|---|---|
| Hero | mount | Kelime mask reveal 60ms stagger, arkaplan parallax, grain loop |
| About | viewport %30 | Metrikler count-up, metin soldan slide+fade 120ms stagger |
| Services | viewport %30 | Kart altdan yükselir, hover genişleyen gradient |
| Process | pin + scrub | Yatay 4 adım, dikey scroll scrub ile, ilerleme çizgisi kırmızı dolar |
| Standards | viewport | Marquee auto-scroll, hover pause |
| Clients | viewport | Grid stagger, grayscale → renkli hover |
| Video | viewport | play/pause, overlay + italic alıntı |
| FAQ | click | Accordion height transition, ikon rotate |
| CTA | viewport | Başlık harf harf stagger reveal |

### Erişilebilirlik

- `prefers-reduced-motion`: tüm animasyonlar `transition: none`, video `autoplay` kaldırılır, marquee durur
- Keyboard focus state'leri görünür (`outline: 2px solid var(--crimson)`)
- ARIA etiketleri form alanlarında ve accordion'da
- Skip-to-content linki

### Performans hedefleri

- Lighthouse: Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices ≥ 90
- LCP hedefi ≤ 2.5s (hero görsel/video preload edilir)
- Fontlar self-host (3 font ailesi, toplam ~3-4 woff2 dosya)
- Görseller `next/image` + AVIF/WebP, lazy-load
- Hero video `preload="metadata"`, MP4 + WebM fallback, mobilde düşük bitrate varyant

## 7. Proje Klasör Yapısı

```
/Users/veliakcay/Documents/projeler/area-control-site/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ hizmetler/
│  │  ├─ sistem-belgelendirme/page.tsx
│  │  ├─ tedarikci-denetimi/page.tsx
│  │  └─ hijyen-gida-su/page.tsx
│  ├─ hakkimizda/page.tsx
│  ├─ iletisim/page.tsx
│  ├─ not-found.tsx
│  └─ globals.css
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ LenisProvider.tsx
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ ServicesTriple.tsx
│  │  ├─ ProcessHorizontal.tsx
│  │  ├─ StandardsMarquee.tsx
│  │  ├─ Clients.tsx
│  │  ├─ VideoQuote.tsx
│  │  ├─ Faq.tsx
│  │  └─ CtaFooter.tsx
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ KickerLabel.tsx
│  │  ├─ Counter.tsx
│  │  ├─ Reveal.tsx
│  │  └─ StandardCard.tsx
│  └─ forms/
│     └─ ContactForm.tsx
├─ content/
│  ├─ standards.ts
│  ├─ services.ts
│  ├─ process.ts
│  ├─ faq.ts
│  └─ site.ts
├─ lib/
│  ├─ animations.ts
│  └─ i18n.ts
├─ messages/
│  └─ tr.json
├─ public/
│  ├─ logo.svg
│  ├─ logo-dark-bg.svg
│  ├─ og.jpg
│  ├─ favicon.ico
│  └─ media/
│     ├─ hero-video.mp4
│     ├─ hero-video.webm
│     └─ hero-poster.jpg
├─ docs/superpowers/
│  ├─ specs/
│  └─ plans/
├─ next.config.mjs
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ package.json
├─ .gitignore
└─ README.md
```

## 8. İçerik Modeli

### 8.1 Standart kütüphanesi (`content/standards.ts`)

```ts
export type Standard = {
  code: string;           // "ISO 9001:2015"
  shortCode: string;      // "9001"
  name: string;           // "Kalite Yönetim Sistemi"
  description: string;    // 1-2 cümle TR
  category: 'quality' | 'environment' | 'food' | 'safety' | 'info' | 'energy' | 'other';
};
```

16 standart liste: ISO 9001:2015, 14001:2015, 22000:2018, 45001:2018, 50001:2018, 27001:2022, 10002:2018, 13485:2016, 20000-1:2011, 22301:2019, 31000:2018, 28000:2007, 27701:2019, 14064-1, GMP, Helal Belgelendirme.

### 8.2 Hizmetler (`content/services.ts`)

```ts
export type Service = {
  slug: 'sistem-belgelendirme' | 'tedarikci-denetimi' | 'hijyen-gida-su';
  number: '01' | '02' | '03';
  title: string;
  tagline: string;
  description: string;
  scope: string[];        // Madde madde kapsam
  benefits: string[];
  process: ProcessStep[];
  faqs: Faq[];            // Hizmete özel SSS
};
```

### 8.3 Site sabitleri (`content/site.ts`)

```ts
export const site = {
  name: 'Area Control',
  legalName: 'Area Control Belgelendirme Gözetim ve Teknik Kontrol Hizmetleri A.Ş.',
  address: {
    line1: 'Zerdalilik Mah. 1380 Sok.',
    line2: 'Gülgün Apt. Sitesi No:8/6',
    city: 'Antalya',
    country: 'Türkiye',
  },
  phone: '+90 537 267 0972',
  phoneDisplay: '0537 267 0972',
  whatsapp: '905372670972',
  email: 'info@bixkurumsal.com',
  accreditations: ['TÜRKAK (via SigmaCert)', 'HAK'],
};
```

## 9. İletişim Formu

- Web3Forms public access key hidden input olarak form HTML'ine gömülür (Web3Forms tasarımı gereği key zaten publictir ve yalnızca hedef e-postayı belirlemek için kullanılır; bu yaklaşım static export ile tam uyumludur). Key değeri `content/site.ts` sabitlerinde veya `NEXT_PUBLIC_WEB3FORMS_KEY` env değişkeninde tutulabilir
- Form `https://api.web3forms.com/submit` endpoint'ine `method="POST"` ile native HTML submit (JS gerekmez); key rotation için sadece sabit değişir
- Alan: ad, kurum, telefon, e-posta, hizmet (dropdown: Sistem / Tedarikçi / Hijyen-Gıda-Su / Diğer), mesaj
- Validation: native HTML5 `required` + pattern, client-side minimal JS
- Başarılı gönderimde `?success=true` query ile aynı sayfaya redirect, teşekkür banner göster
- WhatsApp CTA: `https://wa.me/905372670972?text=Merhaba%2C+bilgi+almak+istiyorum`
- `tel:` CTA: `tel:+905372670972`

## 10. Video Stratejisi

Hero için **bir** AI üretim loop (kieai / Veo) — 8-12 saniye, portre veya yatay — ama Dark Editorial hero'da zaten metin-ağır tasarım olduğundan video opsiyonel. Prompt taslağı:

> "Slow cinematic pan, sterile white commercial kitchen, an inspector with tablet reviewing stainless steel counters, warm industrial lighting, shallow depth of field, subtle film grain, 8 seconds loop, no people face visible, editorial mood"

Alternatif: 06 Video Quote bölümü için ayrı loop ("pristine water surface with pipette"). Video üretimi proje build'ini durdurmaz — poster jpg placeholder ile başlanır, kieai sonucu hazır olunca `public/media/` içine dropped + component'de swap. Yapımcı kullanıcı onayı gerekir.

## 11. SEO

- `app/layout.tsx` default metadata: title template, description, keywords, OG
- Her sayfa kendi `export const metadata` ile over-ride eder
- JSON-LD: root'ta Organization + LocalBusiness (address, phone, geo opsiyonel); hizmet sayfalarında Service schema
- `app/sitemap.ts` + `app/robots.ts` — Next.js file-based, static export uyumlu
- `public/og.jpg` 1200x630, Dark Editorial hero kompozisyonu
- Anahtar arama hedefleri: "Antalya ISO 22000 belgelendirme", "otel hijyen denetimi", "restoran tedarikçi denetimi Antalya", "ISO 9001 Antalya"

## 12. Başarı Kriterleri

- Build `npm run build` hatasız tamamlanır, `out/` üretilir
- 6 sayfa + 404 erişilebilir, linkler çalışır
- Lighthouse local test (mobile preset): Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 90, Best Practices ≥ 90
- Desktop Chrome/Safari/Firefox + iOS Safari + Android Chrome smoke test
- `prefers-reduced-motion` aktifken animasyonlar durur
- Form gönderimi Web3Forms'a başarıyla iletilir (test submit'le doğrulanır)
- Logo her iki arkaplan (koyu/aydınlık) üstünde okunabilir
- İletişim bilgileri (adres, telefon, email) tüm footer + iletişim sayfasında tutarlı

## 13. Kapsam Dışı (YAGNI)

- Blog / haber / içerik CMS — sonra eklenebilir (headless CMS veya MDX)
- Kullanıcı girişi, üyelik, dashboard
- Gerçek Google Maps embed (API key gerekir); OpenStreetMap iframe veya statik harita görseli kullanılacak
- Canlı chat widget
- EN dil içeriği (altyapı kurulu, çeviri dosyası boş başlayacak; ileride `messages/en.json` eklenir)
- Admin paneli, içerik editörü
- Analytics (Plausible / GA4) — ileride opsiyonel

## 14. Riskler ve Notlar

- **Horizontal scroll pinning** mobil'de problematik olabilir; `window.matchMedia('(min-width: 1024px)')` kontrolü ile sadece desktop'ta aktif, mobile fallback dikey stack
- **AI video** üretimi süresi değişken (Veo: 1-3 dk). Build dependency'si olmamalı — placeholder poster ile başlanır
- **Logo** embedded-raster SVG; çok büyük ölçekte pixellenebilir. Header ve footer'da max-width 180px önerilir
- **Web3Forms free tier** 250 gönderim/ay sınırı; daha fazla trafik gelirse paid tier veya Formspree alternatif
- **Trailing-space klasör** (`area control /`) orijinal logo kaynağı; proje `area-control-site/` altında temiz path'te kurulur, orijinal dosyalar buraya kopyalanır

## 15. İmplementasyon Sırası (üst düzey)

1. Proje iskeleti (Next.js 15, Tailwind, TS, Lenis/GSAP/Framer, next-intl, fontlar)
2. Logo varyantları + temel layout (Header/Footer/LenisProvider)
3. Content dosyaları (standards, services, site, faq, process)
4. UI primitives (Button, KickerLabel, Counter, Reveal, StandardCard)
5. Anasayfa bölümleri (00 → 08)
6. Hizmet detay sayfaları (3 adet, shared template)
7. Hakkımızda ve İletişim sayfaları
8. 404 + sitemap + robots + JSON-LD + OG image
9. Erişilebilirlik ve `prefers-reduced-motion` testi
10. Cross-browser smoke test + Lighthouse
11. (Opsiyonel) kieai video üretimi + entegrasyonu

Detaylı implementasyon planı brainstorming sonrası `writing-plans` ile ayrı dokümanda yazılacaktır.
