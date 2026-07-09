"use client";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiCpu } from "react-icons/fi";

const experiences = [
  {
    role: "AI/ML Engineer Intern",
    company: "AmberFlux EdgeAI",
    period: "May 2026 – Present",
    location: "Remote",
    metrics: [
      { key: "Latency reduction", value: "7m → 90s" },
      { key: "Document range", value: "Up to 400p" },
      { key: "Vision extraction", value: ">0.85 conf." }
    ],
    bullets: [
      "Architected a vision extraction pipeline for multi-page architectural PDFs using GPT-5 — cut latency from ~7 min to ~90 sec on 20-page documents via concurrent batch dispatch (ThreadPoolExecutor + asyncio), with structured output enforcement and retry handling.",
      "Built a cover/dimension intake pipeline combining non-AI heuristic extraction (regex/Docling) with conditional GPT-5 fallback — vision invoked only for missing fields — achieving >0.85 confidence and near-complete field extraction on real architectural lead sheets.",
      "Designed a job aggregation layer consolidating multi-source document outputs into structured JSON for documents up to 400 pages, with page-level validation guardrails and LangGraph-based routing."
    ],
    tech: ["GPT-5", "ThreadPoolExecutor", "asyncio", "LangGraph", "Docling", "Python"]
  }
];

export default function Experience() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 03</span>
        <h2 className="nb-section-heading">Experience</h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className="nb-card p-6 md:p-8 bg-card"
            >
              {/* Header section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-[3px] border-border pb-6 mb-6">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-accent font-mono text-sm font-semibold">
                    <FiBriefcase className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="h-3 w-3" />
                    {exp.period}
                  </span>
                  <span className="hidden sm:inline text-border/60">|</span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Metrics side panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {exp.metrics.map((metric, midx) => (
                  <div 
                    key={midx}
                    className="border-[3px] border-border bg-amber p-4 font-mono flex flex-col justify-between shadow-[3px_3px_0_0_var(--border)]"
                  >
                    <span className="text-[10px] uppercase text-foreground/70 tracking-wider font-bold">
                      // {metric.key}
                    </span>
                    <span className="text-lg font-black text-foreground mt-1">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mb-8">
                {exp.bullets.map((bullet, bidx) => (
                  <p key={bidx} className="relative pl-5 font-sans">
                    <span className="absolute left-0 top-1 text-accent font-mono font-black">•</span>
                    {bullet}
                  </p>
                ))}
              </div>

              {/* Tech stack row */}
              <div className="flex flex-wrap gap-2 pt-4 border-t-[3px] border-border/20">
                <span className="font-mono text-xs text-muted-foreground mr-2 flex items-center gap-1 font-bold">
                  <FiCpu className="h-3.5 w-3.5 text-foreground" />
                  TECH:
                </span>
                {exp.tech.map((t, tidx) => (
                  <span 
                    key={tidx}
                    className={`font-mono text-xs text-foreground border-2 border-border bg-card px-2.5 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${tidx % 3}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
