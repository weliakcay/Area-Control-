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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/media/hero-poster.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_28%,rgba(184,149,106,0.28),transparent_60%),radial-gradient(ellipse_at_78%_82%,rgba(160,20,26,0.32),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/70" />
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

      </motion.div>
    </section>
  );
}
