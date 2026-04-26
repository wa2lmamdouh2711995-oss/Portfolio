"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import SectionWrapper from "./SectionWrapper";

import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandAdobeIndesign,
  TbBrandAdobePremier,
  TbBrandBlender,
} from "react-icons/tb";
import { CapCut } from '@lobehub/icons';
import { JSX } from "react";



interface SoftwareItem {
_id: string;
name: string;
icon: any;
proficiency: number;
}

const fallbackSoftware: SoftwareItem[] = [
{ _id: "1", name: "Photoshop", icon: null, proficiency: 100 },
{ _id: "2", name: "Illustrator", icon: null, proficiency: 100 },
{ _id: "3", name: "InDesign", icon: null, proficiency: 80 },
{ _id: "4", name: "Premiere Pro", icon: null, proficiency: 50 },
{ _id: "5", name: "Capcut", icon: null, proficiency: 80 },
{ _id: "6", name: "Blender", icon: null, proficiency: 30 },
];

const Icons: Record<string, JSX.Element> = {
  Photoshop: <TbBrandAdobePhotoshop size={28} />,
  Illustrator: <TbBrandAdobeIllustrator size={28} />,
  InDesign: <TbBrandAdobeIndesign size={28} />,
  "Premiere Pro": <TbBrandAdobePremier size={28} />,
  Capcut: <CapCut size={26} />,
  Blender: <TbBrandBlender size={28} />,
};

// 🧠 Smart icon resolver
function getIconElement(item: SoftwareItem) {
// 1) لو فيه صورة من Sanity
try {
if (item.icon && typeof item.icon === "object") {
const src = urlFor(item.icon)?.url();
if (src) {
return ( <Image
         src={src}
         alt={item.name}
         width={48}
         height={48}
         className="object-contain p-2"
       />
);
}
}
} catch {}

// 2) لو فيه icon جاهز
if (Icons[item.name]) return Icons[item.name];

// 3) fallback محترم
return ( <span className="text-primary font-bold text-sm">
{item.name.charAt(0)} </span>
);
}

export default function Software({ data }: { data: SoftwareItem[] }) {
const items = data?.length > 0 ? data : fallbackSoftware;

return ( <SectionWrapper id="software">
{/* Title */} <div className="text-center mb-16">
<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="text-4xl md:text-5xl font-bold text-secondary mb-4"
>
Tools & Software
</motion.h2> <p className="text-text-secondary">My creative arsenal.</p> </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
    {items.map((tool, index) => {
      // 🎯 mouse interaction
      const mouseX = useMotionValue(0);
      const mouseY = useMotionValue(0);

      const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
      const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

      function handleMouseMove(e: any) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }

      return (
        <motion.div
          key={tool._id}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="relative overflow-hidden group h-[150px] flex flex-col justify-between p-5 bg-surface border border-border rounded-2xl text-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(0, 153, 221, 0.2)]"
        >
          {/* Glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: `radial-gradient(250px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(0, 153, 221, 0.2), transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              {getIconElement(tool)}
            </div>

            <p className="text-secondary text-sm font-medium leading-none">
              {tool.name}
            </p>
          </div>

          {/* Progress */}
          {tool.proficiency && (
            <div className="relative z-10 w-full">
              <div className="w-full h-[6px] bg-border/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tool.proficiency}%` }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                />
              </div>
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
</SectionWrapper>

);
}