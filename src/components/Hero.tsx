"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Three.js particle system — floating golden crystals
function initThreeScene(canvas: HTMLCanvasElement) {
  // Dynamically import Three.js to avoid SSR issues
  import("three").then((THREE) => {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // ── Floating particles ──────────────────────────────────
    const PARTICLE_COUNT = 180;
    const positions  = new Float32Array(PARTICLE_COUNT * 3);
    const sizes      = new Float32Array(PARTICLE_COUNT);
    const phases     = new Float32Array(PARTICLE_COUNT);
    const speeds     = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 9;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i]  = Math.random() * 2.5 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = Math.random() * 0.4 + 0.2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("aPhase",   new THREE.BufferAttribute(phases, 1));
    particleGeo.setAttribute("aSpeed",   new THREE.BufferAttribute(speeds, 1));

    // Custom shader for gold sparkles
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aSpeed;
        uniform float uTime;
        uniform vec2  uResolution;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          // Gentle float
          pos.y += sin(uTime * aSpeed + aPhase) * 0.25;
          pos.x += cos(uTime * aSpeed * 0.7 + aPhase) * 0.12;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;

          float depth = (-mvPos.z - 0.1) / (100.0 - 0.1);
          vAlpha = (1.0 - depth) * 0.7 * (0.4 + 0.6 * sin(uTime * aSpeed + aPhase + 1.57));

          gl_PointSize = aSize * (500.0 / -mvPos.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;

        void main() {
          // Soft diamond shape
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = abs(uv.x) + abs(uv.y); // diamond
          float alpha = smoothstep(0.5, 0.1, dist);

          // Gold color: warm champagne
          vec3 gold = mix(
            vec3(0.784, 0.663, 0.431),  // #C9A96E
            vec3(0.941, 0.851, 0.659),  // #F0D9A8
            alpha
          );

          gl_FragColor = vec4(gold, alpha * vAlpha);
        }
      `,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
      },
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Large soft orbs ─────────────────────────────────────
    const orbGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const createOrb = (x: number, y: number, color: string, opacity: number) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        side: THREE.BackSide,
      });
      const mesh = new THREE.Mesh(orbGeometry, mat);
      mesh.position.set(x, y, -3);
      scene.add(mesh);
      return mesh;
    };

    const orb1 = createOrb(-2.5,  1.2, "#C9A96E", 0.04);
    const orb2 = createOrb( 2.8, -0.8, "#6B1A2A", 0.06);
    const orb3 = createOrb( 0.5,  0.0, "#C9A96E", 0.025);

    // ── Mouse parallax ──────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 0.8;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ──────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      (particleMat.uniforms.uResolution.value as { set: (x: number, y: number) => void }).set(
        canvas.clientWidth,
        canvas.clientHeight
      );
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ───────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particleMat.uniforms.uTime.value = t;

      // Lerp camera for parallax
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;
      camera.position.x = target.x;
      camera.position.y = target.y;

      // Rotate particle field very slowly
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.008) * 0.1;

      // Pulse orbs
      orb1.scale.setScalar(1 + Math.sin(t * 0.4) * 0.08);
      orb2.scale.setScalar(1 + Math.cos(t * 0.3) * 0.06);
      orb3.scale.setScalar(1 + Math.sin(t * 0.5 + 1) * 0.1);

      renderer.render(scene, camera);
    };
    animate();

    // Return cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  });
}

// ─── Component ────────────────────────────────────────────────
const WORDS_LINE1 = ["Where", "Every"];
const WORDS_LINE2 = ["Detail", "Tells"];
const WORDS_LINE3 = ["a Story"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Small delay to let layout settle
    const t = setTimeout(async () => {
      cleanupRef.current = initThreeScene(canvas) as unknown as () => void;
    }, 100);

    return () => {
      clearTimeout(t);
      cleanupRef.current?.();
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
  };
  const wordVariants = {
    hidden:  { opacity: 0, y: "110%", rotateX: 15 },
    visible: {
      opacity: 1, y: "0%", rotateX: 0,
      transition: { duration: 1.1, ease: [0.25, 0, 0.05, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-base"
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(10,7,6,0.7) 70%, rgba(10,7,6,0.95) 100%)",
          zIndex: 1,
        }}
      />

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0706)",
          zIndex: 2,
        }}
      />

      {/* Art Deco corner ornaments */}
      <div
        className="absolute top-28 left-8 md:left-16 w-16 h-16 pointer-events-none opacity-30"
        style={{ zIndex: 3 }}
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 32 L2 2 L32 2" stroke="#C9A96E" strokeWidth="1" fill="none" />
          <path d="M8 28 L8 8 L28 8" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <path d="M14 24 L14 14 L24 14" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.6" />
        </svg>
      </div>
      <div
        className="absolute top-28 right-8 md:right-16 w-16 h-16 pointer-events-none opacity-30 scale-x-[-1]"
        style={{ zIndex: 3 }}
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 32 L2 2 L32 2" stroke="#C9A96E" strokeWidth="1" fill="none" />
          <path d="M8 28 L8 8 L28 8" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <path d="M14 24 L14 14 L24 14" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="block w-10 h-px bg-gold opacity-60" />
          <span className="overline text-gold-text">
            City of Orange, NJ · Est. Since Day One
          </span>
          <span className="block w-10 h-px bg-gold opacity-60" />
        </motion.div>

        {/* Main headline — word-by-word reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-semibold text-text-primary"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 7.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            perspective: "800px",
            overflow: "hidden",
          }}
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            {WORDS_LINE1.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em] last:mr-0"
                style={{ display: "inline-block" }}
              >
                {w}
              </motion.span>
            ))}
          </span>

          {/* Line 2 — italic gold */}
          <span className="block overflow-hidden">
            {WORDS_LINE2.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block mr-[0.25em] last:mr-0 ${
                  i === 0 ? "italic text-gold-gradient" : ""
                }`}
                style={{ display: "inline-block" }}
              >
                {w}
              </motion.span>
            ))}
          </span>

          {/* Line 3 */}
          <span className="block overflow-hidden">
            {WORDS_LINE3.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em] last:mr-0"
                style={{ display: "inline-block" }}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="mt-8 text-text-secondary text-lg md:text-xl leading-relaxed max-w-md mx-auto"
          style={{ fontWeight: 300 }}
        >
          Luxury nail artistry and spa treatments—
          <br className="hidden sm:block" />
          crafted for those who notice the difference.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="tel:+19739431404"
            className="group relative px-8 py-4 bg-gold hover:bg-gold-bright text-bg-base font-medium text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-gold-glow"
            style={{ borderRadius: "2px", minWidth: "220px" }}
          >
            <span className="relative z-10">Book Your Visit</span>
            <span className="absolute inset-0 bg-gold-bright scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </a>

          <button
            onClick={() => {
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-3 px-8 py-4 border border-[rgba(201,169,110,0.3)] text-text-secondary hover:text-gold-text hover:border-[rgba(201,169,110,0.6)] text-sm tracking-widest uppercase transition-all duration-500"
            style={{ borderRadius: "2px", minWidth: "220px" }}
          >
            <span>View Services</span>
            <span className="text-gold-dim group-hover:text-gold transition-colors">↓</span>
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-2"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#C9A96E">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-text-tertiary text-xs tracking-wide">
            4.2 · 168 reviews on Google
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="overline text-text-tertiary" style={{ fontSize: "0.55rem" }}>
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-gold to-transparent opacity-50 animate-pulse" />
      </motion.div>
    </section>
  );
}
