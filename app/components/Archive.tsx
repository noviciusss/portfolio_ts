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
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 08</span>
        <h2 className="nb-section-heading">Historical Archive</h2>

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
          className="space-y-6"
        >
          {archiveProjects.map((proj, idx) => (
            <div 
              key={idx}
              className="border-[3px] border-border bg-card p-5 shadow-[4px_4px_0_0_var(--border)] relative flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-display font-extrabold text-foreground uppercase tracking-tight">
                    {proj.title}
                  </h4>
                  <span className="font-mono text-[9px] text-foreground bg-amber border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-bold">
                    ARCHIVED
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {proj.desc}
                </p>
                <div className="font-mono text-[9px] text-accent font-bold tracking-wide">
                  // STACK: {proj.stack.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono self-end md:self-center">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <FiGithub className="h-3.5 w-3.5" /> Code
                </a>
                
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    <FiExternalLink className="h-3.5 w-3.5" /> Live
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
