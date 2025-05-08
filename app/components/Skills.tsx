"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaJava, FaGithub, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiMysql, SiSqlite, SiPrisma, SiJavascript, SiC } from "react-icons/si";
import { SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiJupyter } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

// Reorganized skills based on your list
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
        description: "Server-side rendering, static site generation and API routes"
      },
      { 
        icon: <FaReact size={30} />, 
        name: "React", 
        level: 92,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Component-based UI development with hooks and context API"
      },
      { 
        icon: <SiTypescript size={30} />, 
        name: "TypeScript", 
        level: 88,
        color: "bg-blue-700",
        textColor: "text-white",
        description: "Type-safe JavaScript development for more robust applications"
      },
      { 
        icon: <SiTailwindcss size={30} />, 
        name: "Tailwind CSS", 
        level: 95,
        color: "bg-cyan-500",
        textColor: "text-white",
        description: "Utility-first CSS framework for rapid UI development"
      },
      { 
        icon: <FaHtml5 size={30} />, 
        name: "HTML5", 
        level: 95,
        color: "bg-orange-500",
        textColor: "text-white",
        description: "Semantic markup language for structuring web content"
      },
      { 
        icon: <FaCss3Alt size={30} />, 
        name: "CSS3", 
        level: 92,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Styling language for designing web page presentation"
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
        description: "JavaScript runtime for scalable server-side applications"
      },
      { 
        icon: <SiMongodb size={30} />, 
        name: "MongoDB", 
        level: 82,
        color: "bg-green-700",
        textColor: "text-white",
        description: "NoSQL document database with flexible schema design"
      },
      { 
        icon: <SiPostgresql size={30} />, 
        name: "PostgreSQL", 
        level: 80,
        color: "bg-blue-900",
        textColor: "text-white",
        description: "Advanced open-source relational database system"
      },
      { 
        icon: <SiMysql size={30} />, 
        name: "MySQL", 
        level: 78,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Relational database management system for web applications"
      },
      { 
        icon: <SiSqlite size={30} />, 
        name: "SQLite", 
        level: 75,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Lightweight disk-based database that doesn't require a separate server"
      },
      { 
        icon: <SiPrisma size={30} />, 
        name: "Prisma ORM", 
        level: 83,
        color: "bg-slate-900",
        textColor: "text-white",
        description: "Next-generation ORM for Node.js and TypeScript"
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
        description: "Core language for web development and beyond"
      },
      { 
        icon: <FaPython size={30} />, 
        name: "Python", 
        level: 78,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Versatile language for web, data analysis and automation"
      },
      { 
        icon: <SiC size={30} />, 
        name: "C Programming", 
        level: 75,
        color: "bg-gray-700",
        textColor: "text-white",
        description: "Low-level systems programming language"
      },
      { 
        icon: <FaJava size={30} />, 
        name: "Java", 
        level: 70,
        color: "bg-red-600",
        textColor: "text-white",
        description: "Object-oriented programming for cross-platform applications"
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
        description: "Deep learning framework for building neural network models"
      },
      { 
        icon: <SiTensorflow size={30} />, 
        name: "TensorFlow", 
        level: 20,
        color: "bg-orange-400",
        textColor: "text-white",
        description: "End-to-end ML platform for model development and deployment"
      },
      { 
        icon: <SiScikitlearn size={30} />, 
        name: "Scikit-learn", 
        level: 50,
        color: "bg-blue-600",
        textColor: "text-white",
        description: "Machine learning library for classical ML algorithms and data preprocessing"
      },
      { 
        icon: <SiPandas size={30} />, 
        name: "Pandas/NumPy", 
        level: 75,
        color: "bg-blue-400",
        textColor: "text-white",
        description: "Data manipulation and analysis tools for Python"
      },
      { 
        icon: <SiJupyter size={30} />, 
        name: "Jupyter", 
        level: 70,
        color: "bg-orange-600",
        textColor: "text-white",
        description: "Interactive computing environment for data science and machine learning"
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
        description: "Distributed version control system for code management"
      },
      { 
        icon: <FaGithub size={30} />, 
        name: "GitHub", 
        level: 85,
        color: "bg-gray-900",
        textColor: "text-white",
        description: "Hosting for software development and version control"
      },
      { 
        icon: <FaDocker size={30} />, 
        name: "Docker", 
        level: 75,
        color: "bg-blue-500",
        textColor: "text-white",
        description: "Containerization platform for application deployment"
      }
    ]
  }
];

export default function Skills() {
  // Render a single skill category
  const renderSkillCategory = (category: any) => (
    <div key={category.category}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center gap-3"
      >
        <h3 className="text-2xl font-heading font-bold">{category.category}</h3>
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
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl dark:shadow-blue-500/5 transition-all duration-300 bg-white dark:bg-gray-800/90 backdrop-blur-sm relative group">
                  {/* Add subtle 3D hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/5 rounded-lg"></div>
                  </div>
                  
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${skill.color} ${skill.textColor} group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-heading">{skill.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Proficiency</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="space-y-0.5">
                    <TooltipProvider>
                      <div className="relative">
                        <Progress value={skill.level} className="h-2.5 w-full bg-gray-100 dark:bg-gray-700" />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="absolute top-0 -mt-1 h-5 flex items-center" 
                              style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                            >
                              <span className="w-3 h-3 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-full"></span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {`${skill.level}% - ${getProficiencyLabel(skill.level)}`}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                      <div className="flex justify-between">
                        <span className="text-xs font-medium">{skill.level}%</span>
                        <Badge variant={getBadgeVariant(skill.level)} className="text-xs">
                          {getProficiencyLabel(skill.level)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center ${skill.color} ${skill.textColor}`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-heading font-medium">{skill.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                  <Progress value={skill.level} className="h-2 w-full" />
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">{skill.level}%</span>
                    <span className="text-xs font-medium">
                      {getProficiencyLabel(skill.level)}
                    </span>
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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            Technical Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            My Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            The tools, languages and frameworks I use to build powerful web applications
          </motion.p>
        </motion.div>
        
        {/* Added filtering tabs for better UX */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 sm:grid-cols-6 mb-10 bg-gray-100 dark:bg-gray-800/60">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="ml">ML/AI</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-16">
            {skillCategories.map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          <TabsContent value="frontend" className="space-y-16">
            {skillCategories
              .filter(category => category.id === 'frontend')
              .map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          <TabsContent value="backend" className="space-y-16">
            {skillCategories
              .filter(category => category.id === 'backend')
              .map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          <TabsContent value="languages" className="space-y-16">
            {skillCategories
              .filter(category => category.id === 'languages')
              .map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          <TabsContent value="ml" className="space-y-16">
            {skillCategories
              .filter(category => category.id === 'ml')
              .map((category) => renderSkillCategory(category))}
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-16">
            {skillCategories
              .filter(category => category.id === 'tools')
              .map((category) => renderSkillCategory(category))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// Helper functions for consistent labeling
function getProficiencyLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  if (level >= 50) return "Intermediate";
  return "Learning";
}

function getProgressColor(level: number) {
  if (level >= 90) return "bg-green-500";
  if (level >= 80) return "bg-blue-500";
  if (level >= 70) return "bg-yellow-500";
  return "bg-orange-500";
}

function getBadgeVariant(level: number) {
  if (level >= 90) return "default";
  if (level >= 80) return "secondary";
  if (level >= 70) return "outline";
  if (level >= 50) return "destructive";
  return "destructive";
}