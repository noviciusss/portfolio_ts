"use client";
import { motion } from "framer-motion";
import { FiDownload, FiUser, FiCode, FiCoffee } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import unnamed from "../../public/unnamed.jpg";

export default function About() {
  const stats = [
    { icon: <FiUser />, label: "Years Experience", value: "1+" },
    { icon: <FiCode />, label: "Projects Completed", value: "5+" },
    { icon: <FiCoffee />, label: "Coffees Consumed", value: "1000+" },
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
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              Who I Am
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 mix-blend-overlay"></div>
            <div className="aspect-[4/3] bg-slate-200/50 dark:bg-slate-700/50 flex items-center justify-center"> {/* MODIFIED */}
             <Avatar className="h-64 w-64 rounded-xl border-4 border-white/50">
              <AvatarImage src={unnamed.src} alt="Professional photo" />
              <AvatarFallback className="text-4xl font-medium text-gray-400">YN</AvatarFallback>
            </Avatar>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-4">
              Passionate Developer & Digital Creator
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className={cn("text-muted-foreground leading-relaxed mb-4")}>
                I am a passionate developer specializing in building modern web applications using the MERN stack, Next.js, and AI technologies. With expertise in both frontend and backend development, I create seamless user experiences with clean, efficient code.
              </p>
              <p className={cn("text-muted-foreground leading-relaxed mb-6")}>
                My journey in tech began with a curiosity about how things work on the web, which evolved into a career crafting digital experiences. I continuously expand my skill set to stay at the forefront of web development trends and technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 
               bg-white/70 dark:bg-gray-800/70 backdrop-blur-md /* <--- MODIFIED FOR GLASSMORPHISM */
                group">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
          <CardTitle className="text-3xl font-bold mb-1 font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {stat.value}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {stat.label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
            
<a
              href="/Resume_samarth.pdf" // Make sure this path matches your file in the public folder
              download="Resume_samarth" // This will be the suggested filename for the download
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md gap-2 hover:translate-y-[-4px] transition-all"
              // The className above mimics the shadcn Button default variant and lg size. Adjust if your default styles are different.
            >
              <FiDownload className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}