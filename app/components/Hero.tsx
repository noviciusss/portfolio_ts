"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import unnamed from "../../public/unnamed.jpg";

const METRICS = [
  { label: "CORRECTNESS", value: "89.2%" },
  { label: "AVG_LATENCY", value: "2.86s" },
  { label: "TURNAROUND", value: "30–90s" },
  { label: "PIPELINE_SPEED", value: "7m→90s" },
];

const STACK = ["LangGraph", "Qdrant", "FastAPI", "Groq", "Next.js", "MCP"];

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
      <div className="mx-auto max-w-6xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.span 
              variants={itemVariants}
              className="mb-6 inline-flex w-fit border-[3px] border-ink bg-phosphor px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_0_var(--ink)]"
            >
              AI/ML Engineer
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-balance text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              I build AI agents
              <br />
              that{" "}
              <span className="box-decoration-clone bg-ink px-2 text-canvas inline-block">actually work.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed opacity-80"
            >
              Retrieval pipelines, multi-agent graphs, and evals — the parts most people skip.
              I build them, then measure them, before I ship.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="border-[3px] border-ink bg-phosphor px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest shadow-[6px_6px_0_0_var(--ink)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--ink)]">
                View Work
              </a>
              <a href="#ask" className="border-[3px] border-ink bg-canvas px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest shadow-[6px_6px_0_0_var(--amber)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--amber)]">
                Ask my AI ↗
              </a>
            </motion.div>

            {/* Social handles inside Hero for easy recruiter access */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center gap-6">
              <a
                href="https://github.com/noviciusss"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-mono text-xs font-bold"
              >
                <FaGithub size={18} />
                <span>github.com/noviciusss</span>
              </a>
              <a
                href="https://www.linkedin.com/in/spsamar/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 font-mono text-xs font-bold"
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
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-[3px] border-ink p-2 bg-canvas shadow-[8px_8px_0_0_var(--phosphor)]"
            >
              <div className="relative w-full h-full border-[2px] border-ink overflow-hidden grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-300">
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
          </div>
        </motion.div>

        {/* Full-width Metrics Grid below the split layout */}
        <motion.dl 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="border-[3px] border-ink bg-canvas p-4 shadow-[6px_6px_0_0_var(--phosphor)]">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">{m.label}</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight">{m.value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Stack Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">stack:</span>
          {STACK.map((s, i) => (
            <span
              key={s}
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)` }}
              className="border-2 border-ink bg-canvas px-2.5 py-1 font-mono text-xs font-bold"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}