'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createElement } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li';
  className?: string;
  once?: boolean;
};

export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '', once = true }: Props) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return createElement(as, { className }, children);
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.8, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
