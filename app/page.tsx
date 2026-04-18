import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';
import ProcessHorizontal from '@/components/sections/ProcessHorizontal';
import StandardsMarquee from '@/components/sections/StandardsMarquee';
import Clients from '@/components/sections/Clients';
import VideoQuote from '@/components/sections/VideoQuote';
import Faq from '@/components/sections/Faq';
import CtaFooter from '@/components/sections/CtaFooter';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <ProcessHorizontal />
      <StandardsMarquee />
      <Clients />
      <VideoQuote />
      <Faq />
      <CtaFooter />
    </>
  );
}
