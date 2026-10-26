export type EvidenceCategory = "evaluation" | "performance" | "system-spec";

export type ProjectMetric = {
  label: string;
  displayValue: string;
  category: EvidenceCategory;
  scope: string;
  method?: string;
  limitations?: string[];
};

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  contribution: string;
  visibility: "public" | "internal-sanitized";
  featured: boolean;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  demoCaveat?: string;
  packageUrl?: string;
  problem: string;
  architecture: string[];
  tradeoffs: string[];
  evaluation: string[];
  limitations: string[];
  metrics: ProjectMetric[];
};

export const projects: PortfolioProject[] = [
  {
    slug: "docopilot",
    title: "DoCopilot — Multi-Tenant RAG",
    summary: "A document Q&A system with tenant isolation, hybrid retrieval, reranking, and source-cited answers.",
    contribution: "I built the retrieval, ingestion, guardrail, evaluation, and deployment flow across the application.",
    visibility: "public",
    featured: true,
    stack: ["Next.js", "FastAPI", "Qdrant", "BM25", "Docker", "Azure Container Apps"],
    repoUrl: "https://github.com/noviciusss/DoCopilot",
    demoUrl: "https://do-copilot.vercel.app/",
    problem: "Document Q&A across business files needed reliable tenant boundaries, useful retrieval, and answers that pointed back to source material.",
    architecture: [
      "JWT authentication and Qdrant payload filters keep retrieval scoped to a tenant.",
      "Celery and Redis move ingestion out of the request path, with SHA-256 upload deduplication.",
      "Dense MiniLM retrieval and BM25 are combined with reciprocal-rank fusion; a cross-encoder reranks the first 20 candidates to the final 5.",
      "SSE streams generated answers, while regex/PII guardrails and per-IP rate limiting bound unsafe or abusive requests.",
    ],
    tradeoffs: [
      "Hybrid retrieval adds indexing and query complexity in exchange for combining semantic and lexical matches.",
      "Reranking adds compute after initial retrieval and is treated as a configurable stage rather than a guaranteed quality improvement.",
      "The evaluation result is useful project evidence, not a general benchmark or production SLA.",
    ],
    evaluation: [
      "Historical repository evaluation: 40 questions (aws-q01 through aws-q40) about one AWS overview document.",
      "The saved means are 0.8925/1 for correctness and 0.905/1 for relevance. These are separate LLM-judge scores, not percentages of questions passed.",
      "The evaluation timer measured local, non-streaming query-pipeline wall time and saved a mean of 2.862 seconds, displayed as 2.86s.",
      "Correctness compares the answer with a reference answer and did not receive retrieved source context; it is not a groundedness or citation-correctness score.",
    ],
    limitations: [
      "The result file does not preserve the effective model IDs, reranker status, machine environment, source commit, or execution date.",
      "The evaluator maps judge failures and unparseable judge responses to 0.5 without identifying those events in the result schema.",
      "A keyword-overlap comparison and non-empty source-list count are intentionally not presented as headline evidence.",
    ],
    metrics: [
      {
        label: "Mean judge correctness",
        displayValue: "0.8925 / 1",
        category: "evaluation",
        scope: "40 AWS-document questions",
        method: "LLM judge against reference answers",
        limitations: ["Not groundedness or citation correctness"],
      },
      {
        label: "Mean judge relevance",
        displayValue: "0.905 / 1",
        category: "evaluation",
        scope: "40 AWS-document questions",
        method: "LLM judge using question and predicted answer",
      },
      {
        label: "Mean query-pipeline time",
        displayValue: "2.86s",
        category: "performance",
        scope: "Local, non-streaming evaluator process",
        method: "Wall clock around ask_question",
        limitations: ["Not deployed end-to-end, time-to-first-token, or p95 latency"],
      },
    ],
  },
  {
    slug: "argus",
    title: "Argus — Multi-Agent Research Engine",
    summary: "A LangGraph supervisor that routes planning, research, critique, and writing stages.",
    contribution: "I built the supervisor flow, specialist routing, persistence behavior, interrupt handling, and API surface.",
    visibility: "public",
    featured: true,
    stack: ["FastAPI", "LangGraph", "Docker", "LangSmith", "SQLite", "Postgres"],
    repoUrl: "https://github.com/noviciusss/Argus",
    demoUrl: "https://argus-h0uw.onrender.com/",
    demoCaveat: "The hosted demo may take additional time to wake up.",
    problem: "Deep research requires multiple source-gathering and editing steps, with a way to pause for human review instead of trusting one unbounded generation call.",
    architecture: [
      "A supervisor routes four specialist roles: planner, researcher, critic, and writer.",
      "Human-in-the-loop interruption is isolated in its own node so review can pause the flow cleanly.",
      "Checkpoint persistence can use SQLite or Postgres, with SSE for progress updates and LangSmith tracing where configured.",
      "Critique iterations are capped and review has a 30-minute auto-finalization path.",
    ],
    tradeoffs: [
      "More specialist steps create more coordination and failure surfaces than a single completion.",
      "In-process background work is simple to deploy but carries restart risk for in-flight jobs.",
      "Depth modes expose approximate completion estimates; they are not enforced deadlines or measured benchmarks.",
    ],
    evaluation: [
      "The repository defines three research-depth modes with approximate completion estimates.",
      "No measured research-accuracy, citation-quality, or reliability benchmark is claimed here.",
    ],
    limitations: [
      "The current deployed URL and hosting availability require a live browser check.",
      "In-flight work can be affected by process restarts when using the in-process background path.",
    ],
    metrics: [
      {
        label: "Research modes",
        displayValue: "Quick / standard / deep",
        category: "system-spec",
        scope: "Configured workflow options",
        limitations: ["Completion duration varies"],
      },
      {
        label: "Specialist roles",
        displayValue: "4 + supervisor",
        category: "system-spec",
        scope: "Planner, researcher, critic, writer",
      },
      {
        label: "Critique bound",
        displayValue: "Max 3 loops",
        category: "system-spec",
        scope: "Configured workflow limit",
      },
    ],
  },
  {
    slug: "contextcore",
    title: "ContextCore — Stateful Memory Agent",
    summary: "A CLI agent that separates checkpoint state, semantic recall, and user profile data.",
    contribution: "I built the intent router, FastMCP tools, memory layers, streaming flow, and assertion-based evaluation harness.",
    visibility: "public",
    featured: false,
    stack: ["LangGraph", "FastMCP", "PostgreSQL", "Qdrant", "MongoDB"],
    repoUrl: "https://github.com/noviciusss/ContextCore-CLI",
    problem: "A stateful CLI agent needs to distinguish exact execution state from semantic memory and user preferences instead of forcing all data into one store.",
    architecture: [
      "PostgreSQL stores tasks, notes, and graph checkpoint state.",
      "Qdrant handles semantic memory recall.",
      "MongoDB stores user profile and preference data.",
      "An intent router separates task, memory-recall, and chat flows through a custom FastMCP server.",
    ],
    tradeoffs: [
      "Three persistence systems make data responsibilities explicit but increase operational complexity.",
      "Background memory writes keep interaction responsive but require careful failure handling.",
      "Tool-schema normalization improves input handling, but the committed repository does not include a matching before/after failure report.",
    ],
    evaluation: [
      "The repository includes assertion-based checks for intent routing, tool selection, response content, and memory scenarios.",
      "The current dataset, runner, and committed report are out of sync, so no headline pass-rate claim is made.",
    ],
    limitations: [
      "The current repository does not support the previously published headline percentage claim.",
      "Evaluation resets task, note, and checkpoint data and must run against isolated test infrastructure.",
    ],
    metrics: [
      {
        label: "Memory layers",
        displayValue: "3 stores",
        category: "system-spec",
        scope: "PostgreSQL, Qdrant, MongoDB",
      },
      {
        label: "Current dataset",
        displayValue: "40 defined cases",
        category: "system-spec",
        scope: "Repository evaluation fixture",
        limitations: ["Runner and report require synchronization"],
      },
      {
        label: "Evaluation style",
        displayValue: "Assertions",
        category: "evaluation",
        scope: "Routing, tools, responses, memory",
      },
    ],
  },
  {
    slug: "agentguard",
    title: "AgentGuard — AI Agent Linter",
    summary: "Python static analysis for reliability, cost, and security risks in AI-agent codebases.",
    contribution: "I built a framework-aware analysis tool with documented rules, reports, fixtures, and safe fix previews.",
    visibility: "public",
    featured: true,
    stack: ["Python", "Static Analysis", "LangGraph", "JSON", "SARIF"],
    repoUrl: "https://github.com/noviciusss/AgentGuard",
    packageUrl: "https://pypi.org/project/agentguard-linter/",
    problem: "Agent code can hide missing timeouts, unbounded retries, unreachable graph nodes, and other operational risks that are difficult to catch in ordinary review.",
    architecture: [
      "A framework-neutral Python analysis core supports dedicated LangGraph integration.",
      "Documented rules cover reliability, cost, and security-oriented patterns.",
      "Reports can be emitted as JSON or SARIF, with graph output and fix dry-runs for inspection.",
      "Bundled fixtures demonstrate issues such as an unbounded retry loop, missing timeout, and unreachable graph node.",
    ],
    tradeoffs: [
      "Static analysis is fast and offline, but it cannot prove runtime behavior or external service correctness.",
      "Deliberately unsafe fixtures are useful for demonstration but should not be executed as agents.",
    ],
    evaluation: [
      "The repository documents 15 built-in rules and includes source-backed fixtures and rule examples.",
      "No detection-accuracy, false-positive, speed, or adoption benchmark is claimed.",
    ],
    limitations: [
      "The scanner should be run locally in an isolated environment before publishing output captures.",
      "Framework support is conservative: dedicated integration is documented for LangGraph; generic Python analysis covers other code.",
    ],
    metrics: [
      {
        label: "Documented rules",
        displayValue: "15",
        category: "system-spec",
        scope: "Repository rule documentation",
      },
      {
        label: "Report formats",
        displayValue: "JSON / SARIF",
        category: "system-spec",
        scope: "CLI output formats",
      },
      {
        label: "Dedicated integration",
        displayValue: "LangGraph",
        category: "system-spec",
        scope: "Framework-aware adapter",
      },
    ],
  },
  {
    slug: "gfs-ai",
    title: "GFS-AI — Document Intelligence Pipeline",
    summary: "An approved, sanitized internship project for extracting structured data from architectural drawings.",
    contribution: "At AmberFlux EdgeAI, I worked on the vision extraction, heuristic fallback, concurrency, validation, and aggregation layers.",
    visibility: "internal-sanitized",
    featured: false,
    stack: ["GPT-5 Vision", "Docling", "LangGraph", "Python", "asyncio"],
    problem: "Multi-page architectural drawing intake needed faster extraction and guardrails against missing or irrelevant page data.",
    architecture: [
      "Regex and Docling checks handle fields that can be extracted without a vision model.",
      "GPT-5 vision is conditionally dispatched only for missing fields.",
      "Concurrent batch work uses ThreadPoolExecutor and asyncio with retries and schema-enforced JSON outputs.",
      "LangGraph-routed aggregation combines document outputs with page-level validation and drawing-page exclusion.",
    ],
    tradeoffs: [
      "Heuristic-first extraction reduces unnecessary vision calls but requires careful fallback coverage.",
      "Concurrent dispatch improves throughput while making retries, ordering, and aggregation more important.",
    ],
    evaluation: [
      "The reported comparison is scoped to a tested 20-page drawing workload: approximately 7 minutes to approximately 90 seconds.",
      "Real lead-sheet runs reported confidence above 0.85, and the aggregation layer supports documents up to 400 pages.",
    ],
    limitations: [
      "The 20-page timing must not be interpreted as identical performance for 400-page documents.",
      "No client documents, identifiers, or confidential screenshots are included.",
    ],
    metrics: [
      {
        label: "Extraction comparison",
        displayValue: "7m → 90s",
        category: "performance",
        scope: "Tested 20-page drawings",
      },
      {
        label: "Confidence",
        displayValue: ">0.85",
        category: "evaluation",
        scope: "Real architectural lead sheets",
      },
      {
        label: "Document scale",
        displayValue: "Up to 400 pages",
        category: "system-spec",
        scope: "Aggregation layer support",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
