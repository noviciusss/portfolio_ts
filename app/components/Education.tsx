"use client";
import { motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "VIT Bhopal University",
    years: "2023 - 2027",
    location: "Bhopal, Madhya Pradesh",
    description: "Specializing in Artificial Intelligence, Machine Learning, and Cloud Computing.",
    cgpa: "8.57 / 10",
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
    <section className="py-24 px-4 border-t-[3px] border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="nb-section-label">SECTION 05</span>
        <h2 className="nb-section-heading">Education</h2>

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
              className="nb-card p-6 md:p-8 bg-card max-w-3xl"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-border pb-5 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-foreground mb-1.5 uppercase leading-tight">
                    {item.degree}
                  </h3>
                  <div className="font-mono text-xs text-accent font-extrabold flex items-center gap-1.5">
                    <FiBookOpen className="h-3.5 w-3.5 text-foreground" />
                    <span className="text-foreground">{item.institution}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-xs text-muted-foreground font-bold">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5 text-foreground" />
                    {item.years}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="h-3.5 w-3.5 text-foreground" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* CGPA display */}
              <div className="border-[3px] border-border bg-accent p-4 shadow-[4px_4px_0_0_var(--border)] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <span className="text-[10px] uppercase text-foreground/75 tracking-wider font-extrabold">// ACCREDITATION_CGPA</span>
                <span className="text-lg font-black text-foreground">{item.cgpa}</span>
              </div>

              {/* Description */}
              <p className="text-sm font-sans leading-relaxed text-muted-foreground mb-6">
                {item.description}
              </p>

              {/* Coursework tags */}
              <div>
                <h4 className="font-mono text-[10px] uppercase text-muted-foreground/60 tracking-wider mb-3 font-bold">
                  // SELECTED_COURSEWORK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.courses.map((course, courseIndex) => (
                    <span 
                      key={courseIndex}
                      className={`font-mono text-xs text-foreground border-2 border-border bg-background px-2.5 py-1 shadow-[1.5px_1.5px_0_0_var(--border)] tag-tilt-${courseIndex % 3}`}
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