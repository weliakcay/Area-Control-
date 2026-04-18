import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';
import ProcessHorizontal from '@/components/sections/ProcessHorizontal';
import StandardsMarquee from '@/components/sections/StandardsMarquee';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <ProcessHorizontal />
      <StandardsMarquee />
      <div className="min-h-[30vh]" />
    </>
  );
}
