import Hero from './components/Hero';
import AskAboutMe from './components/AskAboutMe';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import CodingStats from './components/CodingStats';
import Projects from './components/Projects';
import Archive from './components/Archive';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import FloatingResumeButton from './components/FloatingResumeButton';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden relative z-[1]">
        <section id="hero">
          <Hero />
        </section>
        <section id="ask">
          <AskAboutMe />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="coding-stats">
          <CodingStats />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="building">
          <CurrentlyBuilding />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="archive">
          <Archive />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
      <FloatingResumeButton />
    </>
  );
}