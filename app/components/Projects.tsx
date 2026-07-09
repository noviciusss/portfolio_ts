"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiBookOpen, FiLock } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

type ProjectMetric = {
  label: string;
  value: string;
  // For animated numbers: provide start and end numeric values + a format fn
  countFrom?: number;
  countTo?: number;
  format?: (n: number) => string;
};

type Project = {
  index: string;
  title: string;
  problem: string;
  build: string;
  metrics: ProjectMetric[];
  tags: string[];
  github?: string;
  demo?: string;
  blog?: string;
  schematic?: string[];
  isInternal?: boolean;
};

const featuredProjects: Project[] = [
  {
    index: "01",
    title: "DoCopilot — RAG Document Q&A",
    problem:
      "Baseline keyword-search retrieval was producing relevant answers in only ~57.7% of multi-format document queries, suffering from hallucinated context and zero citation trace.",
    build:
      "Implemented a full-stack RAG pipeline. Utilizes hybrid search (BM25 + dense vectors) in Qdrant with Reciprocal Rank Fusion (RRF), cross-encoder reranking via hosted inference API, and source-grounding citation filters. Added PII redaction and prompt-injection detection guardrails.",
    metrics: [
      {
        label: "Correctness",
        value: "89.2%",
        countFrom: 57.7,
        countTo: 89.2,
        format: (n) => `${n.toFixed(1)}%`,
      },
      {
        label: "Avg Latency",
        value: "2.86s",
        countFrom: 0,
        countTo: 2.86,
        format: (n) => `${n.toFixed(2)}s`,
      },
      { label: "Source Rate", value: "100%" },
    ],
    tags: ["Next.js", "FastAPI", "Qdrant", "RRF Fusion", "Cross-Encoder", "Python"],
    github: "https://github.com/noviciusss/DoCopilot",
    blog: "https://medium.com/@samarthsin2006/docopilot-building-a-production-grade-rag-system-with-hybrid-search-reranking-and-safety-c943fc2626be",
  },
  {
    index: "02",
    title: "Argus — Multi-Agent Research Engine",
    problem:
      "Compiling research reports from Tavily, ArXiv, and Wikipedia was manual and time-consuming, requiring human iteration to trace sources and reject low-quality summaries.",
    build:
      "Built an autonomous research supervisor graph with LangGraph containing 5 specialist agents (planner, researcher, critic, writer, supervisor). Features cyclic routing, SQLite checkpointing for failure recovery, and end-to-end tracing in LangSmith. The critic agent rejects low-quality drafts and re-routes before writing.",
    metrics: [
      {
        label: "Research Time",
        value: "30–90s",
        countFrom: 0,
        countTo: 90,
        format: (n) => (n < 30 ? `${Math.round(n)}s` : `30–${Math.round(n)}s`),
      },
      { label: "Specialists", value: "5 Agents" },
      { label: "Trace Engine", value: "LangSmith" },
    ],
    tags: ["LangGraph", "FastAPI", "Docker", "SQLite", "Tavily API", "Python"],
    github: "https://github.com/noviciusss/argus",
    demo: "https://argus-h0uw.onrender.com/",
  },
  {
    index: "03",
    title: "ContextCore — Stateful Memory Agent",
    problem:
      "Standard agents lose task/note context across sessions, and typical memory approaches hallucinate user preferences when querying vector databases directly.",
    build:
      "Designed a FastMCP server exposing structured note/task tools integrated with LangGraph. Employs a dual-memory layer: Postgres for exact execution states, MongoDB for profile states, and Qdrant semantic recall. Intent router directs queries based on semantic similarity.",
    metrics: [
      {
        label: "Memory Recall",
        value: "92% Acc",
        countFrom: 0,
        countTo: 92,
        format: (n) => `${Math.round(n)}%`,
      },
      { label: "Query Router", value: "FastMCP" },
      { label: "Checkpointing", value: "PostgreSQL" },
    ],
    tags: ["FastMCP", "LangGraph", "Qdrant", "PostgreSQL", "MongoDB", "JSON-RPC"],
    github: "https://github.com/noviciusss/ContextCore-CLI",
    schematic: [
      "[User Command] ──> [MCP Client/Agent]",
      "                         │",
      "        ┌────────────────┴────────────────┐",
      "        ▼ (Intent Router)                 ▼ (Recall)",
      "  [PostgreSQL] (State)             [Qdrant] (Semantic)",
    ],
  },
  {
    index: "04",
    title: "GFS-AI — Document Intelligence Pipeline",
    problem:
      "Intake validation for multi-page (up to 400p) architectural PDF documents took up to 7 minutes with high rates of timeout errors and missing dimension listings.",
    build:
      "Architected a vision extraction pipeline combining non-AI heuristic regex/Docling checks with GPT-5 fallback. Integrated concurrent batch dispatch (ThreadPoolExecutor + asyncio) and fixed canvas resizing bugs to improve field detection. Built at AmberFlux EdgeAI.",
    metrics: [
      {
        label: "Recall Rate",
        value: "75+ entries",
        countFrom: 10,
        countTo: 75,
        format: (n) => (n < 11 ? `${Math.round(n)} entries` : `${Math.round(n)}+ entries`),
      },
      {
        label: "Latency",
        value: "~90s",
        countFrom: 420,
        countTo: 90,
        format: (n) => (n > 100 ? `~${Math.round(n / 60)}m` : `~${Math.round(n)}s`),
      },
      { label: "Batch Load", value: "400 pages" },
    ],
    tags: ["GPT-5 Vision", "ThreadPoolExecutor", "asyncio", "Docling", "Python"],
    isInternal: true,
    schematic: [
      "[PDF Source] ──> [Docling (Regex Checks)]",
      "                        │",
      "         (Missing field Fallback)",
      "                        ▼",
      "  [GPT-5 Vision (concurrent)] ──> [Structured JSON]",
    ],
  },
];

function MetricCell({
  metric,
  cardIdx,
  metricIdx,
}: {
  metric: ProjectMetric;
  cardIdx: number;
  metricIdx: number;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!valueRef.current || metric.countFrom === undefined || metric.countTo === undefined || !metric.format) return;

    const counter = { val: metric.countFrom };
    gsap.to(counter, {
      val: metric.countTo,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: valueRef.current,
        start: "top 90%",
        once: true,
      },
      onUpdate() {
        if (valueRef.current && metric.format) {
          valueRef.current.textContent = metric.format(counter.val);
        }
      },
    });
  }, []);

  return (
    <div className="font-mono flex flex-col justify-between">
      <span className="text-[9px] text-muted-foreground/60 uppercase tracking-tight">
        {metric.label}
      </span>
      <span
        ref={valueRef}
        className="text-sm sm:text-base font-bold text-accent mt-0.5"
      >
        {metric.countFrom !== undefined && metric.format
          ? metric.format(metric.countFrom)
          : metric.value}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="log-header">
          <span>// 03 — FEATURED PROJECTS</span>
        </div>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Detailed case files for production-grade AI/ML architectures. Every project is measured
            against exact performance indices — no aesthetic fluff, only verifiable metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="border border-border/80 p-6 bg-card/25 flex flex-col justify-between relative schematic-bracket-card"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between border-b border-border/40 pb-4 mb-5">
                  <div>
                    <span className="font-mono text-xs text-accent font-bold">
                      CASE_FILE // {project.index}
                    </span>
                    {project.isInternal && (
                      <span className="ml-2 font-mono text-[9px] text-muted-foreground/50 border border-border/40 px-1.5 py-0.5 uppercase tracking-wider">
                        INTERNAL
                      </span>
                    )}
                    <h3 className="text-xl font-display font-medium text-foreground mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Architecture Schematic */}
                {project.schematic && (
                  <div className="w-full mb-6 border border-border p-4 bg-background/60 font-mono text-[9px] sm:text-[10px] text-muted-foreground/80 overflow-x-auto leading-relaxed whitespace-pre select-none">
                    <div className="text-[9px] uppercase tracking-wider text-accent border-b border-border/30 pb-1 mb-2 font-bold">
                      // ARCHITECTURE_SCHEMATIC
                    </div>
                    {project.schematic.join("\n")}
                  </div>
                )}

                {/* Problem */}
                <div className="mb-5">
                  <h4 className="font-mono text-[10px] uppercase text-muted-foreground/60 tracking-wider mb-1.5">
                    // PROBLEM
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-sans">
                    {project.problem}
                  </p>
                </div>

                {/* Build */}
                <div className="mb-6">
                  <h4 className="font-mono text-[10px] uppercase text-muted-foreground/60 tracking-wider mb-1.5">
                    // BUILD
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-sans">
                    {project.build}
                  </p>
                </div>
              </div>

              {/* Metrics Block — GSAP count-up */}
              <div>
                <div className="grid grid-cols-3 gap-3 border-t border-b border-border/40 py-4 mb-5">
                  {project.metrics.map((metric, mIdx) => (
                    <MetricCell
                      key={mIdx}
                      metric={metric}
                      cardIdx={idx}
                      metricIdx={mIdx}
                    />
                  ))}
                </div>

                {/* Tags and Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[9px] text-muted-foreground border border-border/60 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="font-mono text-[9px] text-muted-foreground/60 px-1 py-0.5">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    {project.isInternal ? (
                      <span className="text-muted-foreground/40 flex items-center gap-1.5 text-[10px]">
                        <FiLock className="h-3 w-3" />
                        Internal
                      </span>
                    ) : (
                      project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent flex items-center gap-1.5"
                        >
                          <FiGithub className="h-4 w-4" />
                          <span className="hover-mechanical-link">Code</span>
                        </a>
                      )
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent flex items-center gap-1.5"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        <span className="hover-mechanical-link">Live</span>
                      </a>
                    )}

                    {project.blog && (
                      <a
                        href={project.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent flex items-center gap-1.5"
                      >
                        <FiBookOpen className="h-4 w-4" />
                        <span className="hover-mechanical-link">Analysis</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}