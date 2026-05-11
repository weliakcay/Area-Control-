import type { Standard } from '@/content/standards';

const categoryColor: Record<Standard['category'], string> = {
  quality: 'from-crimson/20',
  environment: 'from-green-900/20',
  food: 'from-amber-900/20',
  safety: 'from-orange-900/20',
  info: 'from-blue-900/20',
  energy: 'from-yellow-900/20',
  supply: 'from-purple-900/20',
  medical: 'from-rose-900/20',
  social: 'from-teal-900/20',
  other: 'from-white/10',
};

export default function StandardCard({ s }: { s: Standard }) {
  return (
    <article
      className={`relative group w-72 shrink-0 h-56 rounded-sm bg-gradient-to-br ${categoryColor[s.category]} to-ink border border-white/5 p-6 flex flex-col justify-between overflow-hidden hover:border-crimson/40 transition-colors`}
    >
      <div>
        <div className="font-mono text-[0.78rem] tracking-[0.3em] uppercase text-crimson/80 mb-2">
          {s.code}
        </div>
        <h3 className="font-display text-xl text-cream leading-tight">
          {s.name}
        </h3>
      </div>
      <p className="text-cream/55 text-[0.9rem] leading-relaxed line-clamp-3">
        {s.description}
      </p>
      <div className="absolute -right-4 -bottom-6 font-display text-[7rem] leading-none text-white/[0.03] select-none">
        {s.shortCode}
      </div>
    </article>
  );
}
