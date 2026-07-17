"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RagBuilder from "./RagBuilder";

gsap.registerPlugin(ScrollTrigger);

const skillBento = [
  {
    id: "lang-retrieval",
    category: "Languages + Retrieval",
    skills: ["Python", "C++", "TypeScript", "SQL", "Qdrant", "FAISS", "Hybrid Search (BM25+Dense)", "Reranking"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[6px_6px_0_0_var(--ink)]",
  },
  {
    id: "ml-dl",
    category: "ML / DL",
    skills: ["PyTorch", "TensorFlow", "Transformers", "PEFT/LoRA", "Scikit-learn"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[6px_6px_0_0_var(--phosphor)]",
  },
  {
    id: "llm-agents",
    category: "LLM & Agents",
    skills: ["LangGraph", "LangChain", "RAG", "Tool-Calling", "FastMCP", "Groq"],
    colSpan: "lg:col-span-4",
    shadow: "shadow-[6px_6px_0_0_var(--amber)]",
  },
  {
    id: "backend",
    category: "Backend & Infrastructure",
    skills: ["FastAPI", "Docker", "PostgreSQL", "MongoDB", "Next.js", "Linux", "asyncio", "ThreadPoolExecutor"],
    colSpan: "lg:col-span-12",
    shadow: "shadow-[6px_6px_0_0_var(--ink)]",
    fullWidth: true,
  },
  {
    id: "eval",
    category: "Eval & Observability",
    skills: ["LLM-as-Judge", "Ragas", "LangSmith", "MLflow", "W&B"],
    colSpan: "lg:col-span-12",
    shadow: "shadow-[6px_6px_0_0_var(--amber)]",
    fullWidth: true,
    amberAccent: true,
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".skill-cell", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// STACK_LAYERS</span>
        <h2 className="nb-section-heading">Skills</h2>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Technical competencies structured by architectural layer — evaluated and deployed across active production projects.
          </p>
        </div>

        {/* Architecture pipeline diagram */}
        <div className="w-full mb-10 border-[3px] border-ink p-4 bg-canvas font-mono text-[10px] text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre select-none shadow-[4px_4px_0_0_var(--ink)]">
          <div className="text-[10px] uppercase tracking-wider text-accent border-b-[2px] border-border pb-1 mb-2 font-bold">
            // COMPOSITION_STACK
          </div>
          {"[Data Input] --> [Retrieval Layer] --> [Agent Reasoning] --> [LLM / Tool Execute] --> [Continuous Eval]\n               (Qdrant/FAISS)     (LangGraph Cyclic)    (Groq/GPT-5/FastMCP)   (Ragas/LangSmith)"}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {skillBento.map((cell) => (
            <div
              key={cell.id}
              className={`skill-cell border-[3px] border-ink bg-canvas p-6 ${cell.colSpan} ${cell.shadow} ${
                cell.amberAccent ? "border-l-[6px] border-l-amber" : ""
              }`}
            >
              <div className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold mb-4">
                // {cell.category}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cell.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`font-mono text-xs text-foreground border-2 border-border bg-background px-3 py-1 shadow-[2px_2px_0_0_var(--border)] tag-tilt-${sIdx % 3}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RagBuilder demo zone — separated by amber border */}
        <div className="mt-12 border-t-[6px] border-amber pt-12">
          <RagBuilder />
        </div>
      </div>
    </section>
  );
}