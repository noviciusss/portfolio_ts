"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaJava, FaGithub, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiMysql, SiSqlite, SiPrisma, SiJavascript, SiC } from "react-icons/si";
import { SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiJupyter } from "react-icons/si";

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
    category: "Frontend Development",
    id: "frontend",
    skills: [
      { 
        icon: <SiNextdotjs size={30} />, 
        name: "Next.js", 
        level: 90,
        color: "bg-black dark:bg-white/90",
        textColor: "text-white dark:text-black",
        description: "Server-side rendering, static site generation and API routes for modern web applications."
      },
      { 
        icon: <FaReact size={30} />, 
        name: "React", 
        level: 92,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Component-based UI development with hooks and context API for dynamic user interfaces."
      },
      { 
        icon: <SiTypescript size={30} />, 
        name: "TypeScript", 
        level: 88,
        color: "bg-blue-700",
        textColor: "text-white",
        description: "Type-safe JavaScript development for more robust and maintainable applications."
      },
      { 
        icon: <SiTailwindcss size={30} />, 
        name: "Tailwind CSS", 
        level: 95,
        color: "bg-cyan-500",
        textColor: "text-white",
        description: "Utility-first CSS framework for rapid and custom UI development."
      },
      { 
        icon: <FaHtml5 size={30} />, 
        name: "HTML5", 
        level: 95,
        color: "bg-orange-500",
        textColor: "text-white",
        description: "Semantic markup language for structuring accessible web content."
      },
      { 
        icon: <FaCss3Alt size={30} />, 
        name: "CSS3", 
        level: 92,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Styling language for designing visually appealing web page presentations."
      }
    ]
  },
  {
    category: "Backend & Databases",
    id: "backend",
    skills: [
      { 
        icon: <FaNodeJs size={30} />, 
        name: "Node.js", 
        level: 85,
        color: "bg-green-600",
        textColor: "text-white",
        description: "JavaScript runtime for building scalable and efficient server-side applications."
      },
      { 
        icon: <SiMongodb size={30} />, 
        name: "MongoDB", 
        level: 82,
        color: "bg-green-700",
        textColor: "text-white",
        description: "NoSQL document database with flexible schema design for diverse data."
      },
      { 
        icon: <SiPostgresql size={30} />, 
        name: "PostgreSQL", 
        level: 80,
        color: "bg-blue-900",
        textColor: "text-white",
        description: "Advanced open-source relational database system known for reliability."
      },
      { 
        icon: <SiMysql size={30} />, 
        name: "MySQL", 
        level: 78,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Popular relational database management system for web applications."
      },
      { 
        icon: <SiSqlite size={30} />, 
        name: "SQLite", 
        level: 75,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Lightweight disk-based database, ideal for embedded systems and small apps."
      },
      { 
        icon: <SiPrisma size={30} />, 
        name: "Prisma ORM", 
        level: 83,
        color: "bg-slate-900 dark:bg-slate-200",
        textColor: "text-white dark:text-slate-900",
        description: "Next-generation ORM for Node.js and TypeScript, simplifying database interactions."
      }
    ]
  },
  {
    category: "Programming Languages",
    id: "languages",
    skills: [
      { 
        icon: <SiJavascript size={30} />, 
        name: "JavaScript", 
        level: 90,
        color: "bg-yellow-400",
        textColor: "text-black",
        description: "Core language for web development, enabling interactive and dynamic content."
      },
      { 
        icon: <FaPython size={30} />, 
        name: "Python", 
        level: 78,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Versatile language for web, data analysis, machine learning, and automation."
      },
      { 
        icon: <SiC size={30} />, 
        name: "C Programming", 
        level: 75,
        color: "bg-gray-700",
        textColor: "text-white",
        description: "Powerful low-level systems programming language for performance-critical tasks."
      },
      { 
        icon: <FaJava size={30} />, 
        name: "Java", 
        level: 70,
        color: "bg-red-600",
        textColor: "text-white",
        description: "Object-oriented programming language for cross-platform enterprise applications."
      }
    ]
  },
  {
    category: "Data Science & Machine Learning",
    id: "ml",
    skills: [
      { 
        icon: <SiPytorch size={30} />, 
        name: "PyTorch", 
        level: 25, 
        color: "bg-orange-500",
        textColor: "text-white",
        description: "Open-source deep learning framework for building and training neural network models."
      },
      { 
        icon: <SiTensorflow size={30} />, 
        name: "TensorFlow", 
        level: 20,
        color: "bg-orange-400",
        textColor: "text-white",
        description: "Comprehensive end-to-end ML platform for model development and deployment."
      },
      { 
        icon: <SiScikitlearn size={30} />, 
        name: "Scikit-learn", 
        level: 50,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Machine learning library for classical ML algorithms and data preprocessing tasks."
      },
      { 
        icon: <SiPandas size={30} />, 
        name: "Pandas/NumPy", 
        level: 75,
        color: "bg-blue-400",
        textColor: "text-white",
        description: "Essential data manipulation and numerical analysis tools for Python."
      },
      { 
        icon: <SiJupyter size={30} />, 
        name: "Jupyter", 
        level: 70,
        color: "bg-orange-600",
        textColor: "text-white",
        description: "Interactive computing environment for data science, machine learning, and education."
      }
    ]
  },
  {
    category: "Tools & DevOps",
    id: "tools",
    skills: [
      { 
        icon: <FaGitAlt size={30} />, 
        name: "Git", 
        level: 88,
        color: "bg-orange-600",
        textColor: "text-white",
        description: "Distributed version control system for tracking changes and collaborating on code."
      },
      { 
        icon: <FaGithub size={30} />, 
        name: "GitHub", 
        level: 85,
        color: "bg-gray-900 dark:bg-gray-200",
        textColor: "text-white dark:text-gray-900",
        description: "Web-based hosting service for software development and version control using Git."
      },
      { 
        icon: <FaDocker size={30} />, 
        name: "Docker", 
        level: 75,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Containerization platform for developing, shipping, and running applications consistently."
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
            <TabsTrigger value="frontend" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Frontend</TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Backend</TabsTrigger>
            <TabsTrigger value="languages" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">Languages</TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md py-1.5 text-sm">ML/AI</TabsTrigger>
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