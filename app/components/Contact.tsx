"use client";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  botCheck: z.string().optional(),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      botCheck: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Honeypot check
    if (values.botCheck) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try the mailto link below.");
      }

      setIsSuccess(true);
      form.reset();
    } catch (error: any) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please use direct email."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: <FiMail size={16} />,
      title: "Email",
      value: "samarthsin2006@gmail.com",
      link: "mailto:samarthsin2006@gmail.com",
    },
    {
      icon: <FiPhone size={16} />,
      title: "Phone",
      value: "+91 9452026413",
      link: "tel:+919452026413",
    },
    {
      icon: <FiMapPin size={16} />,
      title: "Location",
      value: "Pratapgarh, U.P., India",
      link: null,
    },
  ];

  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="contact">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// CONNECT</span>
        <h2 className="nb-section-heading">Contact</h2>

        <div className="mb-10 max-w-xl text-sm sm:text-base text-muted-foreground font-sans">
          <p>
            Hiring for AI/LLM engineering roles or internships? I reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="nb-card p-4 bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-border bg-accent flex items-center justify-center text-accent-foreground shadow-[2px_2px_0_0_var(--border)]">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                      {info.title}
                    </div>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-foreground font-mono text-xs hover:text-accent font-bold inline-block mt-0.5 border-b border-border/25"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-foreground font-mono text-xs font-bold inline-block mt-0.5">
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 border-2 border-dashed border-border bg-canvas font-mono text-xs text-muted-foreground">
              Direct inbox:{" "}
              <a
                href="mailto:samarthsin2006@gmail.com"
                className="text-foreground font-bold underline underline-offset-2"
              >
                samarthsin2006@gmail.com
              </a>
            </div>
          </div>

          {/* Form Panel (Right) */}
          <div className="lg:col-span-8">
            <div className="nb-card p-6 md:p-8 bg-card w-full shadow-[6px_6px_0_0_var(--ink)]">
              {isSuccess ? (
                <div className="p-6 border-[3px] border-border bg-phosphor/20 flex flex-col items-center text-center space-y-3">
                  <FiCheckCircle className="h-10 w-10 text-emerald-600" />
                  <h3 className="font-display font-black text-xl uppercase text-foreground">
                    Message Dispatched
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground max-w-md">
                    Thank you for reaching out. Your transmission has been recorded and I will reply within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="nb-btn nb-btn-primary mt-2 text-xs"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Honeypot field (hidden from real users) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...form.register("botCheck")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="rounded-none border-[2px] border-border bg-background text-base placeholder:text-muted-foreground/60 h-11 focus-visible:ring-0 focus-visible:border-foreground"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive font-mono" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@domain.com"
                                className="rounded-none border-[2px] border-border bg-background text-base placeholder:text-muted-foreground/60 h-11 focus-visible:ring-0 focus-visible:border-foreground"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive font-mono" />
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
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Role inquiry / technical collaboration"
                              className="rounded-none border-[2px] border-border bg-background text-base placeholder:text-muted-foreground/60 h-11 focus-visible:ring-0 focus-visible:border-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Describe your team, timeline, and engineering requirements..."
                              className="rounded-none border-[2px] border-border bg-background text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:border-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive font-mono" />
                        </FormItem>
                      )}
                    />

                    {submitError && (
                      <div className="p-3 border-2 border-destructive bg-destructive/10 text-destructive text-xs font-mono flex items-center gap-2">
                        <FiAlertCircle className="h-4 w-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="nb-btn nb-btn-primary w-full sm:w-auto text-xs py-3 px-6 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Sending transmission...</span>
                        ) : (
                          <>
                            <FiSend className="h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>

                      <span className="font-mono text-[11px] text-muted-foreground">
                        Or email directly via <a href="mailto:samarthsin2006@gmail.com" className="underline font-bold text-foreground">mailto ↗</a>
                      </span>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}