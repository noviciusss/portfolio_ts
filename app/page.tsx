import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Education from './components/Education';
import CodingStats from './components/CodingStats';
import Approach from './components/Approach';
import FloatingResumeButton from './components/FloatingResumeButton';
// ModernBackground is already in layout.tsx, no need to import here unless used differently
import { FaArrowUp } from 'react-icons/fa';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      {/* ModernBackground is in layout.tsx, so it's already active */}
      <Navbar />
      {/* Ensure 'main' does not have an opaque background class */}
      <main className="overflow-hidden relative z-[1]"> {/* Added relative z-[1] to ensure content is above background */}
        <section id="hero" className="pt-16"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="education"><Education /></section>
        <section id="coding-stats"><CodingStats /></section>
        <section id="projects"><Projects /></section>
        <section id="achievements"><Achievements /></section>
        <section id="approach"><Approach /></section>
        {/* Contact section can be added here */}
        <section id="contact"><Contact /></section>
        
        {/* Footer can have its own semi-transparent background with backdrop-blur */}
        <Footer />
      </main>
      
      {/* Floating Resume Download Button */}
      <FloatingResumeButton />
    </>
  );
}