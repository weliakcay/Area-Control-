import Script from 'next/script';

type Props = { id: string; data: Record<string, unknown> };

export default function JsonLd({ id, data }: Props) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {json}
    </Script>
  );
}
