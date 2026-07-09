"use client";
import { FiLayout, FiLayers, FiPenTool, FiCpu, FiBarChart2, FiServer, FiArrowRight, FiActivity } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: <FiLayout size={24} />,
    title: "Frontend Engineering",
    desc: "Crafting highly performant, type-safe, and responsive interfaces with Next.js, TypeScript, and Tailwind CSS. Optimizing bundle size and loading states."
  },
  {
    icon: <FiLayers size={24} />,
    title: "Full-Stack Applications",
    desc: "Building scalable web platforms from database architectures to UI state management, utilizing robust design patterns and serverless deployment."
  },
  {
    icon: <FiCpu size={24} />,
    title: "AI/ML Solutions",
    desc: "Developing intelligent features, semantic vector spaces, fine-tuning scripts (LoRA/PEFT), and parameter-efficient model configurations."
  },
  {
    icon: <FiServer size={24} />,
    title: "Backend & API Systems",
    desc: "Architecting high-concurrency async dispatch APIs and job workers using Python, FastAPI, Docker, and PostgreSQL."
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: "Retrieval Pipelines (RAG)",
    desc: "Constructing hybrid search spaces, fusion mechanisms (RRF), cross-encoder rerankers, semantic recall indexes, and LLM-as-Judge evaluation rigs."
  },
  {
    icon: <FiPenTool size={24} />,
    title: "Agentic Workflows",
    desc: "Orchestrating stateful multi-agent supervisor systems using LangGraph cyclic flows, memory checkpointers, and LangSmith observability."
  }
];

const workProcess = [
  {
    step: "01",
    phase: "DISCOVERY & ANALYSIS",
    details: "Specifying constraints, scaling profiles, and success indices. Running early sanity baseline tests on sample data."
  },
  {
    step: "02",
    phase: "ARCHITECTURE DESIGN",
    details: "Diagramming pipeline loops, choosing checkpoint stores, designing database indexes and retrieval models."
  },
  {
    step: "03",
    phase: "LOGIC IMPLEMENTATION",
    details: "Writing clean, type-safe modules, writing unit/integration test cases, and verifying runtime latency."
  },
  {
    step: "04",
    phase: "EVALUATION & HARNESSING",
    details: "Running prompt/context ablation passes, evaluating recall curves, and running validation scripts."
  },
  {
    step: "05",
    phase: "DEPLOYMENT & LAUNCH",
    details: "Dockerizing configurations, setting up CI actions, configuring logging alerts, and dispatching to staging."
  }
];

export default function ServicesPage() {
  const router = useRouter();

  const handleContactRedirect = () => {
    router.push('/#contact');
  };

  return (
    <div className="relative min-h-screen py-24 px-6 bg-background">
      {/* Background static grid paper */}
      <div className="graph-paper-bg fixed inset-0 -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Monospace Header */}
        <div className="log-header mb-8">
          <span>// SERVICES DIRECTORY</span>
        </div>

        {/* Display Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-foreground tracking-tight max-w-xl mb-4">
            Technical Offerings & Architectural Process
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-xl leading-relaxed">
            Constructing reliable systems utilizing verified patterns in retrieval, backend, and agent architectures.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="border border-border/80 p-5 bg-card/25 relative flex flex-col justify-between schematic-bracket-card"
            >
              <div>
                <CardHeader className="p-0 mb-4 flex flex-row items-center gap-3">
                  <div className="w-8 h-8 border border-border flex items-center justify-center text-accent bg-background/50">
                    {service.icon}
                  </div>
                  <CardTitle className="text-base font-display font-medium text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {service.desc}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="p-0 pt-6 justify-start">
                <Button 
                  variant="ghost" 
                  className="font-mono text-[10px] tracking-wider uppercase text-accent hover:text-accent/80 p-0 h-auto group gap-1.5"
                  onClick={handleContactRedirect}
                >
                  Request Consultation
                  <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </motion.div>
          ))}
        </div>

        {/* Work Process section */}
        <div className="log-header mb-8">
          <span>// EXECUTION METHODOLOGY</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl mb-16"
        >
          {workProcess.map((item, index) => (
            <div 
              key={index}
              className="border border-border/60 p-5 bg-card/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative schematic-bracket-card"
            >
              <div className="flex items-center gap-4">
                <div className="font-mono text-sm text-accent font-bold">
                  {item.step}
                </div>
                <div>
                  <div className="font-mono text-[10px] text-accent/80 font-bold">// {item.phase}</div>
                  <p className="text-xs text-muted-foreground font-sans mt-1 max-w-xl leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
              <div className="font-mono text-[8px] text-muted-foreground/40 self-end sm:self-center uppercase">
                PHASE_LOGGED
              </div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="flex justify-center border-t border-border/40 pt-12">
          <Button 
            onClick={handleContactRedirect}
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-accent/20 transition-all duration-200 gap-2"
            size="lg"
          >
            <FiActivity className="h-4 w-4" /> INITIATE_PROJECT_PIPELINE
          </Button>
        </div>
      </div>
    </div>
  );
}