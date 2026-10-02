"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: "languages",
    category: "Languages",
    skills: ["Python", "C++", "TypeScript", "SQL"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[5px_5px_0_0_var(--ink)]",
  },
  {
    id: "ml-dl",
    category: "ML / DL",
    skills: ["PyTorch", "TensorFlow", "Transformers", "PEFT / LoRA", "Scikit-learn"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[5px_5px_0_0_var(--phosphor)]",
  },
  {
    id: "llm-agents",
    category: "LLM & Agents",
    skills: ["LangGraph", "LangChain", "RAG Systems", "Tool-Calling", "FastMCP"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[5px_5px_0_0_var(--amber)]",
  },
  {
    id: "retrieval",
    category: "Retrieval",
    skills: ["Qdrant", "FAISS", "Hybrid Search (BM25 + Dense)", "RRF Fusion", "Cross-Encoder Rerank"],
    colSpan: "lg:col-span-6",
    shadow: "shadow-[5px_5px_0_0_var(--phosphor)]",
  },
  {
    id: "backend-web",
    category: "Backend & Web",
    skills: ["FastAPI", "PostgreSQL", "MongoDB", "Next.js", "Redis", "Concurrency (asyncio)"],
    colSpan: "lg:col-span-6",
    shadow: "shadow-[5px_5px_0_0_var(--ink)]",
  },
  {
    id: "delivery",
    category: "Delivery & DevOps",
    skills: ["Docker", "Azure Container Apps", "GitHub Actions CI/CD", "pytest", "LangSmith"],
    colSpan: "lg:col-span-6",
    shadow: "shadow-[5px_5px_0_0_var(--amber)]",
    amberAccent: true,
  },
  {
    id: "eval",
    category: "Evaluation & Observability",
    skills: ["LLM-as-a-Judge", "Ragas", "LangSmith Tracing", "MLflow", "W&B"],
    colSpan: "lg:col-span-6",
    shadow: "shadow-[5px_5px_0_0_var(--ink)]",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-cell", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// STACK</span>
        <h2 className="nb-section-heading">Skills</h2>

        <div className="mb-10 max-w-xl text-sm text-muted-foreground font-sans">
          <p>
            Technical competencies structured across core engineering layers — verified across active systems and evaluation benchmarks.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {skillCategories.map((cell) => (
            <div
              key={cell.id}
              className={`skill-cell border-[3px] border-ink bg-canvas p-5 ${cell.colSpan} ${cell.shadow} ${
                cell.amberAccent ? "border-l-[6px] border-l-amber" : ""
              }`}
            >
              <div className="font-mono text-[11px] text-accent uppercase tracking-widest font-extrabold mb-3">
                // {cell.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {cell.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`font-mono text-xs text-foreground border-2 border-border bg-background px-2.5 py-1 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${sIdx % 3}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}