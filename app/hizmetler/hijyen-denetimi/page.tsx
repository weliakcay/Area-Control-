import type { Metadata } from 'next';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { services } from '@/content/services';

const service = services.find((s) => s.slug === 'hijyen-denetimi')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function Page() {
  return <ServiceDetail service={service} />;
}
