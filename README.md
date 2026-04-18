# Area Control — Kurumsal Web Sitesi

Next.js 15 + Tailwind v4 + Framer Motion + GSAP ile geliştirilmiş statik export site.

## Komutlar

- `npm install` — bağımlılıklar
- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (`out/` klasörüne export)
- `npm start` — build sonrası prod preview
- `npm run lint` — ESLint

## Deploy

`out/` klasörünü herhangi bir static hosting'e (Vercel, Netlify, cPanel, S3) atın.

## Ortam Değişkenleri

`.env.local`:

    NEXT_PUBLIC_WEB3FORMS_KEY=your-key-from-web3forms.com

Web3Forms ücretsiz hesap: https://web3forms.com

## İçerik

Metinler `messages/tr.json` + `content/*.ts` altında. İngilizce eklemek için `messages/en.json` oluşturup aynı key yapısında çevirileri yazın.

## Medya

`public/media/hero-video.mp4` + `.webm` — kullanıcı tarafından eklenecek AI üretim loop. Dosyalar yoksa site poster SVG ile render edilir.
