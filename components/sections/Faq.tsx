import KickerLabel from '@/components/ui/KickerLabel';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/ui/Accordion';
import { faqs } from '@/content/faq';
import tr from '@/messages/tr.json';

export default function Faq() {
  return (
    <section className="py-28 md:py-36 border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal><KickerLabel>{tr.faq.kicker}</KickerLabel></Reveal>
        <Reveal as="h2" className="mt-5 display-lg text-cream mb-12">{tr.faq.title}</Reveal>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
