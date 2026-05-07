import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function Footer() {
  return (
    <footer className="bg-ink-soft border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-cream p-1.5">
              <Image src="/logo.svg" alt={site.name} width={28} height={28} />
            </span>
            <span className="font-display text-cream text-lg">
              AREA<span className="text-crimson">CONTROL</span>
            </span>
          </div>
          <p className="text-cream/55 text-[0.82rem] leading-relaxed max-w-xs">
            {tr.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.servicesHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li><Link href="/hizmetler/sistem-belgelendirme" className="hover:text-crimson">Sistem Belgelendirme</Link></li>
            <li><Link href="/hizmetler/tedarikci-denetimi" className="hover:text-crimson">Tedarikçi Denetimi</Link></li>
            <li><Link href="/hizmetler/hijyen-denetimi" className="hover:text-crimson">Hijyen ve Saha Denetimi</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.companyHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li><Link href="/hakkimizda" className="hover:text-crimson">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-crimson">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">{tr.footer.contactHeading}</h4>
          <ul className="flex flex-col gap-2.5 text-cream/70 text-[0.85rem]">
            <li>
              <a href={`tel:${site.phoneE164}`} className="hover:text-crimson">{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-crimson">{site.email}</a>
            </li>
            <li className="text-cream/55 leading-relaxed">
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-cream/40 text-[0.75rem] font-mono">
          &copy; {new Date().getFullYear()} {site.legalName} &middot; {tr.footer.copyright}
        </p>
        <div className="flex items-center gap-4 text-cream/40 text-[0.7rem] font-mono">
          {site.accreditations.map((a) => (
            <span key={a.code} className="flex items-center gap-1">
              <span className="w-1 h-1 bg-crimson rounded-full" />
              {a.code}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
