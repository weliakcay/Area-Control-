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
                  <div className="mt-3 font-mono text-[0.82rem] tracking-[0.25em] uppercase text-cream/50">
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
