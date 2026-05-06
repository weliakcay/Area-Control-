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
                  <p className="mt-4 text-cream/70 text-[0.9rem] leading-relaxed">
                    {s.tagline}
                  </p>
                  <p className="mt-3 text-cream/50 text-[0.82rem] leading-relaxed flex-1 border-l-2 border-crimson/40 pl-3">
                    {s.teaserBenefit}
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
