"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3 } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress, 
  SiFlask, 
  SiTensorflow 
} from "react-icons/si";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PinContainer } from "@/components/ui/pin";

type ProjectMetric = {
  label: string;
  value: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  metrics?: ProjectMetric[];
}; 

// Helper function to get tag style based on technology category
const getTagStyle = (tag: string) => {
  // Frontend technologies
  if (['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'].includes(tag)) {
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  }
  
  // Backend technologies
  if (['Node.js', 'Express', 'Django', 'Flask', 'Spring', 'FastAPI'].includes(tag)) {
    return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
  }
  
  // Database technologies
  if (['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'Supabase'].includes(tag)) {
    return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
  }
  
  // AI/ML technologies
  if (['Python', 'TensorFlow', 'PyTorch', 'spaCy', 'scikit-learn'].includes(tag)) {
    return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
  }
  
  // Default style for other technologies
  return "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
};

// Helper function to get icon for technology tags
const getTagIcon = (tag: string) => {
  switch(tag) {
    case "Next.js": return <SiNextdotjs className="mr-1 h-3 w-3" />;
    case "React": return <FaReact className="mr-1 h-3 w-3" />;
    case "TypeScript": return <SiTypescript className="mr-1 h-3 w-3" />;
    case "JavaScript": return <SiJavascript className="mr-1 h-3 w-3" />;
    case "Tailwind CSS": return <SiTailwindcss className="mr-1 h-3 w-3" />;
    case "HTML": return <FaHtml5 className="mr-1 h-3 w-3" />;
    case "CSS": return <FaCss3 className="mr-1 h-3 w-3" />;
    case "Node.js": return <FaNodeJs className="mr-1 h-3 w-3" />;
    case "Express": return <SiExpress className="mr-1 h-3 w-3" />;
    case "MongoDB": return <SiMongodb className="mr-1 h-3 w-3" />;
    case "Python": return <FaPython className="mr-1 h-3 w-3" />;
    case "Flask": return <SiFlask className="mr-1 h-3 w-3" />;
    case "TensorFlow": return <SiTensorflow className="mr-1 h-3 w-3" />;
    default: return null;
  }
};

const projects = [
  {
    title: "DoCopilot - RAG Document Q&A System",
    description: "Production-grade RAG application with hybrid search (BM25 + dense vectors) using Qdrant and reranking. Achieved 89.2% correctness, 90.5% relevance, 100% source grounding on 40-query evaluation with guardrails for PII redaction and prompt injection detection. Built full-stack with Next.js frontend and FastAPI backend, processing PDFs/TXT with 2.86s average latency.",
    image: "/docopilot.png",
    metrics: [
      { label: "Correctness", value: "89.2%" },
      { label: "Relevance", value: "90.5%" },
      { label: "Avg Latency", value: "2.86s" }
    ], 
    tags: ["Next.js", "FastAPI", "Qdrant", "LangChain", "RAG", "Python"],
    github: "https://github.com/noviciusss/DoCopilot",
    demo: "",
    featured: true,
  },
  {
    title: "FLAN-T5 Dialogue Summarizer",
    description: "Fine-tuned FLAN-T5-base with LoRA on SAMSum dataset (14.7K dialogues), achieving 49.01 ROUGE-1, 72.25 BERTScore F1, and 42.51 METEOR scores. Implemented parameter-efficient training updating only 2% of parameters with FP16 mixed precision. Deployed interactive Gradio app on Hugging Face Spaces with configurable beam search and published model with reproducible evaluation.",
    image: "/flan-t5.png",
    metrics: [
      { label: "ROUGE-1", value: "49.01" },
      { label: "BERTScore", value: "72.25" },
      { label: "Params Updated", value: "2%" }
    ],
    tags: ["Python", "LoRA", "PEFT", "Transformers", "Gradio", "Hugging Face"],
    github: "https://github.com/noviciusss/flan-t5-summarizer",
    demo: "https://huggingface.co/spaces/noviciusss/dialogue-summarizer",
    featured: true,
  },
  {
    title: "RoBERTa Banking Intent Classifier",
    description: "Fine-tuned RoBERTa-base on Banking77 dataset (77 intents, 13K queries) achieving 93.7% accuracy and 93.6% macro-F1. Implemented standard transformer fine-tuning with AdamW optimizer, weight decay, and FP16 training on GPU. Added experiment hygiene with fixed seeds, consistent tokenization, epoch-level metrics tracking, and best-checkpoint selection for robust evaluation.",
    image: "/roberta-banking.png",
    metrics: [
      { label: "Accuracy", value: "93.7%" },
      { label: "Macro-F1", value: "93.6%" },
      { label: "Intents", value: "77" }
    ],
    tags: ["PyTorch", "Transformers", "CUDA", "NLP", "Python"],
    github: "https://github.com/noviciusss/roberta-banking77",
    demo: "https://huggingface.co/noviciusss/RoBERTa-base_Banking77",
    featured: true,
  },
  {
    title: "Project Loom",
    description: "Full-stack project-sharing platform with Next.js leveraging SSR and ISR, reducing page load times by 50%. Architected scalable backend with Sanity.io headless CMS managing 1,000+ project entries. Implemented secure authentication with NextAuth.js and PostgreSQL, enabling users to manage profiles, post projects, and interact with content.",
    image: "/project_loom.png",
    tags: ["Next.js", "TypeScript", "Sanity.io", "NextAuth.js", "PostgreSQL"],
    github: "https://github.com/noviciusss/projectloom",
    demo: "https://projectloom.vercel.app/",
    featured: true,
  },
  {
    title: "Modern Portfolio",
    description: "Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring modern UI elements, smooth animations with Framer Motion, and optimized SEO for GenAI/RAG internships. Implements dark mode, responsive design, and accessibility best practices with Lighthouse scores 90+ across all metrics.",
    image: "/portfolio.png", 
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/noviciusss/portfolio_ts",
    demo: "https://portfolio-noviciusss.vercel.app/",
    featured: false,
  },
  {
    title: "Dexplorer",
    description: "Interactive Pokémon discovery web application for searching and exploring the original 150 Pokémon with detailed information, stats, and type filtering. Built with React and modern JavaScript, featuring responsive design and smooth user experience.",
    image: "/gif.gif",
    tags: ["JavaScript", "React", "Tailwind CSS", "API Integration"],
    github: "https://github.com/noviciusss/Dexplorer",
    demo: "https://dexplorer-pokemon.vercel.app/",
    featured: false,
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  
  return (
    <section className="py-24 px-4 ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
          >
            My Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore my latest work showcasing my skills and expertise
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-[450px] mb-24"
            >
              <PinContainer
                title={project.title}
                href={project.demo}
                containerClassName="mt-10"
              >
                <div className={`flex flex-col w-[320px] bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-lg border ${
                  project.featured 
                    ? 'border-transparent bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[2px]'
                    : 'border-gray-200 dark:border-white/[0.2]'
                }`}>
                  <div className={project.featured ? 'bg-white dark:bg-neutral-900 rounded-xl overflow-hidden' : ''}>
                    <div className="relative w-full h-48">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                            ⭐ Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-4 mb-4">{project.description}</p>
                        
                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {project.metrics.map((metric) => (
                              <div 
                                key={metric.label}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-2 border border-blue-200 dark:border-blue-700/30"
                              >
                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{metric.label}</div>
                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{metric.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge 
                            key={tag}
                            variant="outline" 
                            className={`${getTagStyle(tag)} text-[10px] font-medium py-0.5 px-2 rounded-full border flex items-center gap-1`}
                          >
                            {getTagIcon(tag)}
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-[10px] font-medium py-0.5 px-2 rounded-full border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 mt-auto border-t border-gray-200 dark:border-gray-700">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <FiGithub className="h-5 w-5" />
                      </a>
                      
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Live
                        <FiExternalLink className="ml-1.5 h-4 w-4" />
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button 
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <a 
              href="https://github.com/noviciusss" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FiGithub className="h-4 w-4" /> View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}