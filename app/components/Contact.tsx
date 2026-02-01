"use client";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend, FiArrowRight } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// Import Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import for background effects
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mount, we can safely check the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler with improved UX
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Existing submission logic
    // ...
  }

  const contactInfo = [
    {
      icon: <FiMail size={20} />,
      title: "Email",
      value: "samarthsin2006@gmail.com",
      link: "mailto:samarthsin2006@gmail.com",
    },
    {
      icon: <FiPhone size={20} />,
      title: "Phone",
      value: "+91 9452026413",
      link: "tel:+919452026413",
    },
    {
      icon: <FiMapPin size={20} />,
      title: "Location",
      value: "Pratapgarh, U.P.",
      link: null,
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Modern background effects that overlay the default background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Removed gradient div to use default background */}
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#2563eb"
        />
        {/* Increased opacity for dark mode visibility */}
        <BackgroundBeams className={cn(
          "transition-opacity",
          mounted && theme === "dark" ? "opacity-30" : "opacity-15"
        )} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            className="inline-block px-4 py-1.5 mb-3 text-sm font-medium bg-blue-100/70 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 shadow-sm"
          >
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-gray-100 bg-clip-text text-transparent pb-2"
          >
            Contact Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-1 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                
              >
                <Card className="border-none group shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 text-white rounded-lg shadow-md group-hover:shadow-blue-500/20 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base mb-1 text-gray-800 dark:text-gray-100">{info.title}</CardTitle>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center group"
                          >
                            {/* Truncate long email addresses */}
                            <span className="truncate max-w-[180px]">{info.value}</span>
                            <FiArrowRight className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" size={14} />
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <Card className="border-none shadow-xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and I'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-200">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your email"
                                {...field}
                                className="bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-200">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Message subject"
                              {...field}
                              className="bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 border-gray-200 dark:border-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-200">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              {...field}
                              rows={4}
                              className="resize-none bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 border-gray-200 dark:border-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      {isSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex p-4 mb-4 text-sm rounded-lg bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800/60 shadow-sm backdrop-blur-sm" 
                          role="alert"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                          </svg>
                          <span>Message sent successfully! I'll get back to you soon.</span>
                        </motion.div>
                      )}
                      {submitError && (
                         <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex p-4 mb-4 text-sm rounded-lg bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800/60 shadow-sm backdrop-blur-sm" 
                          role="alert"
                         >
                           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                           <span>Error: {submitError}</span>
                         </motion.div>
                      )}

                      <CardFooter className="px-0 pb-0 pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          className={cn(
                            "w-full sm:w-auto gap-2 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all",
                            isSubmitting ? "opacity-90 pointer-events-none" : ""
                          )}
                          disabled={isSubmitting}
                        >
                          <span className="relative z-10 flex items-center">
                            <FiSend className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </span>
                        </Button>
                      </CardFooter>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}