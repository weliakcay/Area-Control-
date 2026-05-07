'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import tr from '@/messages/tr.json';
import { site } from '@/content/site';

export default function CtaFooter() {
  const title = tr.cta.title;
  const letters = title.split('');

  return (
    <section className="relative py-28 md:py-36 border-t border-white/5 bg-ink-soft overflow-hidden">
      <div aria-hidden className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-crimson/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal><KickerLabel>{tr.cta.kicker}</KickerLabel></Reveal>

        <h2 className="mt-6 font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-cream">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 0.8, 0.36, 1] }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </h2>

        <Reveal as="p" className="mt-8 max-w-xl text-cream/75 leading-relaxed">
          {tr.cta.intro}
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 bg-white/[0.02] border border-white/5 hover:border-crimson/40 transition-colors"
          >
            <div className="kicker mb-4">WhatsApp</div>
            <div className="font-display text-2xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
            <div className="mt-2 text-cream/50 text-[0.85rem]">Hemen mesaj at</div>
          </a>

          <a
            href={`tel:${site.phoneE164}`}
            className="group relative p-8 bg-white/[0.02] border border-white/5 hover:border-crimson/40 transition-colors"
          >
            <div className="kicker mb-4">Telefon</div>
            <div className="font-display text-2xl text-cream group-hover:text-crimson transition-colors">
              {site.phoneDisplay}
            </div>
            <div className="mt-2 text-cream/50 text-[0.85rem]">Mesai saatlerinde</div>
          </a>

          <Link
            href="/iletisim"
            className="group relative p-8 bg-crimson/10 border border-crimson/40 hover:bg-crimson transition-colors"
          >
            <div className="kicker text-cream/80 mb-4">Form</div>
            <div className="font-display text-2xl text-cream">Teklif Formu</div>
            <div className="mt-2 text-cream/70 text-[0.85rem]">Kapsamlı bilgi al</div>
            <span className="absolute top-8 right-8 text-cream">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
