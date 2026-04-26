"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface EducationItem {
  _id: string;
  university: string;
  degree: string;
  year: string;
}

const fallbackEducation: EducationItem[] = [
  {
    _id: "1",
    university: "Minya University",
    degree: "Bachelor of Computer Science",
    year: "2015",
  },
];

export default function Education({ data }: { data: EducationItem[] }) {
  const items = data?.length > 0 ? data : fallbackEducation;

  return (
    <SectionWrapper id="education">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Education
        </motion.h2>
        <p className="text-text-secondary">The foundation of my craft.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group flex items-start gap-6 p-6 bg-surface border border-border rounded-xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,127,0,0.05)]"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-secondary font-bold text-lg group-hover:text-primary transition-colors duration-300">
                {item.university}
              </h3>
              <p className="text-text-secondary text-sm mt-1">{item.degree}</p>
              {item.year && (
                <p className="text-text-muted text-xs mt-2">{item.year}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
