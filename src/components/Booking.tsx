"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const HOURS = [
  { day: "Monday",    open: "9:30 AM", close: "6:00 PM", closed: false },
  { day: "Tuesday",   open: "",        close: "",         closed: true  },
  { day: "Wednesday", open: "9:30 AM", close: "6:00 PM", closed: false },
  { day: "Thursday",  open: "9:30 AM", close: "6:00 PM", closed: false },
  { day: "Friday",    open: "9:00 AM", close: "6:00 PM", closed: false },
  { day: "Saturday",  open: "9:00 AM", close: "6:00 PM", closed: false },
  { day: "Sunday",    open: "",        close: "",         closed: true  },
];

const TODAY_INDEX = new Date().getDay(); // 0=Sun

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  // Determine current open/closed status
  const nowHour   = new Date().getHours();
  const todayInfo = HOURS[TODAY_INDEX];
  const isOpen    = !todayInfo.closed && nowHour >= 9 && nowHour < 18;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A0706 0%, #120E0C 50%, #0A0706 100%)",
      }}
    >
      {/* Decorative diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(201,169,110,0.02) 40px,
            rgba(201,169,110,0.02) 41px
          )`,
          zIndex: 0,
        }}
      />

      {/* Glowing center orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="container-default relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent to-[rgba(201,169,110,0.5)]" />
            <span className="overline text-gold-text">Reserve Your Time</span>
            <span className="block w-16 h-px bg-gradient-to-l from-transparent to-[rgba(201,169,110,0.5)]" />
          </div>

          <h2
            className="font-display font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Ready when
            <br />
            <em className="text-gold-gradient not-italic">you are.</em>
          </h2>

          <p className="text-text-secondary text-lg max-w-md mx-auto" style={{ fontWeight: 300 }}>
            We book by phone — call us directly to choose your service and reserve your
            preferred time. No app, no waitlist, just a real conversation.
          </p>
        </motion.div>

        {/* Main CTA block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-8 mb-20"
        >
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-warm-500"}`}
            />
            <span className="text-sm text-text-secondary">
              {isOpen ? "Open now · Walk-ins welcome" : "Currently closed · Call to reserve a time"}
            </span>
          </div>

          {/* Phone number — the hero CTA */}
          <a
            href="tel:+19739431404"
            className="group relative"
          >
            <span
              className="font-display text-gold-gradient"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 600 }}
            >
              (973) 943-1404
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
          </a>

          <p className="text-text-tertiary text-xs tracking-widest uppercase">
            Tap to call · 60 Main St, City of Orange, NJ
          </p>

          {/* Secondary CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19739431404"
              className="group relative px-10 py-5 bg-gold hover:bg-gold-bright text-bg-base font-medium text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-gold-glow"
              style={{ borderRadius: "2px" }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call to Book
              </span>
            </a>

            <a
              href="https://maps.google.com/?q=60+Main+St+City+of+Orange+NJ+07050"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 border border-[rgba(201,169,110,0.3)] hover:border-gold text-text-secondary hover:text-gold-text text-sm tracking-widest uppercase transition-all duration-500 flex items-center gap-3 hover:shadow-gold-glow-sm"
              style={{ borderRadius: "2px" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </motion.div>

        {/* Hours table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <div className="art-deco-rule mb-8">
            <span className="overline text-gold-dim">Hours of Operation</span>
          </div>

          <div className="flex flex-col divide-y divide-[rgba(201,169,110,0.08)]">
            {HOURS.map((row, i) => {
              const isToday = i === TODAY_INDEX;
              return (
                <motion.div
                  key={row.day}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  className={`flex justify-between items-center py-3.5 px-2 transition-colors duration-300 ${
                    hovered === i ? "bg-bg-surface/40" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-400" : "bg-warm-600"}`}
                      />
                    )}
                    <span
                      className={`text-sm ${
                        isToday ? "text-gold-text font-medium" : "text-text-secondary"
                      }`}
                    >
                      {row.day}
                      {isToday && (
                        <span className="overline ml-2 text-gold-dim" style={{ fontSize: "0.5rem" }}>
                          Today
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      row.closed ? "text-text-tertiary italic" : isToday ? "text-gold-text" : "text-text-primary"
                    }`}
                  >
                    {row.closed ? "Closed" : `${row.open} – ${row.close}`}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-text-tertiary text-xs tracking-widest uppercase">
            Find Us
          </span>
          <address className="text-text-secondary text-base not-italic">
            60 Main Street, City of Orange, NJ 07050
          </address>
          <span className="text-text-tertiary text-xs">
            Cash & Credit Card · Walk-ins welcome when available
          </span>
        </motion.div>
      </div>
    </section>
  );
}
