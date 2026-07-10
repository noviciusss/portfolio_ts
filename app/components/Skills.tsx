"use client";
import { motion } from "framer-motion";
import RagBuilder from "./RagBuilder";

const skillsData = [
  {
    category: "Languages",
    skills: ["Python", "C++", "TypeScript", "SQL"]
  },
  {
    category: "ML/DL",
    skills: ["PyTorch", "TensorFlow", "Transformers", "PEFT/LoRA", "Scikit-learn"]
  },
  {
    category: "LLM & Agents",
    skills: ["LangGraph", "LangChain", "RAG", "Tool-Calling"]
  },
  {
    category: "Retrieval",
    skills: ["Qdrant", "FAISS", "Hybrid Search (BM25+Dense)", "Reranking"]
  },
  {
    category: "Backend & Infra",
    skills: ["FastAPI", "Docker", "PostgreSQL", "Next.js", "Linux"]
  },
  {
    category: "Eval & Observability",
    skills: ["LLM-as-Judge", "Ragas", "LangSmith", "MLflow"]
  }
];

export default function Skills() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 04</span>
        <h2 className="nb-section-heading">Skills</h2>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Technical competencies structured by architectural layer. Evaluated and deployed across active projects.
          </p>
        </div>

        {/* Small ASCII Stack Pipeline diagram above tags list */}
        <div className="w-full max-w-xl mb-8 border-[3px] border-border p-4 bg-amber/5 font-mono text-[10px] text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre select-none shadow-[4px_4px_0_0_var(--border)]">
          <div className="text-[10px] uppercase tracking-wider text-accent border-b-[2px] border-border/30 pb-1 mb-2 font-bold">
            // COMPOSITION_STACK
          </div>
          {"[Data Input] ──> [Retrieval Layer] ──> [Agent Reasoning] ──> [LLM / Tool Execute] ──> [Continuous Eval]\n                 (Qdrant/FAISS)       (LangGraph Cyclic)        (Groq/GPT-5/FastMCP)      (Ragas/LangSmith)"}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="nb-card p-6 md:p-8 bg-card"
        >
          {skillsData.map((cat, idx) => (
            <div 
              key={idx}
              className="flex flex-col sm:flex-row sm:items-start justify-between py-6 border-b-[3px] border-border/20 last:border-b-0 gap-3"
            >
              <div className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider min-w-[150px] pt-1">
                // {cat.category}
              </div>
              <div className="flex flex-wrap gap-2.5 sm:max-w-md">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`font-mono text-xs text-foreground border-2 border-border bg-background px-3 py-1 shadow-[2px_2px_0_0_var(--border)] tag-tilt-${(idx + sIdx) % 3}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interactive RAG Pipeline Playground */}
        <div className="mt-12">
          <RagBuilder />
        </div>
      </div>
    </section>
  );
}