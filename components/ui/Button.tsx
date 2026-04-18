import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  'inline-flex items-center gap-2 px-5 py-3 text-[0.75rem] uppercase tracking-[0.25em] font-medium transition-all duration-300';

const styles: Record<Variant, string> = {
  primary: 'bg-crimson text-cream hover:bg-blood border border-crimson',
  outline: 'border border-cream/25 text-cream hover:border-crimson hover:text-crimson',
  ghost: 'text-cream/70 hover:text-crimson',
};

export default function Button({ href, onClick, variant = 'primary', children, external, className = '', ariaLabel }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
