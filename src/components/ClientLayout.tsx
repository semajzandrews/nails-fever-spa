"use client";

import dynamic from "next/dynamic";

// All components that import framer-motion must skip SSR —
// FM v11 accesses localStorage at module-init time, crashing Node.
const Navigation   = dynamic(() => import("./Navigation"),   { ssr: false });
const Services     = dynamic(() => import("./Services"),     { ssr: false });
const Gallery      = dynamic(() => import("./Gallery"),      { ssr: false });
const About        = dynamic(() => import("./About"),        { ssr: false });
const Booking      = dynamic(() => import("./Booking"),      { ssr: false });
const Footer       = dynamic(() => import("./Footer"),       { ssr: false });
const Hero         = dynamic(() => import("./Hero"),         { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientLayout() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Booking />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
