import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { services } from '@/content/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
  for (const s of services) {
    pages.push({
      url: `${base}/hizmetler/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }
  return pages;
}
