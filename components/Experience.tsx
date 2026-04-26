"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  duration: string;
  type: string;
}

const fallbackExperience: ExperienceItem[] = [
  {
    _id: "1",
    company: "CanGrow Group",
    role: "Team Leader - Graphic Designer",
    duration: "Nov 2024 – Present",
    type: "Full Time",
  },
  {
    _id: "2",
    company: "Creative Corner",
    role: "Mid. Graphic designer",
    duration: "Nov 2023 - Nov 2024",
    type: "Full Time",
  },
  {
    _id: "3",
    company: "To Print Agency",
    role: "Printing Designer",
    duration: "Fep 2020 - Oct 2023",
    type: "Full Time",
  },
];

const typeColors: Record<string, string> = {
  "full-time": "bg-primary/10 text-primary border-primary/30",
  freelance: "bg-green-500/10 text-green-400 border-green-500/30",
  internship: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  contract: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "part-time": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

export default function Experience({ data }: { data: ExperienceItem[] }) {
  const items = data?.length > 0 ? data : fallbackExperience;

  return (
    <SectionWrapper id="experience">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Experience
        </motion.h2>
        <p className="text-text-secondary">Where I&apos;ve honed my craft.</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-[0.5px]" />

        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`relative flex items-start gap-8 mb-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-8 md:left-1/2 top-2 w-4 h-4 -ml-2 md:-ml-2 rounded-full bg-primary border-4 border-background z-10 shadow-[0_0_12px_rgba(0, 153, 221, 0.8)]" />

            {/* Card - positioned with padding */}
            <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)] bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(245,127,0,0.05)]">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-secondary font-bold text-lg group-hover:text-primary transition-colors duration-300">
                  {item.company}
                </h3>
                {item.type && (
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold ${
                      typeColors[item.type] || typeColors["full-time"]
                    }`}
                  >
                    {item.type}
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-sm mb-2">{item.role}</p>
              <p className="text-text-muted text-xs">{item.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
