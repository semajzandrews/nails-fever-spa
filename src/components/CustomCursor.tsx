"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const isHover  = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    // Attach hover detection to interactive elements
    const attachHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    window.addEventListener("mousemove", onMove);
    attachHover();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const { x, y } = posRef.current;

      // Dot snaps instantly
      dot.style.transform  = `translate(${x - 4}px, ${y - 4}px)`;

      // Ring lags behind
      ringPos.current.x = lerp(ringPos.current.x, x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, y, 0.1);
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;

      const scale = isHover.current ? 2.2 : 1;
      ring.style.transform  = `translate(${rx - 20}px, ${ry - 20}px) scale(${scale})`;
      ring.style.opacity    = isHover.current ? "0.6" : "1";

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full bg-gold"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] w-10 h-10 rounded-full border border-gold transition-opacity duration-300"
        style={{ willChange: "transform", opacity: 1 }}
      />
    </>
  );
}
