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
      duration: INTRO_TEXT.length * 0.025,
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
            <motion.div variants={itemVariants} className="mb-4">
              <span className="font-mono text-xs tracking-widest text-accent uppercase border border-accent/30 bg-accent/5 px-3 py-1 font-medium">
                AI/ML Engineer · Agentic Pipelines · RAG · 2027
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight mb-6 text-foreground leading-[1.05]"
            >
              Samarth <br />
              Pratap Singh
            </motion.h1>

            {/* Terminal Window for Positioning Statement */}
            <motion.div variants={itemVariants} className="w-full max-w-xl mb-8">
              {/* Chrome Bar */}
              <div className="flex items-center gap-2 px-3 py-2 border border-border/80 border-b-0 bg-secondary/40">
                <div className="w-2 h-2 rounded-full bg-destructive/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-accent/40" />
                <span className="ml-2 font-mono text-[9px] text-muted-foreground/50 tracking-wider uppercase">
                  zsh — samarth@portfolio
                </span>
              </div>
              {/* Terminal Body */}
              <div className="border border-border/80 bg-card/15 px-4 py-4 font-mono text-sm text-muted-foreground leading-relaxed min-h-[80px]">
                <span className="text-accent">$</span>
                <span className="text-muted-foreground/50 ml-1.5 text-xs">whoami</span>
                <br />
                <span ref={terminalTextRef} />
                <span ref={cursorRef} className="inline-block w-[7px] h-[14px] bg-accent/90 align-middle ml-0.5" />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-accent/20 transition-all duration-200"
              >
                <a href="#projects">View Projects</a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-secondary hover:text-foreground text-muted-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-border/80 transition-all duration-200 gap-2"
              >
                <a href="/Resume.pdf" download="Samarth_Resume">
                  <FiDownload className="h-4 w-4" /> Resume
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-secondary hover:text-foreground text-muted-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-border/80 transition-all duration-200"
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
                <span className="hover-mechanical-link">github.com/noviciusss</span>
              </a>
              <a
                href="https://www.linkedin.com/in/spsamar/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-mono text-xs"
              >
                <FaLinkedin size={18} />
                <span className="hover-mechanical-link">linkedin.com/in/spsamar</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column — Photo + Readout Panel */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full">
            {/* Profile Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto lg:mx-0 border border-border p-2 bg-card schematic-bracket-card"
            >
              <div className="relative w-full h-full border border-border overflow-hidden grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-300">
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

            {/* Readout Panel */}
            <motion.div
              variants={itemVariants}
              className="border border-border/80 p-5 bg-card/45 backdrop-blur-sm relative font-mono text-xs text-muted-foreground w-full max-w-sm mx-auto lg:mx-0"
            >
              <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-background px-2 text-[10px] uppercase text-accent tracking-widest font-bold">
                SYSTEMS_LOG // 01
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[10px] uppercase text-muted-foreground/60">// STAT_CGPA</span>
                  <span className="text-foreground font-bold font-mono">8.57 / 10</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[10px] uppercase text-muted-foreground/60">// INTERN</span>
                  <span className="text-foreground font-bold font-mono text-right">AmberFlux EdgeAI</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[10px] uppercase text-muted-foreground/60">// CORE_FOCUS</span>
                  <span className="text-foreground font-bold font-mono text-right">RAG & Agent Graphs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase text-muted-foreground/60">// RUNTIME_ENV</span>
                  <span className="text-accent font-bold font-mono">PYTHON · TS · LINUX</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}