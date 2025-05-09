import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Education from './components/Education';
import CodingStats from './components/CodingStats';
// ModernBackground is already in layout.tsx, no need to import here unless used differently
import { FaArrowUp } from 'react-icons/fa';

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
        <section id="contact"><Contact /></section>
        
        {/* Footer can have its own semi-transparent background with backdrop-blur */}
        <footer className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-md py-8 px-4 border-t border-gray-200 dark:border-gray-800/50 relative z-[1]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400 font-heading">
              © {new Date().getFullYear()} Noviciusss. All rights reserved.
            </p>
            <div className="mt-4">
              <a 
                href="#hero"
                className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                <FaArrowUp />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}