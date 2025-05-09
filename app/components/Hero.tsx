"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import unnamed from "../../public/unnamed.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";



export default function Hero() {
  return (
    <section className="relative flex items-center min-h-screen py-20 px-4 overflow-hidden ">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-3/5"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full"
            >
              FullStack & ML Developer
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Samarth Singh</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            >
              Crafting beautiful web experiences with modern technologies. Specialized in MERN stack, Next.js, and AI development.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              
            <Button 
              asChild
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1"
            >
              <a href="#projects">View My Work</a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:-translate-y-1"
            >
              <a href="#contact">Contact Me</a>
            </Button>

            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-4 mt-8"
            >
              
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a href="https://github.com" target="_blank" rel="noreferrer" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FaGithub size={24} />
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">GitHub</span>
                      <span className="text-xs text-gray-500">View my open-source projects</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {/* For linkedin */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a href="https://github.com" target="_blank" rel="noreferrer" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Linkden</span>
                      <span className="text-xs text-gray-500">View my open-source projects</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {/* for instagram */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a href="https://github.com" target="_blank" rel="noreferrer" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FaTwitter size={24} />
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Twitter</span>
                      <span className="text-xs text-gray-500">View my open-source projects</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-2/5 flex justify-center"
          >
           <Card className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
  <CardContent className="p-0 h-full">
    <Image 
      src={unnamed} 
      alt="Profile Image"
      fill
      className="object-cover"
      priority
    />
  </CardContent>
</Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}