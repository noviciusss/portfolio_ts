"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiBriefcase, FiCalendar, FiMapPin, FiCpu } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".exp-record", {
      opacity: 0,
      x: -16,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// SIGNAL_HISTORY</span>
        <h2 className="nb-section-heading">Experience</h2>

        {/* Timeline */}
        <div className="relative">
          {/* Ink vertical rule */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ink hidden md:block" />

          <div className="space-y-12 md:pl-10">
            {experiences.map((exp, idx) => (
              <div key={idx} className="exp-record relative">
                {/* Timeline dot */}
                <div className="absolute -left-[46px] top-8 w-4 h-4 border-[3px] border-ink bg-phosphor hidden md:block" />

                {/* Date label */}
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-3">
                  {exp.period} · {exp.location}
                </span>

                <div className="border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--ink)]">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-[3px] border-border p-6 md:p-8 pb-5 mb-0">
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-foreground mb-1 uppercase">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                        <FiBriefcase className="h-4 w-4 text-foreground" />
                        <span className="text-foreground font-bold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <FiCalendar className="h-3 w-3" />
                      <span>{exp.period}</span>
                      <span className="mx-1 text-border">·</span>
                      <FiMapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {exp.metrics.map((metric, midx) => (
                        <div
                          key={midx}
                          className="border-[3px] border-ink bg-canvas p-4 font-mono flex flex-col justify-between shadow-[3px_3px_0_0_var(--phosphor)]"
                        >
                          <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-bold">
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
                    <div className="flex flex-wrap gap-2 pt-4 border-t-[3px] border-border">
                      <span className="font-mono text-xs text-muted-foreground mr-2 flex items-center gap-1 font-bold">
                        <FiCpu className="h-3.5 w-3.5 text-foreground" />
                        TECH:
                      </span>
                      {exp.tech.map((t, tidx) => (
                        <span
                          key={tidx}
                          className={`font-mono text-xs text-foreground border-2 border-border bg-canvas px-2.5 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${tidx % 3}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
