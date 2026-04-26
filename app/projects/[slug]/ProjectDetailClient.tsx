// ...existing code...
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";

interface ProjectDetailProps {
  project: {
    title: string;
    category?: string;
    date?: string;
    description?: any[];
  };
  coverUrl: string | null;
  galleryItems: {
    src: string;
    width: number;
    height: number;
    origWidth?: number | null;
    origHeight?: number | null;
  }[];
}

export default function ProjectDetailClient({
  project,
  coverUrl,
  galleryItems,
}: ProjectDetailProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Hero Image */}
      {coverUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/9] max-w-7xl mx-auto px-6 lg:px-8"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </motion.div>
      )}

      {/* Project Info */}
      <div className="max-w-7xl mx-auto  px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4">
            {project.category && (
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                {project.category}
              </span>
            )}
            {project.date && (
              <span className="text-text-muted text-xs">
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-8">
            {project.title}
          </h1>

          {project.description && (
            <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:text-secondary max-w-none">
              <PortableText value={project.description} />
            </div>
          )}
        </motion.div>

        {/* Gallery */}
        {galleryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-secondary mb-8">Gallery</h2>

            <div
              className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 space-y-6" 
              // className="columns-2 md:columns-3 xl:columns-4" 
              style={{ columnGap: "1.5rem" }}
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="mb-6 break-inside-avoid rounded-xl overflow-hidden border border-border bg-muted"
                >
                  {/* Use plain <img> so browser preserves natural height (masonry friendly).
                      Add width/height attributes to help layout and avoid CLS. */}
                  <img
                    src={item.src}
                    alt={`${project.title} — Image ${index + 1}`}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover block"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
// ...existing code...