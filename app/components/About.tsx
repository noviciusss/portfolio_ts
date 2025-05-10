"use client";
import { motion } from "framer-motion";
import { FiDownload, FiUser, FiCode, FiCoffee } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import the image directly using Next.js Image component
import unnamed from "../../public/unnamed.jpg"; 

import { EvervaultCard, Icon } from "@/components/ui/evervault-card"; 
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function About() {
  const stats = [
    { icon: <FiUser size={24} />, label: "Years Experience", value: "1+" },
    { icon: <FiCode size={24} />, label: "Projects Completed", value: "5+" },
    { icon: <FiCoffee size={24} />, label: "Coffees Consumed", value: "1000+" },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full shadow-sm">
              Who I Am
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mt-3 mb-4 text-gray-800 dark:text-gray-100"
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* The parent container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[30rem] md:h-[32rem]"
          >
            {/* Decorative Icons */}
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black z-10" />

            {/* APPROACH 1: EvervaultCard as backdrop with content overlay */}
            <div className="w-full h-full relative">
              <EvervaultCard text="Sam 😎" className="h-full w-full">
                
              </EvervaultCard>
              
              {/* Overlay content on top of the EvervaultCard */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <Image 
                    src={unnamed}
                    alt="Professional photo of Samarth Singh"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
                <p className="mt-6 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
                  Samarth Singh
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-heading font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Passionate Developer & Digital Creator
            </h3>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p className={cn("leading-relaxed mb-4")}>
                I am a passionate developer specializing in building modern web applications using the MERN stack, Next.js, and AI technologies. With expertise in both frontend and backend development, I create seamless user experiences with clean, efficient code.
              </p>
              <p className={cn("leading-relaxed mb-8")}>
                My journey in tech began with a curiosity about how things work on the web, which evolved into a career crafting digital experiences. I continuously expand my skill set to stay at the forefront of web development trends and technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                >
                  <BackgroundGradient
                    className="rounded-xl h-full" 
                    containerClassName="h-full"
                    animate={true}
                  >
                    <Card className="overflow-hidden h-full border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          {stat.icon}
                        </div>
                        <CardTitle className="text-3xl font-bold mb-1 font-heading text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {stat.value}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </BackgroundGradient>
                </motion.div>
              ))}
            </div>
            
            <Button asChild size="lg" className="gap-2 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <a
                href="/Resume_samarth.pdf" 
                download="Resume_samarth"
              >
                <FiDownload className="h-5 w-5 group-hover:animate-bounce" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}