'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li';
  className?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  className = '',
}: Props) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldReduce) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setVisible(true);
      return;
    }

    let triggered = false;
    const reveal = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);

    // Fallback: guarantee visibility within 1.5s in case the observer
    // is delayed (smooth-scroll libs, layout shifts, etc.)
    const fallback = window.setTimeout(reveal, 1500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [shouldReduce]);

  if (shouldReduce) {
    return createElement(as, { className }, children);
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.8, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
