"use client";
import { motion } from "framer-motion";
import { FiExternalLink, FiClock, FiTag } from "react-icons/fi";
import { SiMedium } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "DoCopilot: Building a Production-Grade RAG System with Hybrid Search, Reranking, and Safety Guardrails",
    excerpt:
      "How I went from a basic chatbot to an 89%+ accurate document QA system — with ablation studies to prove it. Most RAG tutorials stop at 'embed your PDF, do cosine similarity, feed to GPT.' That's fine for a demo. It breaks in production.",
    tags: ["RAG", "LLM", "Qdrant", "FastAPI", "Next.js", "AI Safety"],
    readTime: "5 min read",
    date: "Feb 2026",
    link: "https://medium.com/@samarthsin2006/docopilot-building-a-production-grade-rag-system-with-hybrid-search-reranking-and-safety-c943fc2626be",
    stats: [
      { label: "Correctness", value: "89.2%" },
      { label: "Source Rate", value: "100%" },
      { label: "Avg Latency", value: "2.86s" },
    ],
  },
  {
    title: "The Power of Normalization: How Feature Scaling Transforms Neural Network Performance on Tabular Data",
    excerpt:
      "A simple standardization step can transform a completely broken model (R\u00b2 \u2248 0) into a high-performing one (R\u00b2 > 0.8) \u2014 while dramatically reducing training time. The 160,800x improvement in R\u00b2 score proves normalization is not optional.",
    tags: ["Neural Networks", "Machine Learning", "Normalization", "TensorFlow", "Python"],
    readTime: "7 min read",
    date: "Sep 2025",
    link: "https://medium.com/@samarthsin2006/the-power-of-normalization-how-feature-scaling-transforms-neural-network-performance-on-tabular-07842ae0b797",
    stats: [
      { label: "R\u00b2 Gain", value: "160,800x" },
      { label: "RMSE Drop", value: "55.7%" },
      { label: "Speed Up", value: "2\u20135x" },
    ],
  },
];

export default function Blog() {
  return (
    <section className="py-20 px-4" id="blog">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800"
          >
            <SiMedium className="h-4 w-4" />
            Tech Writing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Blog & Writing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Deep-dives into production AI systems, architecture decisions, and lessons learned the hard way.
          </motion.p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500" />
                <CardContent className="p-6 sm:p-8">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <SiMedium className="h-4 w-4" />
                      Medium
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 text-sm sm:text-base">
                    {post.excerpt}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {post.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700/30 text-center"
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">{stat.label}</div>
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 flex items-center gap-1"
                      >
                        <FiTag className="h-2.5 w-2.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-green-500/20 gap-2"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      Read on Medium
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer link to Medium profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://medium.com/@samarthsin2006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <SiMedium className="h-4 w-4" />
            View all posts on Medium
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
