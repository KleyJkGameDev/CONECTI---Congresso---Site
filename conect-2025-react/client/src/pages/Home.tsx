/**
 * PÁGINA: Home
 * 
 * Página principal do CONECT 2025 que integra todos os componentes:
 * - Navbar
 * - Hero
 * - About
 * - Schedule
 * - Registration
 * - FAQ
 * - Footer
 */

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Schedule from '@/components/Schedule';
import Registration from '@/components/Registration';
import Submission from '@/components/Submission';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />
      <Hero />
      <About />
      <Schedule />
      <Registration />
      <Submission />
      <FAQ />
      <Footer />
    </div>
  );
}
