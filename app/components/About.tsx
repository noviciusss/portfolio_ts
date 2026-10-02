"use client";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="about">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">// BACKGROUND</span>
        <h2 className="nb-section-heading">About</h2>

        <div className="nb-card p-6 md:p-8 bg-card shadow-[6px_6px_0_0_var(--ink)]">
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-foreground/90 font-sans mb-8">
            <p>
              I&apos;m a final-year CSE student at VIT Bhopal and an AI/ML engineering intern at AmberFlux EdgeAI, where I own the AI vision-extraction layer of a document pipeline for architectural drawings. I like the unglamorous parts of AI systems: retrieval quality, evaluation harnesses, failure handling, and cost-aware routing.
            </p>
            <p>
              Outside work I build agent systems end to end (RAG, LangGraph, MCP), measure them with LLM-judge evals, and ship them with CI/CD. I&apos;m looking for AI/LLM engineering roles starting 2027.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 w-full font-mono">
            <div className="border-[3px] border-border p-3.5 bg-background shadow-[3px_3px_0_0_var(--border)]">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-bold">
                // FOCUS
              </span>
              <div className="text-sm font-black text-accent mt-1">
                RAG & LLM Agents
              </div>
            </div>
            <div className="border-[3px] border-border p-3.5 bg-background shadow-[3px_3px_0_0_var(--border)]">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-bold">
                // EVALUATION
              </span>
              <div className="text-sm font-black text-foreground mt-1">
                LLM-as-a-Judge
              </div>
            </div>
            <div className="border-[3px] border-border p-3.5 bg-background shadow-[3px_3px_0_0_var(--border)]">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-bold">
                // TARGET
              </span>
              <div className="text-sm font-black text-foreground mt-1">
                2027 AI Engineering
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div>
            <Button asChild className="nb-btn nb-btn-secondary">
              <a href="/Samarth_Singh_FDE.pdf" download="Samarth_Singh_FDE.pdf">
                <FiDownload className="h-4 w-4" /> Download Resume (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}