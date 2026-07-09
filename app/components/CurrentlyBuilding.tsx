"use client";
import { motion } from "framer-motion";
import { FiActivity, FiCpu, FiGithub } from "react-icons/fi";

export default function CurrentlyBuilding() {
  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-4xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 05 — ACTIVE DEVELOPMENT</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-accent/40 bg-accent/5 p-6 md:p-8 relative schematic-bracket-card max-w-2xl"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase flex items-center gap-1.5 animate-pulse">
                <FiActivity className="h-3.5 w-3.5 text-accent" />
                STATUS: IN_PROGRESS // PHASE_1
              </span>
              <h3 className="text-xl font-display font-medium text-foreground mt-2">
                AgentGuard
              </h3>
            </div>
            <div className="border border-accent/30 font-mono text-[9px] text-accent px-2 py-0.5 uppercase tracking-wider font-bold">
              Observability CLI
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
            An AST-based static analysis and observability CLI/GitHub Action for agentic AI codebases (LangGraph, CrewAI, AutoGen, MCP). Automates cyclic graph checks, checks FastMCP tool schema alignment, and implements three detection rules for missing checkpoint handlers. Backed by a full pytest validation suite.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-accent/20">
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[9px] text-muted-foreground/80 border border-border/40 px-2 py-0.5">AST Analysis</span>
              <span className="font-mono text-[9px] text-muted-foreground/80 border border-border/40 px-2 py-0.5">Pytest</span>
              <span className="font-mono text-[9px] text-muted-foreground/80 border border-border/40 px-2 py-0.5">GitHub Action</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70">
              <FiGithub className="h-3.5 w-3.5" />
              <span>Private workspace — Repo coming soon</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
