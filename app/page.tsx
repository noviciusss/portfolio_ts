import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import AskAboutMe from "./components/AskAboutMe";
import About from "./components/About";
import Education from "./components/Education";
import Archive from "./components/Archive";
import CodingStats from "./components/CodingStats";
import RagBuilder from "./components/RagBuilder";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import FloatingResumeButton from "./components/FloatingResumeButton";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden relative z-[1]">
        {/* 1. Hero */}
        <section id="hero">
          <Hero />
        </section>

        {/* 2. Projects (at position 2) */}
        <Projects />

        {/* 3. Experience (AmberFlux) */}
        <Experience />

        {/* 4. Skills (7 categories matching resume) */}
        <Skills />

        {/* 5. Ask AI (grounded Q&A over resume/case files) */}
        <AskAboutMe />

        {/* 6. About */}
        <About />

        {/* 7. Education & Publications */}
        <Education />

        {/* 8. Fine-tuning & Earlier work */}
        <Archive />

        {/* 9. Interactive Simulation & Public Activity */}
        <div className="py-16 px-4 border-t-[3px] border-border bg-background">
          <div className="max-w-5xl mx-auto space-y-12">
            <RagBuilder />
          </div>
        </div>
        <CodingStats />

        {/* 10. Contact */}
        <Contact />

        <Footer />
      </main>
      <FloatingResumeButton />
    </>
  );
}