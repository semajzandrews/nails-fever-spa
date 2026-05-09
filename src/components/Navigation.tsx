"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services",  href: "#services"  },
  { label: "Gallery",   href: "#gallery"   },
  { label: "About",     href: "#about"     },
  { label: "Contact",   href: "#contact"   },
];

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastScroll.current && y > 300);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y:       hidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0, 0.1, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-base/90 backdrop-blur-md border-b border-[rgba(201,169,110,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-default flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start gap-0.5 group"
          >
            <span className="font-display text-xl font-semibold text-text-primary tracking-tight group-hover:text-gold transition-colors duration-300">
              Nails Fever
            </span>
            <span className="overline text-gold-text" style={{ fontSize: "0.55rem" }}>
              & Spa · Orange, NJ
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="overline text-text-secondary hover:text-gold-text transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+19739431404"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-[rgba(201,169,110,0.4)] hover:border-gold text-gold-text hover:text-gold-bright text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-gold-glow-sm"
              style={{ borderRadius: "2px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Book Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-end"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-text-primary transition-all duration-300 ${
                  menuOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6"
                }`}
              />
              <span
                className={`block h-px bg-text-primary transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-px bg-text-primary transition-all duration-300 ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-base/98 backdrop-blur-lg flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.href)}
                className="font-display text-4xl font-medium text-text-primary hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="tel:+19739431404"
              className="mt-4 px-8 py-3 border border-gold text-gold-text text-sm tracking-widest uppercase"
              style={{ borderRadius: "2px" }}
            >
              (973) 943-1404
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
