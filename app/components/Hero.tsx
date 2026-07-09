"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import unnamed from "../../public/unnamed.jpg";

gsap.registerPlugin();

const INTRO_TEXT =
  "I build retrieval and agent systems that are measured, not vibes — hybrid search with RRF fusion, supervisor multi-agent graphs, dual-memory architectures — and I evaluate every one of them with LLM-as-judge harnesses before I call it done.";

export default function Hero() {
  const terminalTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const target = terminalTextRef.current;
    if (!target || !cursor) return;

    // Blink cursor
    const blinkTl = gsap.timeline({ repeat: -1, yoyo: true });
    blinkTl.to(cursor, { opacity: 0, duration: 0.5, ease: "none" });

    // Type intro text after a short delay
    const counter = { val: 0 };
    const typingTl = gsap.timeline({ delay: 0.6 });
    typingTl.to(counter, {
      val: INTRO_TEXT.length,
      duration: INTRO_TEXT.length * 0.022,
      ease: "none",
      onUpdate() {
        const idx = Math.round(counter.val);
        target.textContent = INTRO_TEXT.slice(0, idx);
      },
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="container max-w-6xl mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Role Tag */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider border-[3px] border-border bg-accent text-accent-foreground px-3.5 py-1.5 shadow-[4px_4px_0_0_var(--border)]">
                AI/ML Engineer · Agentic Pipelines · RAG
              </span>
            </motion.div>

            {/* Name & Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-[0.95] tracking-tight mb-6 text-foreground"
            >
              I build AI agents
              <br />
              that <span className="bg-foreground text-background px-2 box-decoration-clone inline-block">actually work.</span>
              <br />
              Not vibes — numbers.
            </motion.h1>

            {/* Position Statement / GSAP Typing */}
            <motion.div variants={itemVariants} className="w-full max-w-xl mb-8">
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-sans border-l-[3px] border-accent pl-4 py-1.5 min-h-[90px]">
                <span ref={terminalTextRef} />
                <span ref={cursorRef} className="inline-block w-[8px] h-[15px] bg-accent align-middle ml-1" />
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <Button
                asChild
                className="nb-btn nb-btn-primary"
              >
                <a href="#projects">View Projects</a>
              </Button>

              <Button
                asChild
                className="nb-btn nb-btn-secondary"
              >
                <a href="/Resume.pdf" download="Samarth_Resume">
                  <FiDownload className="h-4 w-4" /> Download Resume
                </a>
              </Button>

              <Button
                asChild
                className="nb-btn bg-background text-foreground"
              >
                <a href="#contact">Contact</a>
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <a
                href="https://github.com/noviciusss"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-mono text-xs"
              >
                <FaGithub size={18} />
                <span>github.com/noviciusss</span>
              </a>
              <a
                href="https://www.linkedin.com/in/spsamar/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-mono text-xs"
              >
                <FaLinkedin size={18} />
                <span>linkedin.com/in/spsamar</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column — Photo + Neubrutalist Grid Metrics */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-2 w-full">
            {/* Profile Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-[3px] border-border p-2 bg-card shadow-[8px_8px_0_0_var(--accent)]"
            >
              <div className="relative w-full h-full border-[2px] border-border overflow-hidden grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-300">
                <Image
                  src={unnamed}
                  alt="Samarth Pratap Singh profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </motion.div>

            {/* Metrics block */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 w-full max-w-sm mt-6"
            >
              <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">// CORRECTNESS</span>
                <div className="text-xl sm:text-2xl font-display font-black text-accent mt-1">89.2%</div>
              </div>
              <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">// AVG_LATENCY</span>
                <div className="text-xl sm:text-2xl font-display font-black text-foreground mt-1">2.86s</div>
              </div>
              <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">// CGPA_VIT</span>
                <div className="text-xl sm:text-2xl font-display font-black text-foreground mt-1">8.57</div>
              </div>
              <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">// PIPELINE_DELTA</span>
                <div className="text-xl sm:text-2xl font-display font-black text-accent mt-1">7m → 90s</div>
              </div>
            </motion.div>

            {/* Stack Tags Row */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-2 w-full max-w-sm"
            >
              {["LangGraph", "Qdrant", "FastAPI", "Groq", "Next.js", "MCP"].map((tag, tIdx) => (
                <span
                  key={tag}
                  className={`font-mono text-xs font-bold border-2 border-border bg-card px-2.5 py-1 shadow-[2px_2px_0_0_var(--border)] tag-tilt-${tIdx % 3}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}