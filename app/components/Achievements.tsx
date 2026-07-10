"use client";
import { motion } from "framer-motion";
import { FiAward, FiStar, FiBookOpen, FiExternalLink } from "react-icons/fi";
import useSWR from 'swr';

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
  const { data: hfData } = useSWR(
    'https://huggingface.co/api/models?author=noviciusss',
    (url) => fetch(url).then(res => res.json())
  );

  const hfDownloads = hfData 
    ? hfData.reduce((acc: number, model: any) => acc + (model.downloads || 0), 0)
    : null;

  if (achievements.length === 0) return null;

  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background" id="achievements">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 10</span>
        <h2 className="nb-section-heading">Receipts</h2>

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
              className="nb-card p-5 bg-card relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <span className="font-mono text-[9px] text-foreground bg-accent border-2 border-border px-1.5 py-0.5 uppercase tracking-wider font-extrabold shadow-[1.5px_1.5px_0_0_var(--border)]">
                        {achievement.category}
                      </span>
                      <h3 className="text-lg font-display font-black text-foreground mt-3 uppercase leading-tight">
                        {achievement.title}
                      </h3>
                    </div>
                  </div>

                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nb-btn text-[10px] py-1 px-2.5 bg-background border-2 shadow-[2px_2px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_var(--border)] shrink-0"
                      aria-label="View credential"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <div className="font-mono text-[10px] text-foreground bg-amber/25 border-2 border-border px-2 py-0.5 uppercase tracking-wider font-extrabold shadow-[1.5px_1.5px_0_0_var(--border)] inline-block mb-3">
                  // ORG: {achievement.organization.toUpperCase()}
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {achievement.description}
                </p>
              </div>

                {achievement.organization === "Hugging Face Hub" && hfDownloads !== null && (
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-wider text-accent border-t border-border/20 pt-3.5 font-bold">
                    // live telemetry: {hfDownloads} downloads recorded
                  </div>
                )}

              <div className="font-mono text-[9px] text-muted-foreground border-t-2 border-border/20 pt-3 mt-4 font-bold">
                TIMESTAMP: {achievement.date.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
