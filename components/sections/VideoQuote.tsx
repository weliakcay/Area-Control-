'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import KickerLabel from '@/components/ui/KickerLabel';
import tr from '@/messages/tr.json';

export default function VideoQuote() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative border-t border-white/5 bg-black">
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-poster.svg"
        >
          <source src="/media/hero-video.webm" type="video/webm" />
          <source src="/media/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-20 max-w-5xl mx-auto">
          <Reveal><KickerLabel>{tr.video.kicker}</KickerLabel></Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 font-display italic text-2xl md:text-4xl lg:text-5xl text-cream leading-tight max-w-3xl">
            &ldquo;{tr.video.quote}&rdquo;
          </Reveal>
        </div>
      </div>
    </section>
  );
}
