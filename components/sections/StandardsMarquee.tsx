'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KickerLabel from '@/components/ui/KickerLabel';
import StandardCard from '@/components/ui/StandardCard';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';
import { standards, type Standard } from '@/content/standards';

export default function StandardsMarquee() {
  const [active, setActive] = useState<Standard | null>(null);
  const looped = [...standards, ...standards];

  return (
    <section id="standartlar" className="relative py-28 md:py-36 border-t border-white/5 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal><KickerLabel>{tr.standards.kicker}</KickerLabel></Reveal>
          </div>
          <div className="md:col-span-8 space-y-4">
            <Reveal as="h2" className="display-lg text-cream">{tr.standards.title}</Reveal>
            <Reveal as="p" delay={0.1} className="text-cream/75 max-w-xl leading-relaxed">
              {tr.standards.intro}
            </Reveal>
          </div>
        </div>
      </div>

      <div className="group relative">
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] will-change-transform">
          {looped.map((s, i) => (
            <button
              key={`${s.code}-${i}`}
              onClick={() => setActive(s)}
              className="text-left focus:outline-none focus-visible:outline-crimson"
              aria-label={`${s.code} detayı`}
            >
              <StandardCard s={s} />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-ink border border-crimson/30 p-10"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-cream/60 hover:text-crimson"
                aria-label="Kapat"
              >
                ×
              </button>
              <div className="kicker mb-3">{active.code}</div>
              <h3 className="font-display text-3xl text-cream mb-5">{active.name}</h3>
              <p className="text-cream/70 leading-relaxed">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 60s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; transform: none; overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
