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
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">SECTION 11</span>
        <h2 className="nb-section-heading">Get in touch</h2>

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
                className="nb-card p-4 bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-border bg-accent flex items-center justify-center text-accent-foreground shadow-[2px_2px_0_0_var(--border)]">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider font-bold">{info.title}</div>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-foreground font-mono text-xs hover:text-accent font-bold inline-block mt-0.5 border-b border-border/25"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-foreground font-mono text-xs font-bold inline-block mt-0.5">{info.value}</span>
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
            <div className="nb-card p-6 md:p-8 bg-card w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                            Sender Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="bg-background border-[3px] border-border rounded-none font-sans text-xs transition-all p-3 focus:shadow-[3px_3px_0_0_var(--accent)]"
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
                          <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                            Contact Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              className="bg-background border-[3px] border-border rounded-none font-sans text-xs transition-all p-3 focus:shadow-[3px_3px_0_0_var(--accent)]"
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
                        <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                          Transmission Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Message subject line"
                            {...field}
                            className="bg-background border-[3px] border-border rounded-none font-sans text-xs transition-all p-3 focus:shadow-[3px_3px_0_0_var(--accent)]"
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
                        <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                          Message Payload
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter transaction logs / notes payload..."
                            {...field}
                            rows={5}
                            className="resize-none bg-background border-[3px] border-border rounded-none font-sans text-xs transition-all p-3 focus:shadow-[3px_3px_0_0_var(--accent)]"
                          />
                        </FormControl>
                        <FormMessage className="font-mono text-[9px]" />
                      </FormItem>
                    )}
                  />

                  <div>
                    {isSuccess && (
                      <div 
                        className="flex p-4 mb-4 text-xs font-mono bg-accent/10 text-accent-foreground border-[3px] border-border shadow-[3px_3px_0_0_var(--border)] font-bold" 
                        role="alert"
                      >
                        <span>[OK] Message dispatched successfully. Verification received.</span>
                      </div>
                    )}
                    {submitError && (
                      <div 
                        className="flex p-4 mb-4 text-xs font-mono bg-destructive/10 text-destructive border-[3px] border-destructive shadow-[3px_3px_0_0_var(--border)] font-bold" 
                        role="alert"
                      >
                        <span>[ERR] Submission failed: {submitError}</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="nb-btn nb-btn-primary w-full sm:w-auto"
                      >
                        <FiSend className="h-4 w-4 mr-2" />
                        {isSubmitting ? "TRANSMITTING..." : "SEND IT →"}
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