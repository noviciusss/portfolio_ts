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
  packageUrl?: string;
  caseStudy?: string;
  demo?: string;
  demoNote?: string;
  blog?: string;
  diagramType?: "contextcore" | "gfsai";
};

const featuredProjects: Project[] = [
  {
    index: "01",
    title: "DoCopilot — Multi-Tenant RAG",
    outcome: "Multi-tenant RAG evaluated on 40 AWS-document questions with mean LLM-judge scores for correctness and relevance.",
    evalNote: "Historical repository result · model configuration and execution date were not preserved",
    isFlagship: true,
    problem:
      "Document Q&A across multi-format business files suffered from hallucinated context, absent source attribution, and lack of strict multi-tenant boundary isolation.",
    build:
      "Built a multi-tenant RAG platform with JWT authentication and Qdrant payload-filtered retrieval. Features SHA-256 upload deduplication, Celery + Redis async ingestion, hybrid search (MiniLM dense vectors + BM25 with Reciprocal Rank Fusion), and cross-encoder reranking from top-20 down to top-5. Implemented SSE token streaming, source-cited answers, PII/regex guardrails, per-IP rate limiting, and CI/CD via GitHub Actions (pytest → Docker → ACR → Azure Container Apps).",
    metrics: [
      {
        label: "Correctness",
        value: "0.8925 / 1",
      },
      {
        label: "Relevance",
        value: "0.905 / 1",
      },
      {
        label: "Avg Latency",
        value: "2.86s",
      },
    ],
    tags: ["FastAPI", "Next.js", "Qdrant", "Hybrid Search (RRF)", "Cross-Encoder", "Docker", "Azure Container Apps"],
    github: "https://github.com/noviciusss/DoCopilot",
    demo: "https://do-copilot.vercel.app/",
    caseStudy: "/projects/docopilot",
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
      "Built a LangGraph supervisor agent orchestrating 4 specialists (planner, researcher, critic, writer) routed dynamically via Command(goto). Features three research-depth modes with approximate completion estimates, isolated Human-In-The-Loop interrupt nodes, maximum 3 critique feedback loops before 30-minute auto-finalization, SSE streaming, SQLite/Postgres auto-switching checkpoint persistence, and LangSmith tracing packaged with Docker.",
    metrics: [
      {
        label: "Depth Modes",
        value: "Quick / standard / deep",
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
    caseStudy: "/projects/argus",
    demoNote: "Hosted on Render — cold start may take ~30s",
  },
  {
    index: "03",
    title: "ContextCore — Stateful Memory Agent",
    outcome: "LangGraph CLI agent separating checkpoint state, semantic recall, and profile data across three stores.",
    evalNote: "Assertion-based evaluation coverage is being synchronized with the current implementation",
    problem:
      "CLI agents lose state across sessions, and standard single-vector memory stores hallucinate user profile data or overwrite active execution states.",
    build:
      "Designed an intent-routed LangGraph CLI agent (task / memory-recall / chat) backed by a custom FastMCP server on PostgreSQL. Implements three distinct memory layers: Postgres checkpointing for exact step states, Qdrant for semantic recall, and MongoDB for persistent user profiles. Features astream_events token streaming, async background memory persistence, and an assertion-based evaluation harness for intent routing, tool selection, response assertions, and memory scenarios.",
    metrics: [
      {
        label: "Current Cases",
        value: "40 defined",
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
    caseStudy: "/projects/contextcore",
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
    caseStudy: "/projects/gfs-ai",
  },
  {
    index: "05",
    title: "AgentGuard — AI Agent Linter",
    outcome: "Python static analysis for reliability, cost, and security risks in AI-agent codebases.",
    evalNote: "15 documented rules · JSON/SARIF output · LangGraph integration",
    problem:
      "Agent workflows can hide unbounded retries, missing timeouts, unreachable graph nodes, and other operational risks inside ordinary Python code.",
    build:
      "Built a framework-aware Python linter with a generic analysis core, dedicated LangGraph integration, documented rules, JSON/SARIF reporting, graph output, and dry-run fix previews. The repository includes deliberately unsafe fixtures and rule documentation for local inspection.",
    metrics: [
      { label: "Rules", value: "15 documented" },
      { label: "Reports", value: "JSON / SARIF" },
      { label: "Framework", value: "LangGraph" },
    ],
    tags: ["Python", "Static Analysis", "LangGraph", "JSON", "SARIF"],
    github: "https://github.com/noviciusss/AgentGuard",
    packageUrl: "https://pypi.org/project/agentguard-linter/",
    caseStudy: "/projects/agentguard",
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
            <span className="font-mono text-[9px] text-on-accent bg-amber border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-bold">
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

          {project.packageUrl && (
            <a
              href={project.packageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
              aria-label={`View ${project.title} package`}
            >
              <FiExternalLink className="h-3.5 w-3.5" /> Package
            </a>
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

          {project.caseStudy && (
            <a
              href={project.caseStudy}
              className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
              aria-label={`Read the ${project.title} case study`}
            >
              <FiBookOpen className="h-3.5 w-3.5" /> Case study
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
  const agentGuard = featuredProjects[4];

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

          {/* AgentGuard - secondary public project */}
          <div className="project-card border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--phosphor)] flex flex-col">
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <ProjectCardInner project={agentGuard} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
