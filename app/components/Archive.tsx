"use client";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const archiveProjects = [
  {
    title: "FLAN-T5 Dialogue Summarizer",
    desc: "LoRA fine-tuned FLAN-T5-base on SAMSum dataset (14.7K dialogues), updating only 2% of parameters. Achieved 49.01 ROUGE-1 · 72.25 BERTScore F1 · 42.51 METEOR.",
    stack: "Python · LoRA · Transformers · Gradio · HF Spaces",
    github: "https://github.com/noviciusss/flan-t5-summarizer",
    demo: "https://huggingface.co/spaces/noviciusss/dialogue-summarizer",
  },
  {
    title: "RoBERTa Banking77 Classifier",
    desc: "Fine-tuned RoBERTa-base on Banking77 dataset (77 intents, 13K queries) with AdamW and mixed precision. Achieved 93.7% accuracy and 93.6% macro-F1.",
    stack: "PyTorch · Transformers · CUDA · Python",
    github: "https://github.com/noviciusss/roberta-banking77",
    demo: "https://huggingface.co/noviciusss/RoBERTa-base_Banking77",
  },
];

export default function Archive() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="archive">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">// ARCHIVE</span>
        <h2 className="nb-section-heading">Fine-tuning & earlier work</h2>

        <div className="mb-8 max-w-xl text-sm text-muted-foreground font-sans">
          <p>
            Earlier experimental pipelines, PEFT fine-tuning runs, and machine learning foundations.
          </p>
        </div>

        <div className="space-y-5">
          {archiveProjects.map((proj, idx) => (
            <div
              key={idx}
              className="border-[3px] border-border bg-card p-5 shadow-[4px_4px_0_0_var(--border)] relative flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-display font-extrabold text-foreground uppercase tracking-tight">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-[9px] text-foreground bg-amber border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-bold">
                    MODEL
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {proj.desc}
                </p>
                <div className="font-mono text-[9px] text-accent font-bold tracking-wide">
                  // STACK: {proj.stack.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono self-start md:self-center shrink-0">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <FiGithub className="h-3.5 w-3.5" /> Code
                </a>

                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    aria-label={`View ${proj.title} live space`}
                  >
                    <FiExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Collapsed single line for earlier web work */}
          <div className="border-2 border-dashed border-border p-3.5 bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">// Earlier Web Projects:</span> Project Loom (Next.js, Sanity CMS, NextAuth full-stack project sharing platform).
            </div>
            <a
              href="https://github.com/noviciusss/projectloom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline font-bold shrink-0"
            >
              github.com/noviciusss/projectloom ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
