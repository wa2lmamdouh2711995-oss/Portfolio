"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface SkillsData {
  items: string[];
}

const fallbackSkills: string[] = [
  "Client Handling",
  "Creativity",
  "Attention to Detail",
  "Communication Skills",
  "Receiving Feedback",
];

export default function Skills({ data }: { data: SkillsData | null }) {
  const items = data?.items?.length ? data.items : fallbackSkills;

  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Soft Skills
        </motion.h2>
        <p className="text-text-secondary">
          The qualities I bring beyond the screen.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {items.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(0, 153, 221, 0.2)" }}
            className="group p-5 min-h-[82px] grid place-items-center grid text-balance bg-surface border border-border rounded-xl text-center hover:shadow-[0_0_20px_rgba(0, 153, 221, 0.2)] transition-all duration-300"
          >
            <p className="text-sm text-text-secondary group-hover:text-primary transition-colors duration-300 font-medium">
              {skill}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
