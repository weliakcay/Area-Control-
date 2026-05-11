import type { Metadata } from 'next';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/forms/ContactForm';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'İletişim',
  description: `${site.name} ile iletişim — teklif alın, bilgi için bize ulaşın.`,
};

const NEXT_STEPS = [
  {
    title: '24 saat içinde dönüş',
    text: 'Talebinizi aldıktan sonra bir iş günü içinde ekibimizden size yazılı geri dönüş yapılır.',
  },
  {
    title: 'Ücretsiz kapsam görüşmesi',
    text: 'Operasyonunuzu birlikte inceleriz; hedef standardı, kapsamı ve takvimi netleştiririz.',
  },
  {
    title: 'Şeffaf yazılı teklif',
    text: 'Sürpriz kalem yok. Kapsam, süre, fiyat ve raporlama biçimi yazılı olarak iletilir.',
  },
];

export default function Iletisim() {
  const mapQuery = encodeURIComponent(`${site.address.line1} ${site.address.line2} ${site.address.city}`);
  return (
    <>
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-ink grain isolate">
        <div className="mx-auto max-w-7xl">
          <KickerLabel>08 · İletişim</KickerLabel>
          <h1 className="mt-6 display-xl text-cream max-w-4xl">
            Bir fincan kahve mesafesindeyiz.
          </h1>
          <p className="mt-6 text-cream/75 max-w-xl leading-relaxed">
            Antalya merkezli ekibimiz, Türkiye&rsquo;nin her yerinden projeleri yürütüyor. Size uygun yöntemle başlayalım.
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

        <div className="mx-auto max-w-7xl mb-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <KickerLabel>Süreç nasıl başlar?</KickerLabel>
            <p className="mt-5 text-cream/55 leading-relaxed text-[1.02rem] max-w-xs">
              Form sonrası takvim sizin elinizde — kapsamı şeffaf bir görüşmeyle birlikte belirleriz.
            </p>
          </div>
          <div className="md:col-span-8 grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {NEXT_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="bg-ink p-7 h-full">
                  <div className="font-mono text-[0.78rem] tracking-[0.3em] uppercase text-crimson/80 mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-xl text-cream">{step.title}</h3>
                  <p className="mt-3 text-cream/60 text-[0.98rem] leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.71%2C36.88%2C30.74%2C36.90&layer=mapnik&marker=36.889%2C30.725"
                className="w-full h-full"
                loading="lazy"
                title="Area Control konum"
              />
            </div>
            <address className="not-italic mt-6 text-cream/75 leading-relaxed">
              <div className="font-display text-xl text-cream">{site.legalName}</div>
              <div className="mt-3">{site.address.line1}</div>
              <div>{site.address.line2}</div>
              <div>{site.address.city} / {site.address.country}</div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-crimson text-[0.85rem] tracking-[0.3em] uppercase hover:underline"
              >
                Haritada aç &rarr;
              </a>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
