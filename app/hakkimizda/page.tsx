import type { Metadata } from 'next';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: `${site.name}, Antalya merkezli bağımsız bir uygunluk değerlendirme ve denetim şirketidir.`,
};

const TIMELINE = [
  { year: '2009', text: 'Kurucu ekip, uluslararası denetim ve uygunluk değerlendirme deneyimiyle yola çıkar.' },
  { year: '2018', text: 'Area Control Anonim Şirketi olarak Antalya\'da faaliyete başlar; otel ve restoran sektörüne özel odaklanma.' },
  { year: '2021', text: 'Hijyen ve saha denetim programı dijital raporlama altyapısıyla entegre edilir; görsel kanıtlı puanlı denetim modeline geçilir.' },
  { year: '2024', text: 'Yönetim sistemi uygunluk değerlendirme kapsamı 18 standarda genişler; tedarikçi denetim programı ayrı bir disiplin olarak yapılandırılır.' },
];

const VALUES = [
  { title: 'Bağımsızlık', text: 'Denetçinin tek taahhüdü standarda ve gerçeğe. Ticari baskıyı denetim masasına sokmayız.' },
  { title: 'Şeffaflık', text: 'Kapsam, süreç ve bulgular dokümante, dosyalanmış ve izlenebilir. Sürpriz fatura veya karar yok.' },
  { title: 'Süreklilik', text: 'Belge bir an değil, yürüyen bir disiplindir. Yıllık gözetim yapılandırılmış bir ortaklık olarak tasarlandı.' },
];

const APPROACH = [
  {
    title: 'Saha Önceliği',
    text: 'Denetimlerimizde sadece evrak takibi yapmıyor, doğrudan sahadaki riske odaklanıyoruz. Hammadde girişinden sunum aşamasına kadar her temas noktasını yerinde inceliyor; teknik, etik ve çevresel uyumu sahada belgeliyoruz.',
  },
  {
    title: 'Tarafsız Uzman Bakışı',
    text: 'Tarafsız bir uzman bakışıyla "işletme körlüğünü" ortadan kaldırıyor; iç ekiplerin alıştığı için göremediği riskleri sizden önce tespit ediyoruz. Karmaşık standart süreçlerini rehberliğimizle sadeleştiriyoruz.',
  },
  {
    title: 'Ölçülebilir Disiplin',
    text: 'Geleneksel denetim anlayışını dijital altyapıyla birleştiriyoruz: görsel kanıtlı puanlı raporlama, kronikleşen uygunsuzlukların otomatik analizi, şubeler arası kıyaslama (benchmarking) ve dijital panelden anlık erişim.',
  },
];

export default function Hakkimizda() {
  return (
    <>
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-ink grain isolate">
        <div className="mx-auto max-w-7xl">
          <KickerLabel>— Hakkımızda</KickerLabel>
          <h1 className="mt-6 display-xl text-cream max-w-4xl">
            Güven, <span className="italic text-crimson font-normal">editoryel</span> titizliktir.
          </h1>
          <div className="mt-10 max-w-3xl space-y-6 text-cream/80 leading-relaxed">
            <p>
              Area Control Belgelendirme Gözetim ve Teknik Kontrol Hizmetleri A.Ş., Antalya merkezli bağımsız bir uygunluk değerlendirme, gözetim ve saha denetimi şirketidir. Otel, restoran, gıda hizmeti ve tedarik zinciri operasyonlarında kalite, hijyen, sürdürülebilirlik, müşteri memnuniyeti ve yönetim sistemi prensiplerine dayalı değerlendirme hizmetleri sunar.
            </p>
            <p>
              Yaklaşımımız; masa başı evrak kontrolünden öte, sahada doğrulanabilir kanıt, tarafsız uzman bakışı, ölçülebilir raporlama ve sürekli iyileştirme esaslarına dayanır. Denetimlerde yalnızca doküman varlığı değil; uygulamanın gerçek operasyon içindeki karşılığı değerlendirilir.
            </p>
            <p>
              Area Control, işletmelerin uluslararası standartlar, iyi uygulama prensipleri ve sektörel beklentiler doğrultusunda gelişim alanlarını belirlemelerine yardımcı olur. Tedarikçi denetimi, hijyen ve saha kontrolleri, sistem uygunluk değerlendirmeleri ve özel değerlendirme programlarıyla işletmelere bağımsız, izlenebilir ve raporlanabilir bir kontrol altyapısı sağlar. Sunulan uygunluk değerlendirme, gözetim, tedarikçi denetimi ve saha kontrol hizmetleri; işletmelerin operasyonel uygunluk, hijyen, sürdürülebilirlik, müşteri memnuniyeti ve yönetim sistemi prensipleri açısından değerlendirilmesini amaçlar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/5 bg-ink-soft">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex items-start gap-4 border-l-2 border-crimson/40 pl-5">
            <p className="text-cream/60 text-[0.92rem] leading-relaxed italic">
              Area Control, akredite yönetim sistemi belgelendirme kuruluşu olarak faaliyet gösterdiğini beyan etmez. Sunulan belgeler, ilgili hizmet kapsamına göre özel değerlendirme, saha denetimi, tedarikçi uygunluğu veya program bazlı uygunluk değerlendirme niteliğindedir.
            </p>
          </div>
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
          <div className="md:col-span-4"><Reveal><KickerLabel>Değerlerimiz</KickerLabel></Reveal></div>
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

      <section className="py-28 border-t border-white/5 bg-ink-soft">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal><KickerLabel>Yaklaşımımız</KickerLabel></Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 text-cream/55 leading-relaxed text-[0.92rem] max-w-xs">
              Üç hizmet, tek metodoloji. Saha, tarafsızlık ve ölçülebilirlik üzerine kurulu bir denetim disiplini.
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-px bg-white/5 border border-white/5">
            {APPROACH.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="bg-ink p-8 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-crimson/80">
                    0{i + 1} · Prensip
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl text-cream">{a.title}</h3>
                    <p className="mt-3 text-cream/75 leading-relaxed">{a.text}</p>
                  </div>
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
                  <p className="md:col-span-9 text-cream/75 leading-relaxed">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
