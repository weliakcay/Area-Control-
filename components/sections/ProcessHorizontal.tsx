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
                    Adım {i + 1} / {processSteps.length}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-cream leading-tight mb-6">
                    {step.title}
                  </h3>
                  <p className="text-cream/75 leading-relaxed text-lg max-w-xl">
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
