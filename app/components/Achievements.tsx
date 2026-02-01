"use client";
import { motion } from "framer-motion";
import { FiAward, FiStar, FiBookOpen, FiExternalLink } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    icon: <FiAward className="h-6 w-6" />,
    title: "Google IT Support Professional Certificate",
    organization: "Google Career Certificates",
    description: "Comprehensive 5-course program covering troubleshooting, networking, operating systems, system administration, and security. Credential ID: whvAjzYf",
    date: "Jan 2026",
    category: "Certification",
    link: "https://www.credly.com/go/whvAjzYf"
  },
  {
    icon: <FiBookOpen className="h-6 w-6" />,
    title: "Applied Machine Learning in Python",
    organization: "University of Michigan - Coursera",
    description: "Completed specialization in supervised/unsupervised learning, feature engineering, model evaluation, and scikit-learn for practical ML applications.",
    date: "2025",
    category: "Certification"
  },
  {
    icon: <FiAward className="h-6 w-6" />,
    title: "Published Fine-Tuned Models on Hugging Face",
    organization: "Hugging Face Hub",
    description: "FLAN-T5 Summarizer with reproducible evaluation achieving 49.01 ROUGE-1 and 72.25 BERTScore F1 on SAMSum dataset",
    date: "Oct 2025",
    category: "Publication"
  },
  {
    icon: <FiStar className="h-6 w-6" />,
    title: "VIT Bhopal Academic Excellence",
    organization: "VIT Bhopal University",
    description: "Maintained 8.45 CGPA with focus on AI/ML coursework including DSA, Cloud Computing, and Software Engineering",
    date: "2023-Present",
    category: "Academic"
  }
];

export default function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section className="py-20 px-4" id="achievements">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-1.5 mb-4 text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
            Recognition & Growth
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Achievements & Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Awards, certifications, and milestones in my journey
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg group-hover:scale-110 transition-transform">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {achievement.category}
                        </Badge>
                        <CardTitle className="text-lg">
                          {achievement.title}
                        </CardTitle>
                      </div>
                    </div>
                    {achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        aria-label="View credential"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <CardDescription className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
                    {achievement.organization}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {achievement.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.date}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
