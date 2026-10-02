"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import samarthImg from "../../public/samarth.jpg";

interface StatItem {
  value: string;
  num?: number;
  suffix?: string;
  caption: string;
}

const STATS: StatItem[] = [
  {
    value: "89.2%",
    num: 89.2,
    suffix: "%",
    caption: "answer correctness · 40-question eval · DoCopilot",
  },
  {
    value: "2.86s",
    num: 2.86,
    suffix: "s",
    caption: "avg latency · DoCopilot",
  },
  {
    value: "7m → 90s",
    caption: "PDF extraction, 20 pages · internship project",
  },
  {
    value: "92%",
    num: 92,
    suffix: "%",
    caption: "pass rate · 50-case eval · ContextCore",
  },
];

const STACK = ["LangGraph", "Qdrant", "FastAPI", "Next.js", "FastMCP", "Docker"];

function StatTile({ item }: { item: StatItem }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!item.num || !numRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const target = item.num;
    const isFloat = !Number.isInteger(target);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (target - start) * ease;

      if (numRef.current) {
        numRef.current.textContent = `${isFloat ? current.toFixed(target >= 10 ? 1 : 2) : Math.round(current)}${item.suffix || ""}`;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [item.num, item.suffix]);

  return (
    <div className="border-[3px] border-ink bg-canvas p-4 shadow-[6px_6px_0_0_var(--phosphor)] flex flex-col justify-between">
      <dd className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink font-display">
        <span ref={numRef}>{item.value}</span>
      </dd>
      <dt className="mt-2 font-mono text-[11px] leading-snug font-medium text-muted-foreground">
        {item.caption}
      </dt>
    </div>
  );
}

export default function Hero() {
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
    <section className="min-h-screen w-full bg-canvas font-sans text-ink pt-28 pb-16 px-5 md:px-8">
      <div className="mx-auto max-w-5xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <motion.span
                variants={itemVariants}
                className="inline-flex w-fit border-[3px] border-ink bg-phosphor px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0_0_var(--ink)]"
              >
                AI Engineer · LLM Agents · RAG · Evals
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 border-[2px] border-ink bg-canvas px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_var(--amber)]"
              >
                <span className="size-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
                Open to 2027 roles
              </motion.span>
            </div>

            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-balance text-4xl font-black uppercase leading-[0.94] tracking-tight sm:text-6xl md:text-7xl lg:text-7xl font-display"
            >
              I build AI agents
              <br />
              that <span className="box-decoration-clone bg-ink px-2 text-canvas inline-block">actually work.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-pretty text-base sm:text-lg leading-relaxed text-ink/80 font-sans"
            >
              RAG pipelines, document extraction, and the eval harnesses behind them. In my internship, I cut extraction time on 20-page drawings from 7 minutes to 90 seconds.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="border-[3px] border-ink bg-phosphor px-6 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[6px_6px_0_0_var(--ink)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--ink)]"
              >
                View Work
              </a>
              <a
                href="/Samarth_Singh_FDE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[3px] border-ink bg-canvas px-6 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[6px_6px_0_0_var(--amber)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--amber)] inline-flex items-center gap-2"
              >
                <FiDownload className="h-4 w-4" /> Download Resume
              </a>
              <a
                href="#ask"
                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-ink underline underline-offset-4 decoration-2"
              >
                Ask my AI ↗
              </a>
            </motion.div>

            {/* Social handles */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center gap-6">
              <a
                href="https://github.com/noviciusss"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 font-mono text-xs font-bold"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
                <span>github.com/noviciusss</span>
              </a>
              <a
                href="https://www.linkedin.com/in/spsamar/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 font-mono text-xs font-bold"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={18} />
                <span>linkedin.com/in/spsamar</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column (Profile Photo) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
            <motion.div
              variants={itemVariants}
              className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 border-[3px] border-ink p-2 bg-canvas shadow-[8px_8px_0_0_var(--phosphor)]"
            >
              <div className="relative w-full h-full border-[2px] border-ink overflow-hidden grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-300">
                <Image
                  src={samarthImg}
                  alt="Samarth Pratap Singh — AI Engineer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 4 Captioned Metric Tiles */}
        <motion.dl
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map((s, idx) => (
            <StatTile key={idx} item={s} />
          ))}
        </motion.dl>

        {/* Stack Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">stack:</span>
          {STACK.map((s, i) => (
            <span
              key={s}
              className={`border-2 border-ink bg-canvas px-2.5 py-1 font-mono text-xs font-bold tag-tilt-${i % 3}`}
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}