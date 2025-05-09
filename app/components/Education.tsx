"use client";
import { motion } from "framer-motion";
import { FiBookOpen, FiAward, FiCalendar, FiMapPin } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Animation variants
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

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Vit Bhopal University",
    years: "2023 - 2027",
    location: "Bhopal, India",
    description: "Specialized in Artificial Intelligence and Machine Learning.",
    courses: ["Data Structures", "Algorithms", "Machine Learning", "Web Development"],
    icon: <FiBookOpen className="h-5 w-5" />
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    institution: "Tech Academy",
    years: "2023",
    location: "Online",
    description: "Intensive bootcamp focused on modern web technologies.",
    courses: ["React", "Node.js", "MongoDB", "Express"],
    icon: <FiAward className="h-5 w-5" />
  }
];

export default function Education() {
  return (
    <section className="py-24 px-4 ">
      <div className="max-w-5xl mx-auto">
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
            Academic Background
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Education & Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            My academic journey and professional development
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-blue-500 to-purple-600 md:left-1/2 md:ml-[-1px] hidden md:block"></div>
          
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-8 w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 shadow-lg z-10 md:left-[calc(100%+10px)]"
                     style={{ left: index % 2 === 0 ? 'calc(100% + 10px)' : '-22px' }}></div>
                
                <Card className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group hover:shadow-xl transition-all duration-300 
               bg-white/70 dark:bg-gray-800/70 backdrop-blur-md /* <--- MODIFIED FOR GLASSMORPHISM */
               ">
                  {/* Top gradient bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Avatar className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <AvatarFallback>{item.icon}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FiCalendar className="h-4 w-4" />
                        <span>{item.years}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="font-heading text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.degree}
                    </CardTitle>
                    
                    <CardDescription className="flex items-center gap-1 text-base text-blue-600 dark:text-blue-400">
                      <span>{item.institution}</span>
                      <span className="mx-1">•</span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <FiMapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {item.description}
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.courses.map((course, courseIndex) => (
                          <Badge 
                            key={courseIndex}
                            variant="outline"
                            className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}