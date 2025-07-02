"use client";
import { motion } from "framer-motion";
import { FiDownload, FiUser, FiCode, FiCoffee } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useMemo } from "react";

import { EvervaultCard, Icon } from "@/components/ui/evervault-card"; 
import { BackgroundGradient } from "@/components/ui/background-gradient";

const StatCard = memo(({ stat, index }: { stat: any; index: number }) => (
  <motion.div
    key={stat.label}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="w-full"
  >
    <BackgroundGradient
      className="rounded-xl h-full" 
      containerClassName="h-full w-full"
      animate={false} // Disable animation to reduce CPU usage
    >
      <Card className="overflow-hidden h-full border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group w-full">
        <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {stat.icon}
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold mb-1 font-heading text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {stat.value}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {stat.label}
          </p>
        </CardContent>
      </Card>
    </BackgroundGradient>
  </motion.div>
));

StatCard.displayName = "StatCard";

export default function About() {
  const stats = useMemo(() => [
    { icon: <FiUser size={20} />, label: "Years Experience", value: "1+" },
    { icon: <FiCode size={20} />, label: "Projects Completed", value: "5+" },
    { icon: <FiCoffee size={20} />, label: "Coffees Consumed", value: "1000+" },
  ], []);

  return (
    <section className="py-24 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full shadow-sm">
              Who I Am
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mt-3 mb-4 text-gray-800 dark:text-gray-100"
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[28rem] sm:h-[30rem] w-full max-w-md mx-auto"
          >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black z-10" />

            <div className="w-full h-full relative">
              <EvervaultCard text="Sam 😎" className="h-full w-full" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                  <Image 
                    src="/unnamed.jpg"
                    alt="Professional photo of Samarth Singh"
                    width={256}
                    height={256}
                    className="object-cover w-full h-full"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    priority
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                </div>
                <p className="mt-6 text-center text-lg font-medium text-gray-200 dark:text-gray-200">
                  Samarth Singh
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-400">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 md:mt-0"
          >
            <h3 className="text-3xl font-heading font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Passionate Developer & Digital Creator
            </h3>
            <div className="prose dark:prose-invert max-w-full text-gray-600 dark:text-gray-300">
              <p className={cn("leading-relaxed mb-4")}>
                I am a passionate developer specializing in building modern web applications using the MERN stack, Next.js, and AI technologies. With expertise in both frontend and backend development, I create seamless user experiences with clean, efficient code.
              </p>
              <p className={cn("leading-relaxed mb-8")}>
                My journey in tech began with a curiosity about how things work on the web, which evolved into a career crafting digital experiences. I continuously expand my skill set to stay at the forefront of web development trends and technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
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