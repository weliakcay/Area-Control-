'use client';

import type { ReactNode, CSSProperties } from 'react';
import { createElement } from 'react';

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
  as = 'div',
  className = '',
}: Props) {
  const style: CSSProperties = {
    animation: `ac-reveal 0.75s cubic-bezier(0.22, 0.8, 0.36, 1) ${delay}s both`,
  };

  return createElement(
    as,
    { className: `ac-reveal ${className}`.trim(), style },
    children
  );
}
