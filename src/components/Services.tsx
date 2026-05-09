"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    category: "Manicures",
    glyph: "✦",
    description: "From classic polish to architectural acrylic art — every set is a collaboration.",
    items: [
      { name: "Classic Manicure",     price: "From $20",  tag: ""      },
      { name: "Gel Manicure",         price: "From $35",  tag: ""      },
      { name: "Dip Powder",           price: "From $45",  tag: "Popular" },
      { name: "Acrylic Full Set",     price: "From $55",  tag: ""      },
      { name: "Nail Art & Design",    price: "From $10",  tag: ""      },
    ],
  },
  {
    category: "Pedicures",
    glyph: "◆",
    description: "Ritual foot care that restores, softens, and leaves you walking differently.",
    items: [
      { name: "Classic Pedicure",     price: "From $30",  tag: ""       },
      { name: "Spa Pedicure",         price: "From $45",  tag: ""       },
      { name: "Gel Pedicure",         price: "From $55",  tag: ""       },
      { name: "Hot Stone Pedicure",   price: "From $65",  tag: "Luxury" },
    ],
  },
  {
    category: "Spa Treatments",
    glyph: "◈",
    description: "Slow-down rituals. Paraffin, callus care, and the full mani-pedi experience.",
    items: [
      { name: "Paraffin Treatment",   price: "From $20",  tag: ""       },
      { name: "Callus Removal",       price: "From $15",  tag: ""       },
      { name: "Mani & Pedi Combo",    price: "From $60",  tag: "Best Value" },
      { name: "Gel Extensions",       price: "From $75",  tag: ""       },
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0, 0.1, 1] }}
      className="group relative flex flex-col border border-[rgba(201,169,110,0.15)] hover:border-[rgba(201,169,110,0.35)] bg-bg-surface/60 hover:bg-bg-surface transition-all duration-500"
      style={{ borderRadius: "2px" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="p-8 md:p-10 flex flex-col gap-7 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-gold text-2xl" aria-hidden="true">
              {service.glyph}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
              {service.category}
            </h3>
          </div>
          <span className="overline text-warm-500 mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed" style={{ fontWeight: 300 }}>
          {service.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[rgba(201,169,110,0.2)] to-transparent" />

        {/* Service list */}
        <ul className="flex flex-col gap-4 flex-1">
          {service.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between group/item"
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-gold-dim group-hover/item:bg-gold transition-colors duration-300" />
                <span className="text-text-secondary text-sm group-hover/item:text-text-primary transition-colors duration-300">
                  {item.name}
                </span>
                {item.tag && (
                  <span
                    className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase border border-[rgba(201,169,110,0.3)] text-gold-dim"
                    style={{ borderRadius: "1px" }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              <span className="text-gold-text text-sm font-medium ml-4 shrink-0">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA */}
      <div className="px-8 md:px-10 pb-8">
        <a
          href="tel:+19739431404"
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-text-tertiary hover:text-gold-text transition-colors duration-300 group/cta"
        >
          <span>Reserve a time</span>
          <span className="transform translate-x-0 group-hover/cta:translate-x-1 transition-transform duration-300">
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="section-padding bg-bg-base relative overflow-hidden">
      {/* Art Deco grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,169,110,0.04) 59px, rgba(201,169,110,0.04) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,169,110,0.04) 59px, rgba(201,169,110,0.04) 60px)
          `,
          zIndex: 0,
        }}
      />

      <div className="container-default relative z-10">
        {/* Section heading */}
        <div ref={headingRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >
            <div className="art-deco-rule">
              <span className="overline text-gold-text">Our Services</span>
            </div>

            <h2 className="font-display font-semibold text-text-primary max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Crafted with
              <br />
              <em className="text-gold-gradient not-italic">intention</em>
              {" "}& care
            </h2>

            <p className="text-text-secondary text-lg max-w-xl mt-2" style={{ fontWeight: 300 }}>
              Every treatment is designed around your experience—
              not just the result. Call to ask about any service.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="tel:+19739431404"
                className="overline text-gold-text hover:text-gold-bright transition-colors duration-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                (973) 943-1404
              </a>
            </div>
          </motion.div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.category} service={service} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-text-tertiary text-xs tracking-wide mt-12"
        >
          Prices are estimates. Call{" "}
          <a href="tel:+19739431404" className="text-gold-dim hover:text-gold-text transition-colors">
            (973) 943-1404
          </a>{" "}
          to confirm current pricing. Accepting cash & credit card.
        </motion.p>
      </div>
    </section>
  );
}
