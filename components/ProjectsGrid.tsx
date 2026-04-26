"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  category: string;
  date: string;
}

const categories = [
  "All",
  "Social Media",
  "Branding",
  "3D & Manipulation",
  "Typo & Calligraphy",
  "Printing & Layout",


];

// Fallback sample projects when no CMS data
const sampleProjects: Project[] = [
  {
    _id: "1",
    title: "Brand Identity — Luxe",
    slug: { current: "brand-identity-luxe" },
    coverImage: null,
    category: "branding",
    date: "2024-06-15",
  },
  {
    _id: "2",
    title: "Editorial Spread — Vogue",
    slug: { current: "editorial-spread-vogue" },
    coverImage: null,
    category: "editorial",
    date: "2024-03-20",
  },
  {
    _id: "3",
    title: "App UI — Fintech Dashboard",
    slug: { current: "fintech-dashboard" },
    coverImage: null,
    category: "ui-ux",
    date: "2024-01-10",
  },
  {
    _id: "4",
    title: "Motion Graphics — Nike",
    slug: { current: "motion-nike" },
    coverImage: null,
    category: "motion",
    date: "2023-11-05",
  },
  {
    _id: "5",
    title: "Illustration Series — Dreams",
    slug: { current: "illustration-dreams" },
    coverImage: null,
    category: "illustration",
    date: "2023-09-18",
  },
  {
    _id: "6",
    title: "Print Campaign — Eco",
    slug: { current: "print-eco" },
    coverImage: null,
    category: "print",
    date: "2023-07-22",
  },
];

export default function ProjectsGrid({
  projects,
}: {
  projects: Project[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const displayProjects = projects?.length > 0 ? projects : sampleProjects;

  const filtered =
    activeCategory === "All"
      ? displayProjects
      : displayProjects.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <SectionWrapper id="projects">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Selected Work
        </motion.h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          A curated collection of projects spanning branding, digital design, and creative direction.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-background border-primary font-semibold"
                : "border-border text-text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <motion.div
        layout
        className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 space-y-6"
        // className="columns-2 md:columns-2 lg:columns-4 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted mt-12">
          No projects found in this category.
        </p>
      )}
    </SectionWrapper>
  );
}
