import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesTriple from '@/components/sections/ServicesTriple';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesTriple />
      <div className="min-h-[30vh]" />
    </>
  );
}
