import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';

const PLACEHOLDER_CLIENTS = [
  { name: '5 Yıldızlı Sahil Resort', type: 'Otel' },
  { name: 'Butik Konsept Hotel', type: 'Otel' },
  { name: 'Zincir Restoran Grubu', type: 'F&B' },
  { name: 'All-Inclusive Resort', type: 'Otel' },
  { name: 'Şehir Oteli', type: 'Otel' },
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
                <div className="mt-2 font-mono text-[0.78rem] tracking-[0.3em] uppercase text-cream/30">
                  {c.type}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-cream/40 text-[0.85rem] font-mono tracking-[0.2em]">
          * Referans logoları müşteri onayı sonrası yayınlanacaktır.
        </p>
      </div>
    </section>
  );
}
