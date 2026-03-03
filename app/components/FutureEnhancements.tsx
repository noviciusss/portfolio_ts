"use client";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiCpu, FiGlobe, FiBarChart2, FiShield, FiLayers } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const enhancements = [
  {
    icon: <FiCpu className="h-6 w-6" />,
    title: "Agentic Portfolio Assistant",
    description:
      "A LangGraph-powered chat agent embedded in the portfolio — visitors can ask questions about projects, get technical details, or request a tailored summary. RAG over project READMEs + resume as the knowledge base.",
    tags: ["LangGraph", "RAG", "Next.js", "Streaming"],
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: <FiBarChart2 className="h-6 w-6" />,
    title: "Live Project Dashboards",
    description:
      "Real-time evaluation dashboards for deployed models — live ROUGE/BERTScore trends for the FLAN-T5 summarizer, accuracy drift detection for the RoBERTa classifier, and latency telemetry for Argus.",
    tags: ["MLflow", "W&B", "Recharts", "FastAPI"],
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    icon: <FiGlobe className="h-6 w-6" />,
    title: "Multi-Language Support (i18n)",
    description:
      "Internationalise the portfolio with next-intl — Hindi, Spanish, Japanese. Auto-detect browser locale and serve locale-specific OG images and structured data for broader reach.",
    tags: ["next-intl", "SEO", "next/navigation"],
    color: "from-green-500 to-teal-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
  },
  {
    icon: <FiZap className="h-6 w-6" />,
    title: "Interactive ML Playground",
    description:
      "Embed live Hugging Face Spaces iframes directly into project cards — let visitors run the FLAN-T5 summarizer or RoBERTa classifier without leaving the portfolio.",
    tags: ["Hugging Face", "Gradio", "iframe", "Streaming"],
    color: "from-orange-500 to-yellow-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    icon: <FiShield className="h-6 w-6" />,
    title: "Auth & Guestbook",
    description:
      "Add NextAuth.js GitHub OAuth so visitors can leave verified notes in a public guestbook. Messages stored in Postgres via Prisma — a small but memorable personal touch.",
    tags: ["NextAuth.js", "PostgreSQL", "Prisma", "OAuth"],
    color: "from-red-500 to-rose-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
  },
  {
    icon: <FiLayers className="h-6 w-6" />,
    title: "CMS-Backed Projects & Blog",
    description:
      "Move projects and blog posts to a headless CMS (Sanity.io or Contentlayer) so new content can be published without code deployments. MDX support for rich blog articles.",
    tags: ["Sanity.io", "Contentlayer", "MDX", "ISR"],
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-800",
  },
];

export default function FutureEnhancements() {
  return (
    <section className="py-20 px-4" id="future">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full border border-violet-200 dark:border-violet-800"
          >
            <FiZap className="h-4 w-4" />
            Roadmap
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Future Enhancements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Planned features and improvements — turning this portfolio into a continuously evolving product.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                className={`h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${item.border} ${item.bg} backdrop-blur-sm overflow-hidden`}
              >
                {/* Top gradient accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${item.color}`} />
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold mb-2 text-gray-900 dark:text-gray-100 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1.5"
        >
          <FiArrowRight className="h-3.5 w-3.5" />
          Open to collaboration — reach out if any of these interest you
        </motion.p>
      </div>
    </section>
  );
}
