import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type EvidenceCategory } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found — Samarth Pratap Singh" };
  }

  return {
    title: `${project.title} — Samarth Pratap Singh`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Samarth Pratap Singh`,
      description: project.summary,
      type: "article",
    },
  };
}

const categoryLabels: Record<EvidenceCategory, string> = {
  evaluation: "Evaluation result",
  performance: "Performance result",
  "system-spec": "System specification",
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground py-24 px-4">
      <article className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-8 font-mono text-xs">
          <Link href="/#projects" className="underline underline-offset-4 hover:text-accent">
            ← Back to projects
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Case study</span>
        </div>

        <header className="border-[3px] border-ink bg-canvas p-6 sm:p-10 shadow-[7px_7px_0_0_var(--phosphor)]">
          <span className="nb-section-label">// {project.visibility === "internal-sanitized" ? "APPROVED_SANITIZED_WORK" : "CASE_FILE"}</span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase leading-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/85 font-sans">
            {project.summary}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground font-sans">
            <strong className="text-foreground">My contribution:</strong> {project.contribution}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <span key={technology} className="font-mono text-xs border-2 border-border bg-background px-2.5 py-1">
                {technology}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-primary text-xs">
                Code ↗
              </a>
            )}
            {project.packageUrl && (
              <a href={project.packageUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-secondary text-xs">
                Package ↗
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-secondary text-xs">
                Demo ↗
              </a>
            )}
          </div>
          {project.demoCaveat && <p className="mt-3 font-mono text-xs text-muted-foreground">{project.demoCaveat}</p>}
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <CaseStudySection title="Problem" items={[project.problem]} />
          <CaseStudySection title="Architecture" items={project.architecture} />
          <CaseStudySection title="Trade-offs" items={project.tradeoffs} />
          <CaseStudySection title="Evaluation" items={project.evaluation} />
        </div>

        <section className="mt-8 border-[3px] border-border bg-card p-6 sm:p-8 shadow-[5px_5px_0_0_var(--amber)]">
          <span className="nb-section-label">// EVIDENCE_DETAILS</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase">How this was measured</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border-2 border-border bg-canvas p-4">
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                <p className="mt-2 font-display text-xl font-black">{metric.displayValue}</p>
                <p className="mt-2 text-sm text-foreground/80 font-sans">{metric.scope}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-accent">{categoryLabels[metric.category]}</p>
                {metric.method && <p className="mt-2 text-xs text-muted-foreground font-sans">{metric.method}</p>}
                {metric.limitations?.map((limitation) => (
                  <p key={limitation} className="mt-2 text-xs text-muted-foreground font-sans">Limit: {limitation}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <CaseStudySection title="Limitations and operational constraints" items={project.limitations} className="mt-8" />
      </article>
    </main>
  );
}

function CaseStudySection({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  return (
    <section className={`border-2 border-border bg-card p-6 ${className}`}>
      <span className="nb-section-label">// {title.toUpperCase().replaceAll(" ", "_")}</span>
      <h2 className="font-display text-2xl font-black uppercase">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground font-sans">
        {items.map((item) => (
          <li key={item} className="relative pl-5">
            <span className="absolute left-0 text-accent font-black">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
