"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Services",   href: "#services"  },
  { label: "Gallery",    href: "#gallery"   },
  { label: "About",      href: "#about"     },
  { label: "Contact",    href: "#contact"   },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-bg-base border-t border-[rgba(201,169,110,0.1)] overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent" />

      <div className="container-default py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-display text-2xl font-semibold text-text-primary tracking-tight">
                Nails Fever
              </span>
              <br />
              <span className="overline text-gold-text" style={{ fontSize: "0.55rem" }}>
                & Spa · City of Orange, NJ
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed" style={{ fontWeight: 300 }}>
              Where every detail tells a story. Luxury nail artistry and spa
              treatments at 60 Main Street since day one.
            </p>
            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill={i < 4 ? "#C9A96E" : "rgba(201,169,110,0.4)"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-text-tertiary text-xs">168 reviews</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <p className="overline text-gold-dim">Navigate</p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-text-secondary hover:text-gold-text transition-colors duration-300 text-left flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <p className="overline text-gold-dim">Get In Touch</p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+19739431404"
                className="group flex items-start gap-3 text-sm text-text-secondary hover:text-gold-text transition-colors duration-300"
              >
                <svg className="w-4 h-4 mt-0.5 text-gold-dim group-hover:text-gold transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                (973) 943-1404
              </a>

              <a
                href="https://maps.google.com/?q=60+Main+St+City+of+Orange+NJ+07050"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-text-secondary hover:text-gold-text transition-colors duration-300"
              >
                <svg className="w-4 h-4 mt-0.5 text-gold-dim group-hover:text-gold transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                60 Main Street<br />
                City of Orange, NJ 07050
              </a>

              <div className="flex items-start gap-3 text-sm text-text-secondary">
                <svg className="w-4 h-4 mt-0.5 text-gold-dim shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  Mon/Wed/Thu: 9:30AM–6PM<br />
                  Fri/Sat: 9:00AM–6PM<br />
                  <span className="text-text-tertiary">Tue/Sun: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(201,169,110,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-xs">
            © {year} Nails Fever & Spa. All rights reserved. · City of Orange, NJ
          </p>

          <div className="flex items-center gap-6">
            <span className="text-text-tertiary text-xs">Cash & Credit Card Accepted</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold opacity-60" />
              <span className="text-text-tertiary text-xs">Walk-ins Welcome</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large decorative bottom text */}
      <div className="text-center pb-4 overflow-hidden">
        <span
          className="font-display text-[8rem] md:text-[14rem] text-gold opacity-[0.02] leading-none select-none"
          style={{ letterSpacing: "-0.05em" }}
          aria-hidden="true"
        >
          FEVER
        </span>
      </div>
    </footer>
  );
}
