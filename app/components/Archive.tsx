"use client";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const archiveProjects = [
  {
    title: "FLAN-T5 Dialogue Summarizer",
    desc: "LoRA fine-tuned FLAN-T5-base on SAMSum dataset (14.7K dialogues), updating only 2% of parameters. Achieved 49.01 ROUGE-1 · 72.25 BERTScore F1 · 42.51 METEOR.",
    stack: "Python · LoRA · Transformers · Gradio · HF Spaces",
    github: "https://github.com/noviciusss/flan-t5-summarizer",
    demo: "https://huggingface.co/spaces/noviciusss/dialogue-summarizer"
  },
  {
    title: "RoBERTa Banking77 Classifier",
    desc: "Fine-tuned RoBERTa-base on Banking77 dataset (77 intents, 13K queries) with AdamW and mixed precision. Achieved 93.7% accuracy and 93.6% macro-F1.",
    stack: "PyTorch · Transformers · CUDA · Python",
    github: "https://github.com/noviciusss/roberta-banking77",
    demo: "https://huggingface.co/noviciusss/RoBERTa-base_Banking77"
  },
  {
    title: "Project Loom",
    desc: "Full-stack project sharing board featuring Next.js SSR/ISR, auth via NextAuth, and automated schema content delivery with Sanity.io headless CMS.",
    stack: "Next.js · TypeScript · Sanity.io · PostgreSQL",
    github: "https://github.com/noviciusss/projectloom",
    demo: "https://projectloom.vercel.app/"
  },
  {
    title: "Dexplorer",
    desc: "Interactive Pokémon discovery web application featuring instant client-side keyword filters, stats charts, and responsive layouts.",
    stack: "React · JavaScript · Tailwind CSS · PokéAPI",
    github: "https://github.com/noviciusss/Dexplorer",
    demo: "https://dexplorer-pokemon.vercel.app/"
  }
];

export default function Archive() {
  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-4xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 04 — HISTORICAL ARCHIVE</span>
        </div>

        <div className="mb-10 max-w-xl text-sm text-muted-foreground">
          <p>
            Earlier experimental pipelines, PEFT notebook fine-tuning runs, and core full-stack foundations. Archived for log completeness.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {archiveProjects.map((proj, idx) => (
            <div 
              key={idx}
              className="border border-border/60 hover:border-accent/40 bg-card/15 p-5 transition-colors relative flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-display font-medium text-foreground">
                    {proj.title}
                  </h4>
                  <span className="font-mono text-[9px] text-muted-foreground/60 border border-border/40 px-1.5 py-0.5">
                    ARCHIVED
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {proj.desc}
                </p>
                <div className="font-mono text-[9px] text-accent/80 tracking-wide">
                  {proj.stack}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono self-end md:self-center">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent flex items-center gap-1.5"
                >
                  <FiGithub className="h-4 w-4" />
                  <span className="hover-mechanical-link">Code</span>
                </a>
                
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent flex items-center gap-1.5"
                  >
                    <FiExternalLink className="h-4 w-4" />
                    <span className="hover-mechanical-link">Live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
