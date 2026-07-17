"use client";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// ORIGIN_LOG</span>
        <h2 className="nb-section-heading">The developer</h2>

        <div className="nb-card p-6 md:p-8 bg-card">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-foreground mb-4">
            AI/ML Engineer & Systems Developer
          </h3>
          
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mb-8 font-sans">
            <p>
              I am Samarth Pratap Singh, a BTech Computer Science student at VIT Bhopal University (CGPA 8.57) specializing in Generative AI, RAG systems, and LLMOps. I focus on building robust retrieval pipelines and multi-agent graphs where performance is measured and verified. 
            </p>
            <p>
              My expertise includes designing hybrid search indexes, implementing reciprocal rank fusion (RRF) rerankers, fine-tuning LLMs with PEFT/LoRA, and automating systems validation using LLM-as-a-Judge frameworks. I seek to build scalable AI applications with clear, documented results.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full">
            <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
              <span className="font-mono text-[9px] uppercase text-muted-foreground/60 tracking-wider">
                // DOCOPILOT_RAG
              </span>
              <div className="text-base font-black text-accent mt-1">
                89.2% Correctness
              </div>
            </div>
            <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
              <span className="font-mono text-[9px] uppercase text-muted-foreground/60 tracking-wider">
                // GFS_PIPELINE
              </span>
              <div className="text-base font-black text-foreground mt-1">
                7m → 90s Latency
              </div>
            </div>
            <div className="border-[3px] border-border p-4 bg-card shadow-[4px_4px_0_0_var(--border)]">
              <span className="font-mono text-[9px] uppercase text-muted-foreground/60 tracking-wider">
                // ACADEMIC_CGPA
              </span>
              <div className="text-base font-black text-foreground mt-1">
                8.57 / 10
              </div>
            </div>
          </div>
          
          {/* Download Button */}
          <div className="w-full">
            <Button asChild className="nb-btn nb-btn-secondary">
              <a href="/Resume.pdf" download="Samarth_Pratap_Singh_Resume">
                <FiDownload className="h-4 w-4" /> DOWNLOAD_RESUME.PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}