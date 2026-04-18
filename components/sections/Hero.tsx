'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import tr from '@/messages/tr.json';
import Button from '@/components/ui/Button';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = tr.hero.titleBefore.split(' ')
    .concat([`__ITALIC__${tr.hero.titleItalic}`])
    .concat(tr.hero.titleAfter.trim().split(' '));

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-ink grain isolate pt-20 pb-16"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        aria-hidden
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(160,20,26,0.35),transparent_55%),radial-gradient(ellipse_at_78%_78%,rgba(68,7,9,0.6),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink" />
      </motion.div>

      <motion.div style={reduce ? undefined : { opacity }} className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-crimson mb-8 flex items-center gap-4"
        >
          <span className="w-10 h-px bg-crimson/60" aria-hidden />
          {tr.hero.kicker}
        </motion.div>

        <h1 className="display-xl text-cream max-w-5xl">
          {words.map((w, i) => {
            const isItalic = w.startsWith('__ITALIC__');
            const word = isItalic ? w.replace('__ITALIC__', '') : w;
            return (
              <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.06,
                    ease: [0.22, 0.8, 0.36, 1],
                  }}
                  className={`inline-block ${isItalic ? 'italic text-crimson font-normal' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 max-w-xl text-cream/70 leading-relaxed"
        >
          {tr.hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/iletisim" variant="primary">
            {tr.hero.ctaPrimary}
            <span aria-hidden>&rarr;</span>
          </Button>
          <Button href="/#hizmetler" variant="outline">
            {tr.hero.ctaSecondary}
          </Button>
        </motion.div>

        {!reduce && (
          <div
            aria-hidden
            className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-dashed border-crimson/40 items-center justify-center"
            style={{ animation: 'ac-spin 30s linear infinite' }}
          >
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
              <defs>
                <path id="hero-circ" d="M80,80 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0" />
              </defs>
              <text fill="rgba(235,226,211,0.55)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="4">
                <textPath href="#hero-circ">
                  TÜRKAK · HAK · ISO 9001 · ISO 22000 · BELGELENDİRME ·
                </textPath>
              </text>
            </svg>
            <span className="font-display italic text-crimson text-sm">since 2009</span>
          </div>
        )}

        <div className="absolute left-6 lg:left-10 bottom-8 flex items-center gap-3 text-cream/40 text-[0.7rem] font-mono tracking-[0.3em] uppercase">
          <span className="w-8 h-px bg-cream/40" aria-hidden />
          Scroll
        </div>
      </motion.div>

      <style>{`
        @keyframes ac-spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
