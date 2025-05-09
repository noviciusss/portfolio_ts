"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiChevronRight } from "react-icons/fi";
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
import project_loom from "../../public/project_loom.png";
import gif from "../../public/gif.gif";
import portfolio from "../../public/portfolio.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PinContainer } from "@/components/ui/pin"; 

// Helper function to get tag style based on technology category
const getTagStyle = (tag: string) => {
  // Frontend technologies
  if (['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'].includes(tag)) {
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 border-blue-200 dark:border-blue-800";
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
    title: "Modern Portfolio",
    description: "A personal portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring modern UI elements and smooth animations.",
    image: portfolio, 
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/noviciusss/portfolio_ts",
    demo: "https://your-portfolio.vercel.app",
    featured: true,
  },
  {
    title: "Project Loom",
    description: "A collaborative platform where developers showcase projects, pitch innovative ideas, and connect with like-minded creators to build together, gain feedback, and grow their network—empowering the dev community to thrive and innovate.",
    image: project_loom,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/noviciusss/projectloom",
    demo: "https://projectloom.vercel.app/",
    featured: true,
  },
  {
    title: "Dexplorer",
    description: "A fun web application where you can discover and search through the original 150 Pokémon!",
    image: gif,
    tags: ["JavaScript", "Tailwind CSS", "React", "Node.js"],
    github: "https://github.com/noviciusss/Dexplorer",
    demo: "https://dexplorer-pokemon.vercel.app/",
    featured: true,
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
            className="text-lg text-gray-600 dark:text-gray-600 max-w-2xl mx-auto"
          >
            Explore my latest work showcasing my skills and expertise
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
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
                <div className="flex flex-col w-[320px] dark:bg-dot-white/[0.2] bg-gradient-to-br from-white to-gray-50 dark:bg-gray-400 h-[450px] rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow justify-between text-gray-900 dark:text-gray-900">
                    <div>
                      <h3 className="text-xl font-heading font-bold mb-2">{project.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-600 line-clamp-4 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
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
                          <Badge variant="outline" className="text-[10px] font-medium py-0.5 px-2 rounded-full">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100 dark:border-gray-900">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
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