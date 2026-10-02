"use client";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiBookOpen, FiLock, FiChevronDown, FiChevronUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

type ProjectMetric = {
  label: string;
  value: string;
  countFrom?: number;
  countTo?: number;
  format?: (n: number) => string;
};

type Project = {
  index: string;
  title: string;
  outcome: string;
  evalNote?: string;
  isFlagship?: boolean;
  isInternal?: boolean;
  problem: string;
  build: string;
  metrics: ProjectMetric[];
  tags: string[];
  github?: string;
  demo?: string;
  demoNote?: string;
  blog?: string;
  diagramType?: "contextcore" | "gfsai";
};

const featuredProjects: Project[] = [
  {
    index: "01",
    title: "DoCopilot — Multi-Tenant RAG",
    outcome: "Multi-tenant RAG with 89.2% correctness and 2.86s average latency on a 40-question eval harness.",
    evalNote: "Eval: 40 questions · LLM judge Llama-3.1-8B judging Qwen3-32B",
    isFlagship: true,
    problem:
      "Document Q&A across multi-format business files suffered from hallucinated context, absent source attribution, and lack of strict multi-tenant boundary isolation.",
    build:
      "Engineered a production-ready multi-tenant RAG platform with JWT authentication and Qdrant payload-filtered retrieval. Features SHA-256 upload deduplication, Celery + Redis async ingestion, hybrid search (MiniLM dense vectors + BM25 with Reciprocal Rank Fusion), and cross-encoder reranking from top-20 down to top-5. Implemented SSE token streaming, source-cited grounded answers, PII/regex guardrails, per-IP rate limiting, and CI/CD via GitHub Actions (pytest → Docker → ACR → Azure Container Apps).",
    metrics: [
      {
        label: "Correctness",
        value: "89.2%",
        countFrom: 60,
        countTo: 89.2,
        format: (n) => `${n.toFixed(1)}%`,
      },
      {
        label: "Relevance",
        value: "90.5%",
        countFrom: 70,
        countTo: 90.5,
        format: (n) => `${n.toFixed(1)}%`,
      },
      {
        label: "Avg Latency",
        value: "2.86s",
        countFrom: 6.0,
        countTo: 2.86,
        format: (n) => `${n.toFixed(2)}s`,
      },
    ],
    tags: ["FastAPI", "Next.js", "Qdrant", "Hybrid Search (RRF)", "Cross-Encoder", "Docker", "Azure Container Apps"],
    github: "https://github.com/noviciusss/DoCopilot",
    demo: "https://do-copilot.vercel.app/",
    blog: "https://medium.com/@samarthsin2006/docopilot-building-a-production-grade-rag-system-with-hybrid-search-reranking-and-safety-c943fc2626be",
  },
  {
    index: "02",
    title: "Argus — Multi-Agent Research Engine",
    outcome: "Autonomous research supervisor coordinating 4 specialist agents with 3 depth tiers and LangSmith tracing.",
    evalNote: "Max 3 critique loops · 30-min auto-finalize · SQLite/Postgres auto-switch",
    problem:
      "Compiling deep research reports across heterogeneous web sources (Tavily, ArXiv, Wikipedia) was manual and unverified, requiring repetitive human oversight to filter noise and reject weak summaries.",
    build:
      "Built a LangGraph supervisor agent orchestrating 4 specialists (planner, researcher, critic, writer) routed dynamically via Command(goto). Features 3 configurable depth tiers (~20s / 45s / 90s), isolated Human-In-The-Loop interrupt nodes, maximum 3 critique feedback loops before 30-minute auto-finalization, SSE streaming, SQLite/Postgres auto-switching checkpoint persistence, and complete execution tracing in LangSmith packaged with Docker.",
    metrics: [
      {
        label: "Depth Tiers",
        value: "~20/45/90s",
      },
      {
        label: "Specialists",
        value: "4 + Supervisor",
      },
      {
        label: "Critique Loops",
        value: "Max 3 Loops",
      },
    ],
    tags: ["LangGraph", "FastAPI", "LangSmith", "Docker", "Tavily", "SQLite/Postgres"],
    github: "https://github.com/noviciusss/argus",
    demo: "https://argus-h0uw.onrender.com/",
    demoNote: "Hosted on Render — cold start may take ~30s",
  },
  {
    index: "03",
    title: "ContextCore — Stateful Memory Agent",
    outcome: "LangGraph CLI agent with 3-tier memory persistence achieving 92% pass rate across 50 eval cases.",
    evalNote: "Eval: 50 cases · 92% pass rate · Hardened tool schemas",
    problem:
      "CLI agents lose state across sessions, and standard single-vector memory stores hallucinate user profile data or overwrite active execution states.",
    build:
      "Designed an intent-routed LangGraph CLI agent (task / memory-recall / chat) backed by a custom FastMCP server on PostgreSQL. Implements three distinct memory layers: Postgres checkpointing for exact step states, Qdrant for semantic recall, and MongoDB for persistent user profiles. Features astream_events token streaming, async background memory persistence, and an LLM-judge test suite with 92% pass rate across 50 test cases.",
    metrics: [
      {
        label: "Eval Pass Rate",
        value: "92%",
        countFrom: 70,
        countTo: 92,
        format: (n) => `${Math.round(n)}%`,
      },
      {
        label: "Memory Stores",
        value: "3 Tiers",
      },
      {
        label: "Protocol",
        value: "FastMCP",
      },
    ],
    tags: ["FastMCP", "LangGraph", "PostgreSQL", "Qdrant", "MongoDB", "Python"],
    github: "https://github.com/noviciusss/ContextCore-CLI",
    diagramType: "contextcore",
  },
  {
    index: "04",
    title: "GFS-AI — Document Intelligence Pipeline",
    outcome: "Architectural drawing extraction pipeline cutting intake from ~7 min to ~90 sec (~4.7×) on 20-page drawings.",
    evalNote: "AmberFlux EdgeAI · Production Lead Sheets · Up to 400 pages",
    isInternal: true,
    problem:
      "Intake validation for multi-page architectural CAD/PDF drawings took ~7 minutes with frequent timeout errors and high risk of missed lead-sheet specifications.",
    build:
      "Architected a high-throughput document intelligence layer combining non-AI heuristic checks (regex & Docling) with conditional GPT-5 vision fallback — invoking vision only for missing fields. Integrated concurrent batch dispatch (ThreadPoolExecutor + asyncio), retry handling, schema-enforced JSON outputs, and LangGraph-routed aggregation with page-level guardrails and drawing-page exclusion.",
    metrics: [
      {
        label: "Extraction Speed",
        value: "7m → 90s",
      },
      {
        label: "Confidence",
        value: ">0.85 Conf.",
      },
      {
        label: "Doc Scale",
        value: "Up to 400p",
      },
    ],
    tags: ["GPT-5 Vision", "ThreadPoolExecutor", "asyncio", "Docling", "LangGraph", "Python"],
    diagramType: "gfsai",
  },
];

function ContextCoreDiagram() {
  return (
    <div className="w-full mb-6 border-[3px] border-border p-4 bg-canvas font-mono text-xs shadow-[3px_3px_0_0_var(--ink)]">
      <div className="text-[10px] uppercase tracking-wider text-accent border-b-[2px] border-border pb-1 mb-3 font-bold">
        // ARCHITECTURE // 3-TIER MEMORY
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">1. PostgreSQL</div>
          <div className="text-[10px] text-muted-foreground">Execution Checkpointing & State History</div>
        </div>
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">2. Qdrant</div>
          <div className="text-[10px] text-muted-foreground">Semantic Recall & Vector Similarity</div>
        </div>
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">3. MongoDB</div>
          <div className="text-[10px] text-muted-foreground">User Profile & Preference State</div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-muted-foreground border-t border-border/20 pt-2 flex items-center gap-2">
        <span className="text-phosphor font-bold">→</span>
        <span>Routed via FastMCP tools into LangGraph agent executor</span>
      </div>
    </div>
  );
}

function GfsAiDiagram() {
  return (
    <div className="w-full mb-6 border-[3px] border-border p-4 bg-canvas font-mono text-xs shadow-[3px_3px_0_0_var(--ink)]">
      <div className="text-[10px] uppercase tracking-wider text-accent border-b-[2px] border-border pb-1 mb-3 font-bold">
        // EXTRACTION_PIPELINE // HEURISTIC + VISION FALLBACK
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">PDF Intake (≤400p)</div>
          <div className="text-[10px] text-muted-foreground">Docling & Regex heuristic parsing</div>
        </div>
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">Conditional Dispatch</div>
          <div className="text-[10px] text-muted-foreground">GPT-5 vision only on missing fields</div>
        </div>
        <div className="border-2 border-border p-2.5 bg-background">
          <div className="font-bold text-foreground text-[11px] mb-1">LangGraph Aggregation</div>
          <div className="text-[10px] text-muted-foreground">Schema validation & retry guardrails</div>
        </div>
      </div>
    </div>
  );
}

function MetricCell({ metric }: { metric: ProjectMetric }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      !valueRef.current ||
      metric.countFrom === undefined ||
      metric.countTo === undefined ||
      !metric.format
    )
      return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let start = metric.countFrom;
    const target = metric.countTo;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (target - start) * ease;

      if (valueRef.current && metric.format) {
        valueRef.current.textContent = metric.format(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [metric]);

  return (
    <div className="border-[3px] border-ink bg-canvas p-3 shadow-[2px_2px_0_0_var(--phosphor)] font-mono flex flex-col justify-between">
      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight">
        {metric.label}
      </span>
      {/* Always server-render the final value so no 0s or broken counters appear */}
      <span
        ref={valueRef}
        className="text-sm sm:text-base font-black text-foreground mt-1"
      >
        {metric.value}
      </span>
    </div>
  );
}

function ProjectCardInner({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="border-b-[3px] border-border pb-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-mono text-xs text-accent font-bold uppercase">
            CASE_FILE // {project.index}
          </span>
          {project.isInternal && (
            <span className="font-mono text-[9px] text-foreground bg-amber border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-bold">
              INTERNAL
            </span>
          )}
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black text-foreground uppercase">
          {project.title}
        </h3>
        {/* Outcome Line (Immediate 3-second comprehension) */}
        <p className="mt-2 text-sm sm:text-base font-bold text-foreground/90 font-sans leading-snug">
          {project.outcome}
        </p>
      </div>

      {/* Metric Strip */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
          {project.metrics.map((metric, mIdx) => (
            <MetricCell key={mIdx} metric={metric} />
          ))}
        </div>
        {project.evalNote && (
          <div className="mt-2 font-mono text-[10px] sm:text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5">
            <span className="text-accent font-bold">✦</span>
            <span>{project.evalNote}</span>
          </div>
        )}
      </div>

      {/* Diagrams if applicable */}
      {project.diagramType === "contextcore" && <ContextCoreDiagram />}
      {project.diagramType === "gfsai" && <GfsAiDiagram />}

      {/* Mobile Details Toggle */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="w-full flex items-center justify-between border-2 border-border p-2 bg-canvas font-mono text-xs font-bold text-foreground"
        >
          <span>{detailsOpen ? "Hide Technical Details" : "Show Problem & Build Specs"}</span>
          {detailsOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Technical Problem & Build Specs */}
      <div className={`space-y-4 mb-5 ${detailsOpen ? "block" : "hidden sm:block"}`}>
        <div>
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-1 font-bold">
            // PROBLEM
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-sans">
            {project.problem}
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-1 font-bold">
            // BUILD
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-sans">
            {project.build}
          </p>
        </div>
      </div>

      {/* Footer Tags & Links */}
      <div className="pt-4 border-t-[3px] border-border mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.slice(0, 5).map((tag, tIdx) => (
            <span
              key={tIdx}
              className={`font-mono text-[10px] text-foreground border-2 border-border bg-background px-2 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${tIdx % 3}`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="font-mono text-[9px] text-muted-foreground/60 px-1 py-0.5">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          {project.isInternal ? (
            <span className="text-muted-foreground/60 border-[2px] border-border px-2 py-1 flex items-center gap-1.5 text-[10px] uppercase font-bold">
              <FiLock className="h-3 w-3" />
              Internal (AmberFlux)
            </span>
          ) : (
            project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <FiGithub className="h-3.5 w-3.5" /> Code
              </a>
            )
          )}

          {project.demo && (
            <div className="flex flex-col items-start">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-3 bg-accent text-accent-foreground border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                aria-label={`View ${project.title} live demo`}
              >
                <FiExternalLink className="h-3.5 w-3.5" /> Live
              </a>
              {project.demoNote && (
                <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
                  {project.demoNote}
                </span>
              )}
            </div>
          )}

          {project.blog && (
            <a
              href={project.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
              aria-label={`Read ${project.title} architectural writeup`}
            >
              <FiBookOpen className="h-3.5 w-3.5" /> Analysis
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 28,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const flagship = featuredProjects[0];
  const midProjects = featuredProjects.slice(1, 3);
  const internalProject = featuredProjects[3];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// CASE_FILES</span>
        <h2 className="nb-section-heading">Featured Projects</h2>

        <div className="mb-10 max-w-xl text-sm text-muted-foreground font-sans">
          <p>
            Evaluated AI/ML architectures with clear problem statements, production builds, and verifiable metrics.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* DoCopilot - Full-width flagship */}
          <div className="project-card border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--phosphor)] flex flex-col">
            <div className="w-full bg-phosphor px-6 sm:px-8 py-2 border-b-[3px] border-ink flex items-center justify-between">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">
                FLAGSHIP PROJECT — CASE_FILE // 01
              </span>
              <span className="font-mono text-[9px] font-bold text-ink uppercase">
                40-QUERY EVAL
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <ProjectCardInner project={flagship} />
            </div>
          </div>

          {/* Argus + ContextCore - 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {midProjects.map((project, i) => (
              <div
                key={project.index}
                className={`project-card border-[3px] border-ink bg-canvas p-6 flex flex-col ${
                  i === 0
                    ? "shadow-[6px_6px_0_0_var(--ink)]"
                    : "shadow-[6px_6px_0_0_var(--amber)]"
                }`}
              >
                <ProjectCardInner project={project} />
              </div>
            ))}
          </div>

          {/* GFS-AI - Full-width internal */}
          <div className="project-card">
            <div className="border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--amber)] flex flex-col">
              <div className="w-full bg-amber px-6 sm:px-8 py-2 border-b-[3px] border-ink flex items-center justify-between">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">
                  INTERNSHIP PRODUCTION WORK — AmberFlux EdgeAI — CASE_FILE // 04
                </span>
                <span className="font-mono text-[9px] font-bold text-ink uppercase">
                  LEAD SHEETS
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <ProjectCardInner project={internalProject} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}