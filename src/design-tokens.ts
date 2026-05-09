/**
 * NAILS FEVER & SPA — Design Token System
 * 60 Main St, City of Orange NJ 07050
 *
 * Design Language: Dark Luxury Editorial
 * Mood: Intimate, cinematic, aspirational — the spa experience starts the moment
 *       the page loads. Every pixel earns its place.
 *
 * Inspiration: Art Deco geometry × editorial fashion photography × warm candlelight
 */

// ─────────────────────────────────────────────────────────────
// COLOR SYSTEM
// ─────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds — layered darkness, never flat black
  bg: {
    base:    '#0A0706',   // near-black with warmth — the room at night
    surface: '#120E0C',   // slightly lifted for cards/panels
    elevated:'#1C1512',   // modals, floating elements
    warm:    '#1F1610',   // hover states, subtle highlights
  },

  // Accent — champagne gold, NOT brassy yellow
  gold: {
    dim:     '#7A6040',   // muted, for decorative rules and dividers
    base:    '#C9A96E',   // primary accent: CTAs, highlights, icons
    bright:  '#E2C48A',   // hover states, active labels
    sheen:   '#F0D9A8',   // shimmer layer on hero, max 10% opacity usage
    text:    '#D4AF7A',   // gold on dark backgrounds — legible
  },

  // Warm neutrals — the palette between black and gold
  neutral: {
    900: '#0A0706',
    800: '#1C1512',
    700: '#2E2420',
    600: '#3F342E',
    500: '#5A4A42',
    400: '#7D6B62',
    300: '#A89288',
    200: '#CDBAB3',
    100: '#EDE0DA',
    50:  '#F7F0EC',
  },

  // Deep burgundy — the emotional anchor, used sparingly
  burgundy: {
    deep:   '#2D0A12',    // ultra-dark, background tints
    base:   '#6B1A2A',    // rich mid-tone
    bright: '#8C2236',    // hover accents
    muted:  '#4A1520',    // subtle backgrounds for service cards
  },

  // Text hierarchy
  text: {
    primary:   '#F0E8E2',   // warm off-white — never pure white
    secondary: '#A89288',   // muted, captions, metadata
    tertiary:  '#5A4A42',   // placeholder, disabled states
    accent:    '#D4AF7A',   // gold text for CTAs and callouts
    inverse:   '#0A0706',   // dark text on light surfaces
  },

  // UI utilities
  border: {
    subtle:  'rgba(201, 169, 110, 0.12)',  // barely-there lines
    default: 'rgba(201, 169, 110, 0.25)',  // standard separators
    strong:  'rgba(201, 169, 110, 0.50)',  // active/focus states
  },

  // Overlay systems
  overlay: {
    dark:     'rgba(10, 7, 6, 0.70)',
    darker:   'rgba(10, 7, 6, 0.88)',
    gold:     'rgba(201, 169, 110, 0.08)',
    burgundy: 'rgba(107, 26, 42, 0.15)',
  },
} as const

// ─────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────────────────────

export const typography = {
  // Font families
  font: {
    display: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
    // → Load via: @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap')

    body: '"DM Sans", "Inter", system-ui, sans-serif',
    // → Load via: @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap')

    mono: '"DM Mono", "Fira Code", monospace',
  },

  // Display sizes — for editorial section titles
  display: {
    '2xl': 'clamp(3.5rem, 8vw, 7rem)',     // Hero headline
    'xl':  'clamp(2.75rem, 5vw, 5rem)',     // Section heroes
    'lg':  'clamp(2rem, 4vw, 3.5rem)',      // Sub-section titles
    'md':  'clamp(1.5rem, 3vw, 2.5rem)',    // Card/callout titles
    'sm':  'clamp(1.125rem, 2vw, 1.5rem)',  // Overlines, intro text
  },

  // Body sizes
  body: {
    'xl':  '1.25rem',   // 20px — lead paragraphs
    'lg':  '1.125rem',  // 18px — standard body
    'md':  '1rem',      // 16px — default
    'sm':  '0.875rem',  // 14px — captions, labels
    'xs':  '0.75rem',   // 12px — metadata, legal
  },

  // Weights
  weight: {
    thin:    300,
    regular: 400,
    medium:  500,
    semibold:600,
    bold:    700,
  },

  // Line heights
  leading: {
    tight:  1.1,   // headlines
    snug:   1.25,  // subheadings
    normal: 1.5,   // body text
    loose:  1.75,  // small text, captions
  },

  // Letter spacing
  tracking: {
    tight:  '-0.03em',  // large display type
    normal: '0em',
    wide:   '0.08em',   // uppercase labels, overlines
    widest: '0.2em',    // decorative ALL-CAPS
  },
} as const

// ─────────────────────────────────────────────────────────────
// SPACING SYSTEM (8px base grid)
// ─────────────────────────────────────────────────────────────

export const spacing = {
  1:  '0.25rem',   // 4px
  2:  '0.5rem',    // 8px
  3:  '0.75rem',   // 12px
  4:  '1rem',      // 16px
  5:  '1.25rem',   // 20px
  6:  '1.5rem',    // 24px
  8:  '2rem',      // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  section: 'clamp(4rem, 10vw, 8rem)',  // section vertical padding
} as const

// ─────────────────────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────────────────────

export const layout = {
  maxWidth: {
    content: '1280px',   // standard content max-width
    narrow:  '768px',    // article/text columns
    wide:    '1440px',   // full-bleed sections
    hero:    '1600px',   // hero/full-screen
  },
  gutter: {
    mobile:  '1.25rem',
    tablet:  '2.5rem',
    desktop: '5rem',
  },
  columns: 12,
} as const

// ─────────────────────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────────────────────

export const radius = {
  none:  '0px',
  sm:    '4px',
  md:    '8px',
  lg:    '12px',
  xl:    '20px',
  '2xl': '32px',
  full:  '9999px',
  // Specific use cases:
  card:   '2px',   // cards are nearly square-cornered (luxury, not bubbly)
  button: '2px',   // same — Art Deco flat edges
  badge:  '2px',
  pill:   '9999px',
} as const

// ─────────────────────────────────────────────────────────────
// SHADOWS — warm, golden-tinted shadows
// ─────────────────────────────────────────────────────────────

export const shadow = {
  none:   'none',
  sm:     '0 2px 8px rgba(10, 7, 6, 0.4)',
  md:     '0 4px 24px rgba(10, 7, 6, 0.6)',
  lg:     '0 8px 40px rgba(10, 7, 6, 0.8)',
  xl:     '0 16px 80px rgba(10, 7, 6, 0.9)',
  // Gold glow — use on focus, hover, active elements
  goldGlow:  '0 0 30px rgba(201, 169, 110, 0.3)',
  goldGlowSm:'0 0 12px rgba(201, 169, 110, 0.2)',
  // Inset — for pressed states, embossed look
  inset:  'inset 0 1px 0 rgba(201, 169, 110, 0.1)',
} as const

// ─────────────────────────────────────────────────────────────
// ANIMATION — slow, luxurious, cinematic
// ─────────────────────────────────────────────────────────────

export const motion = {
  // Durations — everything moves slowly here
  duration: {
    instant: 0.1,   // state flips (active, checked)
    fast:    0.3,   // micro-interactions
    normal:  0.6,   // standard transitions
    slow:    1.0,   // section entrances
    cinematic: 1.6, // hero animations, page transitions
    epic:    2.4,   // opening sequence, splash screens
  },

  // GSAP easing strings
  ease: {
    // Standard luxury ease: slow out
    luxury:       'power3.out',
    luxuryIn:     'power3.in',
    luxuryInOut:  'power3.inOut',

    // Editorial: gentle elastic at end
    editorial:    'power2.out',

    // Expo for dramatic reveals
    explosive:    'expo.out',
    explosiveIn:  'expo.in',

    // Custom bezier — silk curtain
    silk:         'M0,0 C0.25,0 0.1,1 1,1',

    // Spring — for interactive elements
    spring:       'elastic.out(1, 0.5)',

    // Stagger timing
    stagger:      0.08,  // seconds between sibling animations
    staggerSlow:  0.15,
  },

  // ScrollTrigger defaults
  scrollTrigger: {
    start:  'top 85%',        // when element enters viewport
    end:    'bottom 15%',     // when element exits
    markers: false,
    scrub:  false,
  },

  // Lenis smooth scroll config
  lenis: {
    duration:       1.4,      // scroll animation duration
    easing:         '(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))',
    orientation:    'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel:    true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite:       false,
  },

  // Framer Motion variants — ready-to-use
  variants: {
    fadeUp: {
      hidden:  { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0, 0.1, 1] } },
    },
    fadeIn: {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8 } },
    },
    slideRight: {
      hidden:  { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0, 0.1, 1] } },
    },
    scaleIn: {
      hidden:  { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0, 0.1, 1] } },
    },
    staggerContainer: {
      visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    },
  },
} as const

// ─────────────────────────────────────────────────────────────
// ART DECO DECORATIVE SYSTEM
// ─────────────────────────────────────────────────────────────

export const artDeco = {
  // SVG pattern for geometric corner ornaments
  cornerOrnament: `
    M 0 20 L 0 0 L 20 0
    M 4 16 L 4 4 L 16 4
    M 8 12 L 8 8 L 12 8
  `,
  // Diamond divider
  diamondDivider: `◆`,
  // Section rule
  rule: {
    short: '60px',
    medium: '120px',
    full: '100%',
  },
  // Grid overlay pattern (CSS)
  gridPattern: `
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 59px,
      rgba(201, 169, 110, 0.04) 59px,
      rgba(201, 169, 110, 0.04) 60px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 59px,
      rgba(201, 169, 110, 0.04) 59px,
      rgba(201, 169, 110, 0.04) 60px
    )
  `,
} as const

// ─────────────────────────────────────────────────────────────
// BRAND COPY — the voice of Nails Fever & Spa
// ─────────────────────────────────────────────────────────────

export const brand = {
  name:      'Nails Fever & Spa',
  tagline:   'Where Every Detail Tells a Story',
  taglineSub:'Luxury nail artistry in the heart of Orange, NJ',
  address:   '60 Main Street, City of Orange, NJ 07050',
  phone:     '(973) 943-1404',
  phoneHref: 'tel:+19739431404',

  hours: [
    { day: 'Monday',    hours: '9:30 AM – 6:00 PM' },
    { day: 'Tuesday',   hours: 'Closed' },
    { day: 'Wednesday', hours: '9:30 AM – 6:00 PM' },
    { day: 'Thursday',  hours: '9:30 AM – 6:00 PM' },
    { day: 'Friday',    hours: '9:00 AM – 6:00 PM' },
    { day: 'Saturday',  hours: '9:00 AM – 6:00 PM' },
    { day: 'Sunday',    hours: 'Closed' },
  ],

  ctaPrimary:   'Book Your Appointment',
  ctaSecondary: 'Call to Reserve',

  // Services with copy (pricing ranges based on NJ area market)
  services: [
    {
      category: 'Manicures',
      icon: '✦',
      items: [
        { name: 'Classic Manicure',     price: 'From $20',  duration: '30 min' },
        { name: 'Gel Manicure',         price: 'From $35',  duration: '45 min' },
        { name: 'Dip Powder',           price: 'From $45',  duration: '60 min' },
        { name: 'Acrylic Full Set',     price: 'From $55',  duration: '75 min' },
        { name: 'Nail Art',             price: 'From $10',  duration: 'Varies' },
      ],
    },
    {
      category: 'Pedicures',
      icon: '◆',
      items: [
        { name: 'Classic Pedicure',     price: 'From $30',  duration: '45 min' },
        { name: 'Spa Pedicure',         price: 'From $45',  duration: '60 min' },
        { name: 'Gel Pedicure',         price: 'From $55',  duration: '75 min' },
        { name: 'Hot Stone Pedicure',   price: 'From $65',  duration: '90 min' },
      ],
    },
    {
      category: 'Spa Treatments',
      icon: '◈',
      items: [
        { name: 'Paraffin Treatment',   price: 'From $20',  duration: '20 min' },
        { name: 'Callus Removal',       price: 'From $15',  duration: '20 min' },
        { name: 'Mani & Pedi Combo',    price: 'From $60',  duration: '90 min' },
        { name: 'Gel Extensions',       price: 'From $75',  duration: '90 min' },
      ],
    },
  ],

  // Review social proof
  social: {
    googleRating: '4.2',
    reviewCount:  '168',
    reviewText:   '168 reviews on Google',
  },
} as const

// ─────────────────────────────────────────────────────────────
// CSS CUSTOM PROPERTIES (copy to globals.css :root)
// ─────────────────────────────────────────────────────────────

export const cssVariables = `
  :root {
    /* Colors */
    --color-bg-base:        ${colors.bg.base};
    --color-bg-surface:     ${colors.bg.surface};
    --color-bg-elevated:    ${colors.bg.elevated};
    --color-gold-base:      ${colors.gold.base};
    --color-gold-bright:    ${colors.gold.bright};
    --color-gold-text:      ${colors.gold.text};
    --color-text-primary:   ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-accent:    ${colors.gold.text};
    --color-burgundy:       ${colors.burgundy.base};
    --color-border:         ${colors.border.default};
    --color-border-subtle:  ${colors.border.subtle};

    /* Typography */
    --font-display:         ${typography.font.display};
    --font-body:            ${typography.font.body};

    /* Spacing */
    --spacing-section:      ${spacing.section};

    /* Motion */
    --duration-fast:        ${motion.duration.fast}s;
    --duration-normal:      ${motion.duration.normal}s;
    --duration-slow:        ${motion.duration.slow}s;
  }
` as const

export default {
  colors,
  typography,
  spacing,
  layout,
  radius,
  shadow,
  motion,
  artDeco,
  brand,
  cssVariables,
}
