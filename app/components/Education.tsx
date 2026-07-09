"use client";
import { motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "VIT Bhopal University",
    years: "2023 - 2027",
    location: "Bhopal, Madhya Pradesh",
    description: "CGPA: 8.57/10 | Focus on Artificial Intelligence, Machine Learning, and Cloud Computing",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Object-Oriented Programming",
      "Computer Networks",
      "Database Management Systems",
      "Cloud Computing",
      "Software Engineering"
    ]
  }
];

export default function Education() {
  return (
    <section className="py-24 px-4 border-t border-border/40">
      <div className="max-w-4xl mx-auto">
        {/* Monospace Log Header */}
        <div className="log-header">
          <span>// 07 — EDUCATION & CREDENTIALS</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {educationData.map((item, index) => (
            <div 
              key={index}
              className="border border-border/80 p-6 md:p-8 bg-card/25 relative schematic-bracket-card max-w-3xl"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5 mb-5">
                <div>
                  <h3 className="text-xl font-display font-medium text-foreground mb-1.5">
                    {item.degree}
                  </h3>
                  <div className="font-mono text-xs text-accent font-semibold flex items-center gap-1.5">
                    <FiBookOpen className="h-3.5 w-3.5" />
                    <span>{item.institution}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5" />
                    {item.years}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-sans leading-relaxed text-muted-foreground mb-6">
                {item.description}
              </p>

              {/* Coursework tags */}
              <div>
                <h4 className="font-mono text-[10px] uppercase text-muted-foreground/60 tracking-wider mb-3">
                  // SELECTED_COURSEWORK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.courses.map((course, courseIndex) => (
                    <span 
                      key={courseIndex}
                      className="font-mono text-xs text-muted-foreground border border-border/60 bg-background px-2.5 py-1"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}