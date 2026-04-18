'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-ink/70 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label={site.name}>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-cream/95 p-1">
            <Image src="/logo.svg" alt={site.name} width={28} height={28} priority />
          </span>
          <span className="hidden sm:inline-flex flex-col leading-none">
            <span className="font-display text-[0.95rem] tracking-wide text-cream">
              AREA<span className="text-crimson">CONTROL</span>
            </span>
            <span className="text-[0.55rem] tracking-[0.25em] uppercase text-cream/45 font-mono mt-0.5">
              Belgelendirme · Gözetim · Kontrol
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[0.82rem] tracking-wide text-cream/75">
          <div className="relative group">
            <Link href="/#hizmetler" className="hover:text-cream transition-colors">
              {tr.nav.services}
            </Link>
            <div className="absolute left-0 top-full mt-4 w-72 bg-ink/95 backdrop-blur-md border border-white/5 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/hizmetler/sistem-belgelendirme" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">01</span>Sistem Belgelendirme
              </Link>
              <Link href="/hizmetler/tedarikci-denetimi" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">02</span>Tedarikçi Denetimi
              </Link>
              <Link href="/hizmetler/hijyen-gida-su" className="block py-2 px-2 text-cream/70 hover:text-crimson hover:bg-white/5 rounded-sm">
                <span className="font-mono text-[0.65rem] text-crimson/70 mr-2">03</span>Hijyen, Gıda &amp; Su
              </Link>
            </div>
          </div>
          <Link href="/hakkimizda" className="hover:text-cream transition-colors">{tr.nav.about}</Link>
          <Link href="/iletisim" className="hover:text-cream transition-colors">{tr.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-crimson/60 text-cream text-[0.75rem] tracking-[0.2em] uppercase hover:bg-crimson hover:border-crimson transition-colors"
          >
            {tr.nav.cta}
            <span aria-hidden>&rarr;</span>
          </Link>
          <button
            className="md:hidden text-cream/80 w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menü</span>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1h20M0 7h20M0 13h14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          <Link href="/hizmetler/sistem-belgelendirme" onClick={() => setMenuOpen(false)} className="text-cream/80">Sistem Belgelendirme</Link>
          <Link href="/hizmetler/tedarikci-denetimi" onClick={() => setMenuOpen(false)} className="text-cream/80">Tedarikçi Denetimi</Link>
          <Link href="/hizmetler/hijyen-gida-su" onClick={() => setMenuOpen(false)} className="text-cream/80">Hijyen, Gıda &amp; Su</Link>
          <Link href="/hakkimizda" onClick={() => setMenuOpen(false)} className="text-cream/80">{tr.nav.about}</Link>
          <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="text-cream/80">{tr.nav.contact}</Link>
          <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex justify-center items-center px-4 py-3 bg-crimson text-cream uppercase tracking-[0.2em] text-[0.75rem]">
            {tr.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
