"use client";
import { motion } from "framer-motion";
import { FiActivity, FiCpu, FiGithub } from "react-icons/fi";

export default function CurrentlyBuilding() {
  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 09</span>
        <h2 className="nb-section-heading">Active Development</h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="nb-card-phosphor p-6 md:p-8 bg-card max-w-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 pb-4 border-b-2 border-border/20">
            <div>
              <span className="font-mono text-[10px] text-accent-foreground bg-accent border-2 border-border px-2 py-0.5 uppercase tracking-widest font-extrabold shadow-[2px_2px_0_0_var(--border)] inline-flex items-center gap-1.5">
                <FiActivity className="h-3.5 w-3.5 text-foreground" />
                STATUS: IN_PROGRESS
              </span>
              <h3 className="text-2xl font-display font-black text-foreground mt-3 uppercase">
                AgentGuard
              </h3>
            </div>
            <div className="border-2 border-border bg-amber font-mono text-[9px] text-foreground px-2 py-0.5 uppercase tracking-wider font-extrabold shadow-[2px_2px_0_0_var(--border)]">
              Observability CLI
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
            An AST-based static analysis and observability CLI/GitHub Action for agentic AI codebases (LangGraph, CrewAI, AutoGen, MCP). Automates cyclic graph checks, checks FastMCP tool schema alignment, and implements three detection rules for missing checkpoint handlers. Backed by a full pytest validation suite.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-[3px] border-border/20">
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[9px] text-foreground border-2 border-border bg-background px-2.5 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-0">AST Analysis</span>
              <span className="font-mono text-[9px] text-foreground border-2 border-border bg-background px-2.5 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-1">Pytest</span>
              <span className="font-mono text-[9px] text-foreground border-2 border-border bg-background px-2.5 py-0.5 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-2">GitHub Action</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <FiGithub className="h-3.5 w-3.5 text-foreground" />
              <span className="font-bold">Private workspace — Repo coming soon</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
