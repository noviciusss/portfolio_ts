"use client";

import {
  FiLayout,
  FiLayers,
  FiPenTool,
  FiCpu,
  FiBarChart2,
  FiServer,
  FiMessageSquare,
  FiEdit3,
  FiCode,
  FiCheckCircle,
  FiPocket,
  FiLifeBuoy,
  FiArrowRight,
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: <FiLayout size={32} className="text-blue-500" />,
    title: "Frontend Development",
    description: "Crafting responsive and engaging user interfaces with modern technologies like React, Next.js, and Vue.",
  },
  {
    icon: <FiLayers size={32} className="text-green-500" />,
    title: "Full Stack Development",
    description: "Building robust and scalable web applications from database to UI, specializing in MERN stack and serverless architectures.",
  },
  {
    icon: <FiPenTool size={32} className="text-purple-500" />,
    title: "UI/UX Design",
    description: "Designing intuitive and user-centric interfaces that enhance user experience and achieve business goals.",
  },
  {
    icon: <FiCpu size={32} className="text-red-500" />,
    title: "Machine Learning Solutions",
    description: "Developing AI-powered applications, including predictive modeling, NLP, and computer vision.",
  },
  {
    icon: <FiBarChart2 size={32} className="text-yellow-500" />,
    title: "Data Analytics & Visualization",
    description: "Transforming raw data into actionable insights through advanced analytics and compelling visualizations.",
  },
  {
    icon: <FiServer size={32} className="text-indigo-500" />,
    title: "Backend & API Development",
    description: "Creating secure, efficient, and scalable server-side logic and APIs using Node.js, Python, and more.",
  },
];

const workProcess = [
  {
    icon: <FiMessageSquare size={24} className="text-sky-500" />,
    step: "1. Discovery & Planning",
    details: "Understanding your vision, goals, and requirements to create a solid project foundation and roadmap.",
  },
  {
    icon: <FiEdit3 size={24} className="text-sky-500" />,
    step: "2. Design & Prototyping",
    details: "Crafting wireframes, mockups, and interactive prototypes to visualize the user experience and gather feedback.",
  },
  {
    icon: <FiCode size={24} className="text-sky-500" />,
    step: "3. Development & Iteration",
    details: "Building the application with clean, efficient code, following agile methodologies for iterative progress.",
  },
  {
    icon: <FiCheckCircle size={24} className="text-sky-500" />,
    step: "4. Testing & Quality Assurance",
    details: "Conducting thorough testing to ensure functionality, performance, and security across all devices.",
  },
  {
    icon: <FiPocket size={24} className="text-sky-500" />,
    step: "5. Deployment & Launch",
    details: "Seamlessly deploying the application to your chosen environment and assisting with the launch process.",
  },
  {
    icon: <FiLifeBuoy size={24} className="text-sky-500" />,
    step: "6. Support & Maintenance",
    details: "Providing ongoing support, updates, and maintenance to ensure your application runs smoothly.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function ServicesPage() {
  const router = useRouter();

  const handleContactRedirect = () => {
    router.push('/#contact');
  };

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-white dark:from-gray-900/50 dark:via-slate-900/50 dark:to-black/60 opacity-60"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full shadow-sm mb-3">
            My Offerings
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-800 dark:text-gray-100">
            Services I Provide
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build impactful digital solutions tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="relative"
            >
              <BackgroundGradient
                className="rounded-xl h-full"
                containerClassName="h-full"
                animate={true}
              >
                <Card className="h-full flex flex-col justify-between bg-card/90 dark:bg-card/90 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
                  <div>
                    <CardHeader className="text-center pb-2">
                      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-background/80 dark:bg-gray-800/80 shadow-md">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                  <CardFooter className="pt-2 pb-4 justify-center">
                    <Button 
                      variant="ghost" 
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
                      onClick={handleContactRedirect}
                    >
                      Get in touch
                      <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full shadow-sm mb-3">
            My Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
            How I Work
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A structured and transparent process to ensure quality and successful project delivery.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {workProcess.map((item, index) => (
            <motion.div
              key={item.step}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="overflow-hidden bg-card/80 dark:bg-card/80 backdrop-blur-sm border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{item.step}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <Button 
            onClick={handleContactRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
            size="lg"
          >
            Start a Project Together
            <FiArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}