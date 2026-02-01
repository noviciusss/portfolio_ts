"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaJava, FaGithub, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaDatabase, FaBrain } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiMysql, SiSqlite, SiPrisma, SiJavascript, SiCplusplus } from "react-icons/si";
import { SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiJupyter, SiHuggingface, SiOpenai, SiAmazon, SiLinux } from "react-icons/si";

// Shadcn UI Components
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Aceternity UI Components
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Animation variants for staggered animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const skillCategories = [
  {
    category: "LLMOps & GenAI",
    id: "llmops",
    skills: [
      { 
        icon: <SiOpenai size={30} />, 
        name: "LangChain", 
        level: 85,
        color: "bg-green-600",
        textColor: "text-white",
        description: "Building RAG pipelines, semantic search, and LLM orchestration for production systems."
      },
      { 
        icon: <FaBrain size={30} />, 
        name: "LangGraph", 
        level: 75,
        color: "bg-emerald-600",
        textColor: "text-white",
        description: "Building stateful, multi-agent workflows with graph-based orchestration and cyclic flows."
      },
      { 
        icon: <SiOpenai size={30} />, 
        name: "Agno", 
        level: 70,
        color: "bg-purple-500",
        textColor: "text-white",
        description: "Creating fast, lightweight AI agents with minimal overhead for production deployments."
      },
      { 
        icon: <FaDatabase size={30} />, 
        name: "Vector Databases", 
        level: 80,
        color: "bg-purple-600",
        textColor: "text-white",
        description: "Qdrant, FAISS for hybrid search (BM25 + dense), reranking, and semantic retrieval."
      },
      { 
        icon: <FaPython size={30} />, 
        name: "FastAPI", 
        level: 85,
        color: "bg-teal-600",
        textColor: "text-white",
        description: "Building production-grade API backends for LLM applications and RAG systems."
      },
      { 
        icon: <SiHuggingface size={30} />, 
        name: "Hugging Face", 
        level: 90,
        color: "bg-yellow-500",
        textColor: "text-black",
        description: "Transformers, model deployment, fine-tuning, and publishing to Spaces/Hub."
      },
      { 
        icon: <FaBrain size={30} />, 
        name: "Prompt Engineering", 
        level: 85,
        color: "bg-indigo-600",
        textColor: "text-white",
        description: "Designing effective prompts, guardrails, PII redaction, and source-grounding for LLMs."
      },
      { 
        icon: <SiPandas size={30} />, 
        name: "MLflow & W&B", 
        level: 75,
        color: "bg-blue-700",
        textColor: "text-white",
        description: "Experiment tracking, model versioning, and evaluation with Weights & Biases."
      },
      { 
        icon: <SiJupyter size={30} />, 
        name: "Gradio/Streamlit", 
        level: 85,
        color: "bg-orange-500",
        textColor: "text-white",
        description: "Interactive ML app deployment with configurable UI for demos and user testing."
      }
    ]
  },
  {
    category: "ML/DL & AI Engineering",
    id: "ml",
    skills: [
      { 
        icon: <SiPytorch size={30} />, 
        name: "PyTorch", 
        level: 88,
        color: "bg-orange-600",
        textColor: "text-white",
        description: "Deep learning, transformer fine-tuning, PEFT/LoRA, and GPU-accelerated training."
      },
      { 
        icon: <SiTensorflow size={30} />, 
        name: "TensorFlow", 
        level: 75,
        color: "bg-orange-400",
        textColor: "text-white",
        description: "Neural networks, model deployment, and production ML pipelines."
      },
      { 
        icon: <SiScikitlearn size={30} />, 
        name: "Scikit-learn", 
        level: 82,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Classical ML algorithms, preprocessing, and model evaluation."
      },
      { 
        icon: <FaPython size={30} />, 
        name: "Transformers", 
        level: 90,
        color: "bg-yellow-600",
        textColor: "text-black",
        description: "BERT, RoBERTa, FLAN-T5 fine-tuning with LoRA/PEFT for efficient training."
      },
      { 
        icon: <SiPandas size={30} />, 
        name: "Pandas/NumPy", 
        level: 88,
        color: "bg-blue-400",
        textColor: "text-white",
        description: "Data manipulation, analysis, and preprocessing for ML workflows."
      },
      { 
        icon: <SiJupyter size={30} />, 
        name: "Jupyter", 
        level: 85,
        color: "bg-orange-400",
        textColor: "text-white",
        description: "Interactive notebooks for research, experimentation, and model development."
      }
    ]
  },
  {
    category: "Programming Languages",
    id: "languages",
    skills: [
      { 
        icon: <FaPython size={30} />, 
        name: "Python", 
        level: 92,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Primary language for ML/DL, data science, backend APIs, and automation."
      },
      { 
        icon: <SiCplusplus size={30} />, 
        name: "C++", 
        level: 80,
        color: "bg-blue-700",
        textColor: "text-white",
        description: "Systems programming, competitive programming, and performance-critical tasks."
      },
      { 
        icon: <SiJavascript size={30} />, 
        name: "JavaScript", 
        level: 88,
        color: "bg-yellow-400",
        textColor: "text-black",
        description: "Full-stack development with modern frameworks and async programming."
      },
      { 
        icon: <SiTypescript size={30} />, 
        name: "TypeScript", 
        level: 90,
        color: "bg-blue-700",
        textColor: "text-white",
        description: "Type-safe development for scalable, maintainable full-stack applications."
      },
      { 
        icon: <SiMysql size={30} />, 
        name: "SQL", 
        level: 85,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Database design, complex queries, optimization, and data modeling."
      }
    ]
  },
  {
    category: "Full-Stack Development",
    id: "fullstack",
    skills: [
      { 
        icon: <SiNextdotjs size={30} />, 
        name: "Next.js", 
        level: 90,
        color: "bg-black dark:bg-white/90",
        textColor: "text-white dark:text-black",
        description: "SSR, ISR, API routes for performant, production-ready web applications."
      },
      { 
        icon: <FaNodeJs size={30} />, 
        name: "Node.js", 
        level: 85,
        color: "bg-green-600",
        textColor: "text-white",
        description: "Backend development, RESTful APIs, and microservices architecture."
      },
      { 
        icon: <SiPostgresql size={30} />, 
        name: "PostgreSQL", 
        level: 82,
        color: "bg-blue-900",
        textColor: "text-white",
        description: "Relational database for production apps with complex queries and indexing."
      },
      { 
        icon: <FaReact size={30} />, 
        name: "React", 
        level: 90,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Component-based UI with hooks, context, and modern React patterns."
      },
      { 
        icon: <SiTailwindcss size={30} />, 
        name: "Tailwind CSS", 
        level: 95,
        color: "bg-cyan-500",
        textColor: "text-white",
        description: "Utility-first styling for rapid, responsive UI development."
      }
    ]
  },
  {
    category: "Tools & DevOps",
    id: "tools",
    skills: [
      { 
        icon: <FaGitAlt size={30} />, 
        name: "Git/GitHub", 
        level: 90,
        color: "bg-orange-600",
        textColor: "text-white",
        description: "Version control, collaboration, CI/CD, and open-source contributions."
      },
      { 
        icon: <FaDocker size={30} />, 
        name: "Docker", 
        level: 80,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Containerization for consistent ML/web deployments across environments."
      },
      { 
        icon: <SiAmazon size={30} />, 
        name: "AWS", 
        level: 70,
        color: "bg-orange-500",
        textColor: "text-black",
        description: "Cloud deployment, S3, EC2, Lambda for scalable applications."
      },
      { 
        icon: <SiLinux size={30} />, 
        name: "Linux/CUDA", 
        level: 85,
        color: "bg-black",
        textColor: "text-white",
        description: "GPU-accelerated training, system administration, and shell scripting."
      }
    ]
  }
];

// Helper functions
function getProficiencyLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  if (level >= 50) return "Intermediate";
  return "Learning";
}

function getBadgeVariant(level: number): "default" | "secondary" | "outline" | "destructive" {
  if (level >= 90) return "default";
  if (level >= 80) return "secondary";
  if (level >= 70) return "outline";
  return "destructive";
}

export default function Skills() {
  const renderSkillCategory = (category: any) => (
    <div key={category.id}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center gap-3"
      >
        <h3 className="text-2xl font-heading font-bold text-gray-800 dark:text-gray-100">{category.category}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent dark:from-blue-400"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.skills.map((skill: any, index: number) => (
          <motion.div
            key={skill.name}
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-full"
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <CardContainer className="inter-var w-full h-full">
                  <CardBody className="bg-white dark:bg-gray-800/90 backdrop-blur-sm relative group/card h-full shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/20 transition-all duration-300 rounded-xl p-6 border border-black/[0.05] dark:border-white/[0.1]">
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 rounded-xl"></div>
                    </div>
                    
                    <CardItem
                      translateZ="40"
                      className="w-full mb-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${skill.color} ${skill.textColor} group-hover/card:scale-110 transition-transform duration-300 shadow-md`}>
                          {skill.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-heading text-neutral-800 dark:text-white">{skill.name}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">Proficiency Level</p>
                        </div>
                      </div>
                    </CardItem>

                    <CardItem
                      translateZ="30"
                      className="w-full"
                    >
                      <div className="space-y-1">
                        <TooltipProvider>
                          <div className="relative">
                            <Progress value={skill.level} className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className="absolute top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center" 
                                  style={{ left: `calc(${skill.level}% - 10px)` }}
                                >
                                  <span className="w-3.5 h-3.5 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-full shadow-sm"></span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
                                {`${skill.level}% - ${getProficiencyLabel(skill.level)}`}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                        <div className="flex justify-between pt-1.5">
                          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{skill.level}%</span>
                          <Badge variant={getBadgeVariant(skill.level)} className="text-xs px-1.5 py-0.5">
                            {getProficiencyLabel(skill.level)}
                          </Badge>
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-xl rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${skill.color} ${skill.textColor} shadow-sm`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-heading font-semibold text-base text-neutral-800 dark:text-white">{skill.name}</h4>
                  </div>
                  {/* Description is here and will be displayed in the hover card */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {skill.description || "No description available."}
                  </p>
                  <Progress value={skill.level} className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Level: {skill.level}%</span>
                    <span>{getProficiencyLabel(skill.level)}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4">
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
            className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full shadow-sm"
          >
            Technical Arsenal
          </motion.span>
          <TextGenerateEffect
            words="My Skills & Technologies"
            className="text-4xl sm:text-5xl font-heading font-bold text-gray-800 dark:text-gray-100 mb-4"
            duration={0.7}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            The tools, languages, and frameworks I leverage to build powerful and innovative web applications.
          </motion.p>
        </motion.div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 sm:grid-cols-6 mb-10 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm p-1.5 rounded-lg shadow-inner">
            <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">All</TabsTrigger>
            <TabsTrigger value="llmops" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">LLMOps</TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">ML/DL</TabsTrigger>
            <TabsTrigger value="languages" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Languages</TabsTrigger>
            <TabsTrigger value="fullstack" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Full-Stack</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-12">
            {skillCategories.map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          {skillCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-12">
              {renderSkillCategory(category)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}