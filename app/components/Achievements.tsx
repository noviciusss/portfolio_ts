"use client";
import { motion } from "framer-motion";
import { FiAward, FiStar, FiBookOpen, FiExternalLink } from "react-icons/fi";

const achievements = [
  {
    icon: <FiAward className="h-5 w-5" />,
    title: "Google IT Support Professional Certificate",
    organization: "Google Career Certificates",
    description: "Comprehensive 5-course program covering troubleshooting, networking, operating systems, system administration, and security. Credential ID: whvAjzYf",
    date: "Jan 2026",
    category: "Certification",
    link: "https://www.credly.com/go/whvAjzYf"
  },
  {
    icon: <FiBookOpen className="h-5 w-5" />,
    title: "Applied Machine Learning in Python",
    organization: "University of Michigan - Coursera",
    description: "Completed specialization in supervised/unsupervised learning, feature engineering, model evaluation, and scikit-learn for practical ML applications.",
    date: "2025",
    category: "Certification"
  },
  {
    icon: <FiAward className="h-5 w-5" />,
    title: "Published Fine-Tuned Models on Hugging Face",
    organization: "Hugging Face Hub",
    description: "FLAN-T5 Summarizer with reproducible evaluation achieving 49.01 ROUGE-1 and 72.25 BERTScore F1 on SAMSum dataset",
    date: "Oct 2025",
    category: "Publication"
  },
  {
    icon: <FiStar className="h-5 w-5" />,
    title: "VIT Bhopal Academic Excellence",
    organization: "VIT Bhopal University",
    description: "Maintained 8.57 CGPA with focus on AI/ML coursework including DSA, Cloud Computing, and Software Engineering",
    date: "2023-Present",
    category: "Academic"
  }
];

export default function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section className="py-24 px-4 border-t border-border/40" id="achievements">
      <div className="max-w-4xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 09 — RECOGNITION & CREDENTIALS</span>
        </div>

        <div className="mb-12 max-w-xl text-sm text-muted-foreground">
          <p>
            Milestones, verified credentials, and publications tracked across academic and engineering pursuits.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="border border-border/80 p-5 bg-card/20 relative flex flex-col justify-between schematic-bracket-card"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 border border-border flex items-center justify-center text-accent/80 bg-background/50">
                      {achievement.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-accent border border-accent/20 px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                        {achievement.category}
                      </span>
                      <h3 className="text-base font-display font-medium text-foreground mt-2">
                        {achievement.title}
                      </h3>
                    </div>
                  </div>

                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors pt-1"
                      aria-label="View credential"
                    >
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div className="font-mono text-[10px] text-accent/80 font-bold mb-2">
                  // {achievement.organization.toUpperCase()}
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              <div className="font-mono text-[9px] text-muted-foreground/60 border-t border-border/30 pt-3 mt-4">
                TIMESTAMP: {achievement.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
