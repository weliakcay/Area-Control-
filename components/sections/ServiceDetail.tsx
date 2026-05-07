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
              <p className="mt-8 max-w-2xl text-cream/75 leading-relaxed text-lg">
                {service.heroIntro}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/iletisim" variant="primary">Teklif Al <span aria-hidden>&rarr;</span></Button>
                <Button href="/#hizmetler" variant="outline">Diğer Hizmetler</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.scopeBlocks && service.scopeBlocks.length > 0 ? (
        service.scopeBlocks.map((block, blockIndex) => (
          <section
            key={block.title}
            className={`py-28 border-t border-white/5 ${blockIndex % 2 === 1 ? 'bg-ink-soft' : ''}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <Reveal>
                  <KickerLabel>{`Kapsam · 0${blockIndex + 1}`}</KickerLabel>
                </Reveal>
              </div>
              <div className="md:col-span-8">
                <Reveal as="h2" className="display-lg text-cream mb-6">
                  {block.title}
                </Reveal>
                {block.intro && (
                  <Reveal as="p" delay={0.05} className="text-cream/75 leading-relaxed mb-10 max-w-2xl">
                    {block.intro}
                  </Reveal>
                )}
                <ul className="space-y-6">
                  {block.items.map((item, i) => (
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
        ))
      ) : (
        <section className="py-28 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><Reveal><KickerLabel>Kapsam</KickerLabel></Reveal></div>
            <div className="md:col-span-8">
              <Reveal as="h2" className="display-lg text-cream mb-10">Hizmet içinde neler var?</Reveal>
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
      )}

      <section className="py-28 border-t border-white/5 bg-ink-soft">
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

      {service.pullQuote && (
        <section className="py-24 border-t border-white/5 bg-gradient-to-br from-burgundy/15 via-ink-soft to-ink-soft">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal>
              <div className="flex items-start gap-6">
                <span aria-hidden className="font-display text-7xl text-crimson/50 leading-none select-none">&ldquo;</span>
                <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-cream/95 leading-snug">
                  {service.pullQuote}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-28 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal><KickerLabel>İlgili Standartlar</KickerLabel></Reveal>
            <Reveal as="h2" className="mt-5 display-lg text-cream mb-12">
              Bu hizmette öne çıkan sistem standartları.
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {related.map((s) => (
                <div key={s.code} className="bg-ink p-6">
                  <div className="kicker mb-2">{s.code}</div>
                  <h3 className="font-display text-xl text-cream">{s.name}</h3>
                  <p className="mt-3 text-cream/60 text-[0.85rem] leading-relaxed">{s.pitch ?? s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><Reveal><KickerLabel>Süreç</KickerLabel></Reveal></div>
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
            Kapsamınıza özel teklif için <span className="italic text-crimson font-normal">buradayız.</span>
          </h2>
          <p className="mt-6 text-cream/75 max-w-xl mx-auto leading-relaxed">
            Operasyonunuzu tanıyalım, size uygun standartları birlikte belirleyelim.
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
