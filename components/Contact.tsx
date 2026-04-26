"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            Let&apos;s Work Together
          </motion.h2>
          <p className="text-text-secondary">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs text-text-muted uppercase tracking-widest mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-secondary text-sm placeholder:text-text-muted focus:border-primary focus:ring-0 transition-colors duration-300 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs text-text-muted uppercase tracking-widest mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-secondary text-sm placeholder:text-text-muted focus:border-primary focus:ring-0 transition-colors duration-300 outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs text-text-muted uppercase tracking-widest mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-secondary text-sm placeholder:text-text-muted focus:border-primary focus:ring-0 transition-colors duration-300 outline-none resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-primary text-background font-semibold text-sm tracking-wide rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,127,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Status messages */}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-400 text-sm"
            >
              ✓ Message sent successfully! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 text-sm"
            >
              Something went wrong. Please try again or email me directly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
