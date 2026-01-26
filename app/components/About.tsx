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
      animate={false}
    >
      <Card className="overflow-hidden h-full border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group w-full">
        <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-3 sm:mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {stat.icon}
          </div>
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 font-heading text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {stat.value}
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
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
    { icon: <FiUser size={16} className="sm:w-5 sm:h-5" />, label: "Years Experience", value: "1+" },
    { icon: <FiCode size={16} className="sm:w-5 sm:h-5" />, label: "Projects Completed", value: "5+" },
    { icon: <FiCoffee size={16} className="sm:w-5 sm:h-5" />, label: "Coffees Consumed", value: "1000+" },
  ], []);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full shadow-sm">
              Who I Am
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4 text-gray-800 dark:text-gray-100"
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Image Section - KEEPING EXACTLY AS IT WAS */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[30rem] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto order-1 lg:order-none"
          >
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -left-2 sm:-left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -top-2 sm:-top-3 -right-2 sm:-right-3 dark:text-white text-black z-10" />
            <Icon className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 dark:text-white text-black z-10" />

            <div className="w-full h-full relative">
              {/* <EvervaultCard text="Sam 😎" className="h-full w-full" /> */}
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-3 sm:p-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-3 sm:border-4 border-white/30 shadow-xl">
                  <Image 
                    src="/unnamed.jpg"
                    alt="Professional photo of Samarth Singh"
                    width={224}
                    height={224}
                    className="object-cover w-full h-full"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    priority
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  />
                </div>
                <p className="mt-3 sm:mt-4 md:mt-6 text-center text-sm sm:text-base md:text-lg font-medium text-gray-200 dark:text-gray-200">
                  Samarth Singh
                </p>
                <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Section - CENTERED FOR MOBILE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-full order-2 lg:order-none flex flex-col items-center lg:items-start"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-center lg:text-left">
              Passionate Developer & Digital Creator
            </h3>
            <div className="prose dark:prose-invert max-w-full text-gray-600 dark:text-gray-300 text-center lg:text-left">
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                I am a passionate developer specializing in building modern web applications using the MERN stack, Next.js, and AI technologies. With expertise in both frontend and backend development, I create seamless user experiences with clean, efficient code.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                My journey in tech began with a curiosity about how things work on the web, which evolved into a career crafting digital experiences. I continuously expand my skill set to stay at the forefront of web development trends and technologies.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 w-full">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
            
            {/* Download Button */}
            <div className="flex justify-center lg:justify-start w-full">
              <Button asChild size="lg" className="gap-2 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                <a
                  href="/Resume.pdf" 
                  download="Resume"
                >
                  <FiDownload className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" /> Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
