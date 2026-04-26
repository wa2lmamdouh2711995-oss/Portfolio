"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`py-24 md:py-32 px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
}
