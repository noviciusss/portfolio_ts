"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiBookOpen, FiLock } from "react-icons/fi";

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
  problem: string;
  build: string;
  metrics: ProjectMetric[];
  tags: string[];
  github?: string;
  demo?: string;
  blog?: string;
  schematic?: string[];
  isInternal?: boolean;
  isFlagship?: boolean;
};

const featuredProjects: Project[] = [
  {
    index: "01",
    title: "DoCopilot -- RAG Document Q&A",
    isFlagship: true,
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
    demo: "https://do-copilot.vercel.app/",
    blog: "https://medium.com/@samarthsin2006/docopilot-building-a-production-grade-rag-system-with-hybrid-search-reranking-and-safety-c943fc2626be",
  },
  {
    index: "02",
    title: "Argus -- Multi-Agent Research Engine",
    problem:
      "Compiling research reports from Tavily, ArXiv, and Wikipedia was manual and time-consuming, requiring human iteration to trace sources and reject low-quality summaries.",
    build:
      "Built an autonomous research supervisor graph with LangGraph containing 5 specialist agents (planner, researcher, critic, writer, supervisor). Features cyclic routing, SQLite checkpointing for failure recovery, and end-to-end tracing in LangSmith. The critic agent rejects low-quality drafts and re-routes before writing.",
    metrics: [
      {
        label: "Research Time",
        value: "30-90s",
        countFrom: 0,
        countTo: 90,
        format: (n) => (n < 30 ? `${Math.round(n)}s` : `30-${Math.round(n)}s`),
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
    title: "ContextCore -- Stateful Memory Agent",
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
      "[User Command] --> [MCP Client/Agent]",
      "                         |",
      "        +----------------+----------------+",
      "        v (Intent Router)                 v (Recall)",
      "  [PostgreSQL] (State)             [Qdrant] (Semantic)",
    ],
  },
  {
    index: "04",
    title: "GFS-AI -- Document Intelligence Pipeline",
    isInternal: true,
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
    schematic: [
      "[PDF Source] --> [Docling (Regex Checks)]",
      "                        |",
      "         (Missing field Fallback)",
      "                        v",
      "  [GPT-5 Vision (concurrent)] --> [Structured JSON]",
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
    if (
      !valueRef.current ||
      metric.countFrom === undefined ||
      metric.countTo === undefined ||
      !metric.format
    )
      return;

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
    <div className="border-[3px] border-ink bg-canvas p-3 shadow-[2px_2px_0_0_var(--phosphor)] font-mono flex flex-col justify-between">
      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight">
        {metric.label}
      </span>
      <span
        ref={valueRef}
        className="text-sm sm:text-base font-black text-foreground mt-1"
      >
        {metric.countFrom !== undefined && metric.format
          ? metric.format(metric.countFrom)
          : metric.value}
      </span>
    </div>
  );
}

function ProjectCardInner({ project, idx }: { project: Project; idx: number }) {
  return (
    <>
      <div className="flex items-start justify-between border-b-[3px] border-border pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-accent font-bold uppercase">
              CASE_FILE // {project.index}
            </span>
            {project.isInternal && (
              <span className="font-mono text-[9px] text-foreground bg-amber border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-bold">
                INTERNAL
              </span>
            )}
          </div>
          <h3 className="text-xl font-display font-black text-foreground mt-1 uppercase">
            {project.title}
          </h3>
        </div>
      </div>

      {project.schematic && (
        <div className="w-full mb-6 border-[3px] border-border p-4 bg-canvas font-mono text-[9px] sm:text-[10px] text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre select-none shadow-[3px_3px_0_0_var(--ink)]">
          <div className="text-[9px] uppercase tracking-wider text-accent border-b-[2px] border-border pb-1 mb-2 font-bold">
            // ARCHITECTURE_SCHEMATIC
          </div>
          {project.schematic.join("\n")}
        </div>
      )}

      <div className="mb-5">
        <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-1.5 font-bold">
          // PROBLEM
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground font-sans">
          {project.problem}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-1.5 font-bold">
          // BUILD
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground font-sans">
          {project.build}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3 border-t-[3px] border-b-[3px] border-border py-4 mb-5">
          {project.metrics.map((metric, mIdx) => (
            <MetricCell
              key={mIdx}
              metric={metric}
              cardIdx={idx}
              metricIdx={mIdx}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
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

          <div className="flex items-center gap-3 text-xs font-mono">
            {project.isInternal ? (
              <span className="text-muted-foreground/50 border-[2px] border-border px-2 py-1 flex items-center gap-1.5 text-[10px] uppercase font-bold">
                <FiLock className="h-3 w-3" />
                Internal
              </span>
            ) : (
              project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <FiGithub className="h-3 w-3" /> Code
                </a>
              )
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-3 bg-accent text-accent-foreground border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <FiExternalLink className="h-3 w-3" /> Live
              </a>
            )}

            {project.blog && (
              <a
                href={project.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <FiBookOpen className="h-3 w-3" /> Analysis
              </a>
            )}
          </div>
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
        y: 32,
        duration: 0.6,
        stagger: 0.15,
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
      className="py-24 px-4 border-t-[3px] border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// CASE_FILES</span>
        <h2 className="nb-section-heading">Featured Projects</h2>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Production-grade AI/ML architectures -- every case file includes the
            problem, the build, and verifiable performance metrics.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* DoCopilot - Full-width flagship */}
          <div className="project-card border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--phosphor)] flex flex-col">
            <div className="w-full bg-phosphor px-8 py-2 border-b-[3px] border-ink">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">
                FLAGSHIP PROJECT -- CASE_FILE // 01
              </span>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <ProjectCardInner project={flagship} idx={0} />
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
                <ProjectCardInner project={project} idx={i + 1} />
              </div>
            ))}
          </div>

          {/* GFS-AI - Full-width internal */}
          <div className="project-card">
            <div className="border-[3px] border-ink bg-canvas shadow-[6px_6px_0_0_var(--amber)] flex flex-col opacity-75 hover:opacity-100 transition-opacity duration-300">
              <div className="w-full bg-amber px-8 py-2 border-b-[3px] border-ink">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">
                  INTERNAL WORK -- AmberFlux Pvt. Ltd. -- CASE_FILE // 04
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <ProjectCardInner project={internalProject} idx={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}