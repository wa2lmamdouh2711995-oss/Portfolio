"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  category: string;
  date: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(600).format("webp").url()
    : null;

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <motion.div
        className="group relative overflow-hidden rounded-3xl bg-surface border border-border cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-surface-hover flex items-center justify-center">
              <span className="text-text-muted text-sm">No Image</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Orange glow border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(245,127,0,0.1)]" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">
              {project.category || "Design"}
            </p>
            <h3 className="text-secondary text-xl font-bold">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-secondary text-sm font-semibold truncate">
            {project.title}
          </h3>
          <span className="text-text-muted text-xs">
            {project.date ? new Date(project.date).getFullYear() : ""}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
