"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "168+",  label: "Happy Clients",       sub: "4.2★ on Google" },
  { value: "10+",   label: "Years Serving Orange", sub: "Community-rooted" },
  { value: "3",     label: "Signature Treatments", sub: "Manicure · Pedicure · Spa" },
  { value: "100%",  label: "Attention to Detail",  sub: "Every single time" },
];

const PILLARS = [
  {
    icon: "◆",
    title:  "Precision",
    body:   "Every line, every edge. We move slowly because the details deserve it. Our techs treat each set as the only one being done that day.",
  },
  {
    icon:  "✦",
    title: "Luxury",
    body:  "Luxury isn't a price point — it's a feeling. From the moment you walk in to the moment you leave, every interaction is intentional.",
  },
  {
    icon:  "◈",
    title: "Community",
    body:  "We are City of Orange. 168 reviews from real neighbors who trust us with their most personal expression — their hands.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-bg-base relative overflow-hidden"
    >
      {/* Decorative top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />

      {/* Large decorative glyph */}
      <motion.div
        style={{ y }}
        className="absolute right-[-5%] top-[10%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display text-[20rem] text-gold opacity-[0.025] leading-none"
          style={{ letterSpacing: "-0.05em" }}
        >
          NF
        </span>
      </motion.div>

      <div className="container-default relative z-10">
        {/* Section header */}
        <div ref={headingRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="art-deco-rule mb-5">
              <span className="overline text-gold-text">Our Story</span>
            </div>
            <h2
              className="font-display font-semibold text-text-primary max-w-xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              More than a
              <br />
              nail salon.{" "}
              <em className="text-gold-gradient not-italic">A ritual.</em>
            </h2>
          </motion.div>
        </div>

        {/* Two-column story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-6"
          >
            <p className="text-text-primary text-xl leading-relaxed" style={{ fontWeight: 300 }}>
              Nails Fever & Spa has been a fixture in City of Orange for years — not because we
              followed trends, but because we set our own standard. 168 reviews and a 4.2-star
              rating don't happen by accident.
            </p>
            <p className="text-text-secondary leading-relaxed" style={{ fontWeight: 300 }}>
              Located at 60 Main Street, we're the neighborhood's best-kept secret — a space where
              every client is greeted by name, every set is a conversation, and every service is
              delivered with the patience the craft demands.
            </p>
            <p className="text-text-secondary leading-relaxed" style={{ fontWeight: 300 }}>
              We offer the full range — from a quick classic manicure to a 90-minute hot stone
              pedicure ritual. But our real specialty? Making you feel like the only person in
              the room.
            </p>

            {/* Hours */}
            <div
              className="mt-4 border border-[rgba(201,169,110,0.15)] p-6"
              style={{ borderRadius: "2px" }}
            >
              <p className="overline text-gold-text mb-4">Hours</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                {[
                  { day: "Mon",        hours: "9:30 AM – 6:00 PM" },
                  { day: "Tue",        hours: "Closed" },
                  { day: "Wed – Thu",  hours: "9:30 AM – 6:00 PM" },
                  { day: "Fri – Sat",  hours: "9:00 AM – 6:00 PM" },
                  { day: "Sun",        hours: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="contents">
                    <span className="text-text-secondary text-sm">{row.day}</span>
                    <span
                      className={`text-sm ${
                        row.hours === "Closed" ? "text-text-tertiary" : "text-text-primary"
                      }`}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
                className="group border border-[rgba(201,169,110,0.12)] hover:border-[rgba(201,169,110,0.3)] bg-bg-surface/50 p-6 transition-all duration-500 flex flex-col gap-2"
                style={{ borderRadius: "2px" }}
              >
                <span
                  className="font-display text-gold-gradient"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1, fontWeight: 600 }}
                >
                  {stat.value}
                </span>
                <span className="text-text-primary text-sm font-medium">{stat.label}</span>
                <span className="text-text-tertiary text-xs">{stat.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(201,169,110,0.1)]"
          style={{ borderRadius: "2px" }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group bg-bg-base hover:bg-bg-surface transition-colors duration-500 p-8 md:p-10 flex flex-col gap-5"
            >
              <span className="text-gold text-2xl">{pillar.icon}</span>
              <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-gold-text transition-colors duration-500">
                {pillar.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm" style={{ fontWeight: 300 }}>
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
