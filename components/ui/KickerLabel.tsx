export default function KickerLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[0.82rem] tracking-[0.3em] uppercase text-crimson">
      <span className="w-8 h-px bg-crimson/60" aria-hidden />
      {children}
    </span>
  );
}
