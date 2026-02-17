# Architectural Patterns

Patterns observed across multiple files in this codebase.

---

## 1. Direct Data Import (No Prop Drilling)

Section components import their data directly from `lib/data.ts` rather than receiving it via props. Sections are self-contained — the parent `page.tsx` composes them with zero props.

**Where it appears:**
- `components/sections/Hero.tsx:3` — `import { HERO } from "@/lib/data"`
- `components/sections/About.tsx:4` — `import { BENTO } from "@/lib/data"`
- `components/sections/Experience.tsx:3` — `import { EXPERIENCES } from "@/lib/data"`
- `components/sections/Projects.tsx:3` — `import { PROJECTS } from "@/lib/data"`
- `components/sections/Skills.tsx:3` — `import { SKILLS } from "@/lib/data"`
- `components/sections/Contact.tsx:3` — `import { SOCIALS, SITE } from "@/lib/data"`
- `components/shared/Navbar.tsx:4` — `import { NAV_ITEMS } from "@/lib/data"`

**Convention:** Never pass content data as props through the component tree. Each section owns its data import.

---

## 2. Framer Motion whileInView + Centralized Variants

Every section uses the same scroll-reveal pattern: import variants from `lib/animations.ts`, apply via `initial`/`whileInView` with `viewport={{ once: true }}`.

**Standard pattern:**
```
initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
```

**Where it appears:**
- `components/ui/SectionHeading.tsx:21` — uses `fadeInUp`
- `components/sections/About.tsx:128` — uses `staggerContainer` + `staggerItem`
- `components/sections/Experience.tsx:38-42` — per-card with staggered delay
- `components/sections/Projects.tsx:30-33` — per-card with `fadeInUp`-style inline
- `components/sections/Skills.tsx:14-17` — per orbit group uses `fadeInUp`
- `components/sections/Contact.tsx:33-36` — heading + form + social links

**Convention:** Always set `once: true` (animate only on first view). Use margin `"-50px"` to trigger slightly before element enters viewport.

---

## 3. useScroll + useTransform for Scroll-Linked Animation

Scroll-progress animations bind a Framer Motion `scrollYProgress` value to visual properties via `useTransform`.

**Where it appears:**
- `components/sections/Experience.tsx:25-28` — timeline fill height mapped from scroll progress
- `components/sections/Projects.tsx:18-22` — per-card parallax: image Y offset from scroll progress

**Convention:** Always provide `target` ref and `offset` tuple. Use `["start end", "end start"]` for viewport-relative tracking, `["start 80%", "end 20%"]` for section-scoped tracking.

---

## 4. useMotionValue + useSpring for Physics-Based Effects

Spring-damped motion values create smooth, physics-based interactions without React re-renders.

**Where it appears:**
- `components/ui/MagneticButton.tsx:18-22` — cursor attraction with spring snap-back
- `components/shared/CustomCursor.tsx:10-13` — trailing spotlight with spring lag
- `components/sections/About.tsx:78-80` — counter animation: spring-driven count-up

**Convention:** Raw `useMotionValue` for input tracking, `useSpring` wrapping it for output smoothing. Spring configs: high stiffness (150-300) + moderate damping (15-30) for responsive feel.

---

## 5. GlowingBorder Spotlight Effect

Cards use a radial-gradient border that follows the cursor position. The outer wrapper is 1px padding with dynamic gradient background; inner div has the solid background color.

**Where it appears:**
- `components/ui/GlowingBorder.tsx` — the reusable component
- `components/sections/About.tsx` — all 4 bento tiles wrapped in `<GlowingBorder>`
- `components/sections/Experience.tsx:53` — each timeline card

**Convention:** Wrap content in `<GlowingBorder>`. Use `innerClassName` prop for padding on the inner container. The effect uses `onMouseMove` + `useState` (not Framer Motion) since it needs pixel-precise gradient positioning.

---

## 6. Glassmorphism via `.glass` CSS Class

A single CSS class in `globals.css:44-49` provides the glassmorphism stack: semi-transparent background + backdrop blur + thin white border.

**Where it appears:**
- `components/shared/Navbar.tsx:57,82` — both desktop and mobile navbars
- `components/ui/Button.tsx:12` — secondary variant
- Applied transitionally in Navbar based on scroll state

**Convention:** Use the `.glass` class directly via `className` or conditionally via `cn()`. Don't inline the backdrop-filter properties — always use the class for consistency.

---

## 7. Variant-Based Component API

UI primitives use discriminated string unions for variants with a lookup object pattern.

**Where it appears:**
- `components/ui/Button.tsx:10-16` — `variant: "primary" | "secondary" | "ghost"` + `size: "sm" | "md" | "lg"` with `variants` and `sizes` lookup objects
- `components/ui/Card.tsx:8-10` — `glass` and `hoverable` boolean props
- `components/ui/Input.tsx:9` — `glow` boolean prop

**Convention:** Define a `const variants` / `const sizes` record mapping variant names to Tailwind class strings. Apply via `cn(baseClasses, variants[variant], sizes[size], className)`.

---

## 8. CSS Custom Properties for Cross-Component State

The custom cursor writes mouse position to CSS variables on `document.documentElement`, which the grid mask layer reads via `var()` — avoiding React re-renders entirely.

**Where it appears:**
- `components/shared/CustomCursor.tsx:26-31` — writes `--cursor-x`, `--cursor-y`
- `components/shared/CustomCursor.tsx:40-43` — grid layer reads via `mask-image: radial-gradient(... var(--cursor-x) var(--cursor-y) ...)`
- `app/globals.css:8-9` — initial values declared

**Convention:** For high-frequency DOM updates (mouse tracking, scroll position), write to CSS custom properties directly rather than React state. Reserve React state for discrete UI changes (active tab, focus state).

---

## 9. Stagger Container + Item Pattern

Parent containers use `staggerContainer` variant; direct children use `staggerItem` variant. The parent orchestrates timing (staggerChildren: 0.08s, delayChildren: 0.1s).

**Where it appears:**
- `components/sections/About.tsx:128-150` — bento grid tiles stagger in
- `components/sections/Contact.tsx:47-67` — form fields stagger in
- `components/sections/Contact.tsx:71-99` — social links stagger in

**Convention:** Always pair `staggerContainer` on the parent `motion.div` with `staggerItem` on each child `motion.div`. Both variants are defined in `lib/animations.ts:8-17`.

---

## 10. Touch Device Graceful Degradation

Cursor effects detect touch and bail out: `CustomCursor.tsx:15-18` checks `matchMedia("(pointer: coarse)")` and returns `null`; `globals.css:32-35` hides the default cursor only on `@media (pointer: fine)`. Never break mobile — degrade gracefully.

---

## 11. Orbit Animation with Counter-Rotation

Skill icons orbit a center (`Skills.tsx:31-36`): outer container `animate={{ rotate: 360 }}`; each icon counter-rotates (`Skills.tsx:49`) with matching `duration` + `ease: "linear"`. Position via `cos(angle) * radius` / `sin(angle) * radius`.
