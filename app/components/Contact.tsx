"use client";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Shadcn UI components
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

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: <FiMail size={16} />,
      label: "EMAIL",
      title: "Email Connection",
      value: "samarthsin2006@gmail.com",
      link: "mailto:samarthsin2006@gmail.com",
    },
    {
      icon: <FiPhone size={16} />,
      label: "PHONE",
      title: "Direct Voice",
      value: "+91 9452026413",
      link: "tel:+919452026413",
    },
    {
      icon: <FiMapPin size={16} />,
      label: "LOCATION",
      title: "Base Coordinate",
      value: "Pratapgarh, U.P., India",
      link: null,
    },
  ];

  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 08 — CONTACT INTERACTION</span>
        </div>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Establish connection for consulting, pipeline audits, or research collaborations. Communication will be answered within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="border border-border/80 p-4 bg-card/20 relative schematic-bracket-card"
              >
                <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-background px-1.5 text-[8px] font-mono uppercase tracking-widest text-accent font-bold">
                  // {info.label}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-border flex items-center justify-center text-accent/80 bg-background/50">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">{info.title}</div>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-foreground hover:text-accent font-mono text-xs hover-mechanical-link inline-block mt-0.5"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-foreground font-mono text-xs inline-block mt-0.5">{info.value}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form Panel (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="border border-border/80 p-6 md:p-8 bg-card/15 relative schematic-bracket-card w-full">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-background px-2 text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                DISPATCH_FORM // 08
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] uppercase text-muted-foreground/70 tracking-wider">
                            // SENDER_NAME
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="bg-background border-border/60 hover:border-accent/40 focus:border-accent rounded-none font-mono text-xs transition-all p-3"
                            />
                          </FormControl>
                          <FormMessage className="font-mono text-[9px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] uppercase text-muted-foreground/70 tracking-wider">
                            // CONTACT_EMAIL
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              className="bg-background border-border/60 hover:border-accent/40 focus:border-accent rounded-none font-mono text-xs transition-all p-3"
                            />
                          </FormControl>
                          <FormMessage className="font-mono text-[9px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] uppercase text-muted-foreground/70 tracking-wider">
                          // TRANSMISSION_SUBJECT
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Message subject line"
                            {...field}
                            className="bg-background border-border/60 hover:border-accent/40 focus:border-accent rounded-none font-mono text-xs transition-all p-3"
                          />
                        </FormControl>
                        <FormMessage className="font-mono text-[9px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] uppercase text-muted-foreground/70 tracking-wider">
                          // MESSAGE_PAYLOAD
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter transaction logs / notes payload..."
                            {...field}
                            rows={5}
                            className="resize-none bg-background border-border/60 hover:border-accent/40 focus:border-accent rounded-none font-mono text-xs transition-all p-3"
                          />
                        </FormControl>
                        <FormMessage className="font-mono text-[9px]" />
                      </FormItem>
                    )}
                  />

                  <div>
                    {isSuccess && (
                      <div 
                        className="flex p-4 mb-4 text-xs font-mono bg-accent/5 text-accent border border-accent/20" 
                        role="alert"
                      >
                        <span>[OK] Message dispatched successfully. Verification received.</span>
                      </div>
                    )}
                    {submitError && (
                      <div 
                        className="flex p-4 mb-4 text-xs font-mono bg-destructive/5 text-destructive border border-destructive/20" 
                        role="alert"
                      >
                        <span>[ERR] Submission failed: {submitError}</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-6 font-mono text-sm tracking-wider uppercase border border-accent/20 transition-all duration-200"
                        disabled={isSubmitting}
                      >
                        <FiSend className="h-4 w-4 mr-2" />
                        {isSubmitting ? "TRANSMITTING..." : "DISPATCH_MESSAGE"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}