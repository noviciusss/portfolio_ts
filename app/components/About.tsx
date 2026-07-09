"use client";
import { motion } from "framer-motion";
import { FiDownload, FiUser, FiCode, FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMemo } from "react";

export default function About() {
  const stats = useMemo(() => [
    { icon: <FiUser size={16} />, label: "Years Experience", value: "2+" },
    { icon: <FiCode size={16} />, label: "Projects Completed", value: "10+" },
    { icon: <FiStar size={16} />, label: "CGPA (VIT Bhopal)", value: "8.57 / 10" },
  ], []);

  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 01 — BIO DATA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Section */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 border border-border p-2 bg-card/50 schematic-bracket-card">
              <div className="relative w-full h-full border border-border overflow-hidden bg-background flex flex-col items-center justify-center p-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-border bg-card shadow-md">
                  <Image 
                    src="/unnamed.jpg"
                    alt="Samarth Singh profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full grayscale contrast-[1.05]"
                    sizes="128px"
                    priority
                  />
                </div>
                <h4 className="mt-4 font-display font-medium text-foreground text-sm">
                  Samarth Singh
                </h4>
                <span className="font-mono text-[10px] text-accent mt-0.5 tracking-wider uppercase">
                  AI/ML Engineer
                </span>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-foreground mb-4">
              AI/ML Engineer & Systems Research Enthusiast
            </h3>
            
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mb-8 font-sans">
              <p>
                BTech Computer Science student at VIT Bhopal University (CGPA 8.57) specializing in Generative AI, RAG systems, and LLMOps. Proven expertise in building production-ready LLM applications with semantic search, hybrid retrieval (BM25 + dense vectors), and parameter-efficient fine-tuning (LoRA/PEFT). Experienced in deploying transformer models with evaluation frameworks achieving 89%+ correctness.
              </p>
              <p>
                Passionate about making LLMs more accurate and grounded through intelligent retrieval architectures. Published fine-tuned models on Hugging Face with comprehensive evaluation (ROUGE, BERTScore, METEOR). Seeking AI/ML and LLMOps roles to build scalable AI systems that solve real-world problems with measurable, verified impact.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="border border-border/80 p-4 bg-card/20 font-mono text-xs flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 text-accent">
                    {stat.icon}
                    <span className="text-[10px] uppercase text-muted-foreground/60 tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-base font-bold text-foreground mt-2">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Download Button */}
            <div className="w-full">
              <Button asChild size="lg" className="bg-transparent hover:bg-secondary hover:text-foreground text-muted-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-border/80 transition-all duration-200 gap-2">
                <a
                  href="/Resume.pdf" 
                  download="Resume"
                >
                  <FiDownload className="h-4 w-4" /> DOWNLOAD_RESUME.PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}