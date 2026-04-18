'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { to: string; duration?: number; className?: string };

export default function Counter({ to, duration = 1400, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = to.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : NaN;
  const suffix = match ? match[2] : '';
  const [value, setValue] = useState<string>(Number.isNaN(numeric) ? to : '0');

  useEffect(() => {
    if (Number.isNaN(numeric) || !ref.current) return;
    const el = ref.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(`${numeric}${suffix}`);
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(`${Math.floor(numeric * eased)}${suffix}`);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, suffix, duration]);

  return <span ref={ref} className={className}>{value}</span>;
}
