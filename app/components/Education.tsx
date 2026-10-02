"use client";
import { FiBookOpen, FiCalendar, FiMapPin, FiAward, FiExternalLink } from "react-icons/fi";

const publishedModels = [
  {
    name: "FLAN-T5 Dialogue Summarizer",
    task: "LoRA Fine-Tuning · SAMSum Dataset",
    metrics: "49.01 ROUGE-1 · 72.25 BERTScore F1 · 42.51 METEOR",
    desc: "Parameter-efficient fine-tuning updating only 2% of parameters while matching full fine-tuning performance.",
    hubUrl: "https://huggingface.co/spaces/noviciusss/dialogue-summarizer",
    githubUrl: "https://github.com/noviciusss/flan-t5-summarizer",
  },
  {
    name: "RoBERTa Banking77 Classifier",
    task: "Intent Classification · 77 Categories",
    metrics: "93.7% Accuracy · 93.6% Macro-F1",
    desc: "Fine-tuned with AdamW and mixed precision on 13K customer banking queries.",
    hubUrl: "https://huggingface.co/noviciusss/RoBERTa-base_Banking77",
    githubUrl: "https://github.com/noviciusss/roberta-banking77",
  },
];

const certifications = [
  {
    name: "Applied Machine Learning in Python",
    issuer: "University of Michigan (Coursera)",
    year: "2025",
  },
  {
    name: "Google IT Support Professional Certificate",
    issuer: "Google Career Certificates",
    credentialId: "whvAjzYf",
    url: "https://www.credly.com/go/whvAjzYf",
    year: "2026",
  },
];

export default function Education() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="education">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">// CREDENTIALS</span>
        <h2 className="nb-section-heading">Education & publications</h2>

        <div className="space-y-8">
          {/* Education Card */}
          <div className="nb-card p-6 md:p-8 bg-card shadow-[6px_6px_0_0_var(--ink)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-border pb-5 mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-foreground mb-1 uppercase">
                  B.Tech in Computer Science and Engineering
                </h3>
                <div className="font-mono text-xs text-foreground font-bold flex items-center gap-1.5">
                  <FiBookOpen className="h-3.5 w-3.5" />
                  <span>VIT Bhopal University</span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs text-muted-foreground font-bold">
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="h-3.5 w-3.5 text-foreground" />
                  2023 – 2027
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="h-3.5 w-3.5 text-foreground" />
                  Bhopal, Madhya Pradesh
                </span>
              </div>
            </div>

            {/* Single verified CGPA display */}
            <div className="border-[3px] border-border bg-accent p-3.5 shadow-[4px_4px_0_0_var(--border)] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <span className="text-[10px] uppercase text-foreground/80 tracking-wider font-extrabold">
                // VERIFIED_ACADEMIC_CGPA
              </span>
              <span className="text-xl font-black text-foreground">8.61 / 10</span>
            </div>

            {/* Coursework */}
            <div>
              <h4 className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-2.5 font-bold">
                // SELECTED_COURSEWORK
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structures & Algorithms",
                  "Operating Systems",
                  "Database Management Systems",
                  "Computer Networks",
                  "Cloud Computing",
                  "Software Engineering",
                ].map((course, idx) => (
                  <span
                    key={idx}
                    className={`font-mono text-xs text-foreground border-2 border-border bg-background px-2.5 py-1 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${idx % 3}`}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Published Models (Hugging Face) */}
          <div className="border-[3px] border-border bg-card p-6 md:p-8 shadow-[6px_6px_0_0_var(--phosphor)]">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-display font-black text-foreground uppercase">
                Published Fine-Tuned Models (Hugging Face)
              </h3>
            </div>

            <div className="space-y-4">
              {publishedModels.map((model, idx) => (
                <div
                  key={idx}
                  className="border-2 border-border bg-canvas p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-extrabold text-base text-foreground uppercase">
                        {model.name}
                      </h4>
                      <span className="font-mono text-[9px] bg-accent/25 border border-border px-1.5 py-0.5 font-bold">
                        {model.task}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-accent">
                      // {model.metrics}
                    </div>
                    <p className="text-xs text-muted-foreground font-sans">
                      {model.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono shrink-0">
                    <a
                      href={model.hubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nb-btn text-[10px] py-1 px-3 bg-background border-2 shadow-[2px_2px_0_0_var(--border)]"
                      aria-label={`View ${model.name} on Hugging Face`}
                    >
                      <FiExternalLink className="h-3 w-3" /> Model
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* One-Line Certifications */}
          <div className="border-[2px] border-border bg-background p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
            <div className="font-bold uppercase tracking-wider text-foreground">
              Certifications:
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-accent font-bold">•</span>
                  <span>{cert.name} ({cert.issuer}, {cert.year})</span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline ml-0.5 text-foreground font-bold"
                      aria-label="View credential verification"
                    >
                      verify ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}