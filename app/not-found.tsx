import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 bg-ink grain isolate">
      <div className="font-mono text-[0.82rem] tracking-[0.3em] uppercase text-crimson mb-8">
        404 &middot; Kayıp bölüm
      </div>
      <h1 className="display-xl text-cream max-w-3xl">
        Bu sayfa <span className="italic text-crimson font-normal">kapsam dışı.</span>
      </h1>
      <p className="mt-8 max-w-md text-cream/60 leading-relaxed">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Anasayfadan devam edelim.
      </p>
      <div className="mt-10 flex gap-4 flex-wrap justify-center">
        <Button href="/" variant="primary">Anasayfa</Button>
        <Button href="/iletisim" variant="outline">İletişim</Button>
      </div>
    </section>
  );
}
