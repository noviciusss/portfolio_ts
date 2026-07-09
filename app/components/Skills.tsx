"use client";
import { motion } from "framer-motion";

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
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-4xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 06 — SKILLS CATALOG</span>
        </div>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Technical competencies structured by architectural layer. Evaluated and deployed across active projects.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border/60 p-6 md:p-8 bg-card/15"
        >
          {skillsData.map((cat, idx) => (
            <div 
              key={idx}
              className="flex flex-col sm:flex-row sm:items-start justify-between py-4 border-b border-border/30 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 gap-3"
            >
              <div className="font-mono text-xs font-bold text-muted-foreground/60 uppercase tracking-wider min-w-[150px] pt-1">
                // {cat.category}
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-md">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-xs text-foreground border border-border/70 bg-background px-2.5 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}