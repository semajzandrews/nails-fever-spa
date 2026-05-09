"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Gallery items — editorial descriptions + gold palette abstractions
// In production these would be replaced with actual salon photography.
// The CSS-generated art placeholders match the brand palette perfectly.

type GalleryItem = {
  id:     number;
  title:  string;
  tag:    string;
  aspect: "tall" | "wide" | "square";
  hue:    "gold" | "burgundy" | "dark" | "warm";
};

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Sculpted Almond Set",  tag: "Acrylic",  aspect: "tall",   hue: "gold"     },
  { id: 2, title: "Midnight Gel Art",     tag: "Gel",      aspect: "square", hue: "burgundy" },
  { id: 3, title: "French Reimagined",    tag: "Gel",      aspect: "wide",   hue: "dark"     },
  { id: 4, title: "Hot Stone Ritual",     tag: "Pedicure", aspect: "tall",   hue: "warm"     },
  { id: 5, title: "Gold Foil Stiletto",   tag: "Nail Art", aspect: "wide",   hue: "gold"     },
  { id: 6, title: "Dip Powder Ombré",     tag: "Dip",      aspect: "square", hue: "dark"     },
  { id: 7, title: "Spa Pedicure Ritual",  tag: "Pedicure", aspect: "tall",   hue: "warm"     },
  { id: 8, title: "Marble & Chrome",      tag: "Nail Art", aspect: "square", hue: "burgundy" },
];

const HUE_STYLES: Record<string, string> = {
  gold: `
    background: linear-gradient(145deg, #1C1512 0%, #2E2420 40%, #C9A96E22 70%, #1C1512 100%);
    border-color: rgba(201,169,110,0.2);
  `,
  burgundy: `
    background: linear-gradient(145deg, #0A0706 0%, #2D0A12 50%, #6B1A2A33 80%, #0A0706 100%);
    border-color: rgba(107,26,42,0.3);
  `,
  dark: `
    background: linear-gradient(145deg, #120E0C 0%, #1C1512 60%, #2E2420 100%);
    border-color: rgba(201,169,110,0.1);
  `,
  warm: `
    background: linear-gradient(145deg, #1F1610 0%, #2E2420 50%, #C9A96E11 100%);
    border-color: rgba(201,169,110,0.15);
  `,
};

const ASPECT_CLASSES: Record<string, string> = {
  tall:   "row-span-2",
  wide:   "col-span-2",
  square: "",
};

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.25, 0, 0.1, 1] }}
      className={`group relative overflow-hidden border ${ASPECT_CLASSES[item.aspect]} min-h-48`}
      style={{
        borderRadius: "2px",
        background: `linear-gradient(145deg, #1C1512 0%, #2E2420 60%, #0A0706 100%)`,
        borderColor: "rgba(201,169,110,0.12)",
      }}
    >
      {/* Colored gradient overlay unique to each item */}
      <div
        className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background: item.hue === "gold"
            ? "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.2) 0%, transparent 70%)"
            : item.hue === "burgundy"
            ? "radial-gradient(ellipse at 70% 30%, rgba(107,26,42,0.4) 0%, transparent 70%)"
            : item.hue === "warm"
            ? "radial-gradient(ellipse at 50% 70%, rgba(201,169,110,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(46,36,32,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Geometric Art Deco lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {item.hue === "gold" && (
          <>
            <line x1="0" y1="400" x2="400" y2="0"    stroke="#C9A96E" strokeWidth="0.5" />
            <line x1="0" y1="350" x2="350" y2="0"    stroke="#C9A96E" strokeWidth="0.3" />
            <circle cx="200" cy="200" r="180" stroke="#C9A96E" strokeWidth="0.3" />
            <circle cx="200" cy="200" r="120" stroke="#C9A96E" strokeWidth="0.3" />
            <polygon points="200,40 360,300 40,300" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          </>
        )}
        {item.hue === "burgundy" && (
          <>
            <rect x="40" y="40" width="320" height="320" stroke="#6B1A2A" strokeWidth="0.5" fill="none" />
            <rect x="80" y="80" width="240" height="240" stroke="#6B1A2A" strokeWidth="0.3" fill="none" />
            <line x1="40" y1="40" x2="360" y2="360" stroke="#C9A96E" strokeWidth="0.3" />
            <line x1="360" y1="40" x2="40" y2="360" stroke="#C9A96E" strokeWidth="0.3" />
          </>
        )}
        {item.hue === "dark" && (
          <>
            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#C9A96E" strokeWidth="0.2" />
            ))}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#C9A96E" strokeWidth="0.2" />
            ))}
          </>
        )}
        {item.hue === "warm" && (
          <>
            <ellipse cx="200" cy="200" rx="180" ry="120" stroke="#C9A96E" strokeWidth="0.4" fill="none" />
            <ellipse cx="200" cy="200" rx="120" ry="80" stroke="#C9A96E" strokeWidth="0.3" fill="none" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#C9A96E" strokeWidth="0.3" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#C9A96E" strokeWidth="0.3" />
          </>
        )}
      </svg>

      {/* "Coming soon" watermark — will be replaced with actual photos */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-0 transition-opacity duration-500">
        <span className="font-display text-7xl text-gold rotate-[-15deg]">{item.id}</span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-bg-base/0 group-hover:bg-bg-base/40 transition-colors duration-500" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span
              className="overline text-gold-dim"
              style={{ fontSize: "0.5rem" }}
            >
              {item.tag}
            </span>
            <span className="font-display text-sm font-medium text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {item.title}
            </span>
          </div>
          <span className="w-6 h-6 rounded-full border border-[rgba(201,169,110,0.4)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            <span className="text-gold text-xs">+</span>
          </span>
        </div>
      </div>

      {/* Top-right tag */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span
          className="overline text-gold-dim bg-bg-base/80 px-2 py-1"
          style={{ fontSize: "0.5rem", borderRadius: "1px" }}
        >
          {item.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="gallery" className="section-padding bg-bg-surface relative overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent" />

      <div className="container-default">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >
            <div className="art-deco-rule">
              <span className="overline text-gold-text">Our Work</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2
                className="font-display font-semibold text-text-primary"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
              >
                The Art of
                <br />
                <em className="text-gold-gradient not-italic">the Detail</em>
              </h2>

              <p className="text-text-secondary text-base max-w-xs md:text-right" style={{ fontWeight: 300 }}>
                168+ clients have trusted us with their most visible canvas.
                Photos from satisfied clients, updated weekly.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Masonry-ish grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gridAutoRows: "200px",
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-text-tertiary text-sm">
            Ready to add your look to the gallery?
          </p>
          <a
            href="tel:+19739431404"
            className="group flex items-center gap-3 px-8 py-4 border border-[rgba(201,169,110,0.3)] hover:border-gold text-text-secondary hover:text-gold-text text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-gold-glow-sm"
            style={{ borderRadius: "2px" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:animate-ping" />
            Book an Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
