// ...existing code...
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent, href: string) {
    // allow regular modifiers (open in new tab) to work
    const isModified =
      e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && (e.nativeEvent as any).button === 1);
    const targetId = href.replace(/^#/, "");
    const hrefForLink = `/#${targetId}`;

    if (isModified) {
      // let browser handle it (user wants new tab / special click)
      return;
    }

    e.preventDefault();

    // If already on home, smooth-scroll to section
    if (pathname === "/" || pathname === "") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // update the hash without adding a new history entry
        history.replaceState(null, "", `#${targetId}`);
      } else {
        // If element not found, still update hash
        history.replaceState(null, "", `#${targetId}`);
      }
      setMobileOpen(false);
      return;
    }

    // Not on home: navigate to home with hash
    router.push(hrefForLink);
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl flex gap-2 items-center font-bold text-secondary tracking-tight hover:text-primary transition-colors duration-300"
          >
            <span className="relative aspect-[63/55] h-8">
              <Image src="/Photos/About/icon.png" alt="Wael Mamdouh logo" fill/>
            </span>
            <span>Wael Mamdouh<span className="text-primary">.</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const id = link.href.replace(/^#/, "");
              const hrefForLink = `/#${id}`;
              return (
                <a
                  key={link.label}
                  href={hrefForLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-text-secondary hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-secondary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-secondary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-secondary"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => {
              const id = link.href.replace(/^#/, "");
              const hrefForLink = `/#${id}`;
              return (
                <motion.a
                  key={link.label}
                  href={hrefForLink}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                  }}
                  className="text-3xl font-semibold text-secondary hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// ...existing code...