'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Item = { question: string; answer: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 border-t border-b border-white/5">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span className="font-display text-xl md:text-2xl text-cream group-hover:text-crimson transition-colors">
                {it.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45 border-crimson text-crimson' : 'text-cream/60'}`}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" /></svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.8, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pr-12 text-cream/75 leading-relaxed max-w-3xl">
                    {it.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
