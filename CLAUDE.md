# Portfolio — Patrick Iyiakimo

Single-page developer portfolio with a "Clean Cyberpunk / Glassmorphism" aesthetic supporting dark and light themes. All content is centralized in `lib/data.ts` — edit only that file to change portfolio content.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config in `globals.css`, no `tailwind.config.ts`)
- **Animations**: Framer Motion v12 — all interactive effects, scroll tracking, spring physics
- **Smooth Scroll**: Lenis (`lenis/react` — ReactLenis wrapper)
- **Icons**: Lucide React + custom SVG tech icons in `components/ui/TechIcon.tsx`
- **Fonts**: Geist Sans & Geist Mono via `next/font/google`
- **Theming**: `next-themes` — dark/light mode with CSS custom properties + `data-theme` attribute
- **Testing**: Vitest + React Testing Library + vitest-axe
- **Utilities**: `clsx` + `tailwind-merge` composed as `cn()` in `lib/utils.ts`

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build — also runs TypeScript check
npm run start    # Serve production build
npm run lint     # ESLint
npm run test     # Vitest (watch mode)
npm run test:run # Vitest (single run)
```

## Project Structure

```
app/
  layout.tsx          Root layout (server) — wraps with SmoothScroll + CustomCursor
  page.tsx            Home (server) — composes section components
  globals.css         Tailwind directives, CSS vars, .glass, @keyframes, scrollbar
components/
  ui/                 Reusable primitives — Button, Card, Input, MagneticButton,
                      GlowingBorder, SectionHeading, TechIcon
  sections/           Full-page sections — Hero, About, Experience, Projects,
                      Skills, Contact
  shared/             App-level — Navbar, CustomCursor, SmoothScroll,
                      ThemeProvider, ThemeToggle
lib/
  data.ts             ALL portfolio content (typed interfaces + constants)
  animations.ts       Reusable Framer Motion variants
  utils.ts            cn() helper
```

## Key Files

| File | Purpose |
|------|---------|
| `lib/data.ts` | Single source of truth for all content — edit this to change portfolio data |
| `lib/animations.ts` | Centralized Framer Motion variants reused across all sections |
| `app/globals.css` | Semantic design tokens (dark/light), `.glass` utility, CSS animations, project gradients |
| `components/shared/ThemeProvider.tsx` | `next-themes` wrapper — `data-theme` attribute, dark default, system pref |
| `components/shared/ThemeToggle.tsx` | Sun/moon toggle — only component that uses `useTheme()` |
| `components/ui/TechIcon.tsx` | SVG icon registry — add new tech icons here |
| `components/shared/CustomCursor.tsx` | Cursor spotlight + grid reveal via CSS `mask-image` |

## Client/Server Boundary

- **Server components**: `app/layout.tsx`, `app/page.tsx` — static composition only
- **Client components**: Every file in `components/` uses `"use client"` except `Button.tsx`, `Card.tsx`, and `TechIcon.tsx` which are pure render components imported into client parents

## Content Management

All portfolio content lives in `lib/data.ts` as typed exports:

| Export | Type | Used by |
|--------|------|---------|
| `NAV_ITEMS` | `NavItem[]` | Navbar |
| `HERO` | `HeroData` | Hero section |
| `BENTO` | `BentoData` | About/Bento grid |
| `EXPERIENCES` | `ExperienceItem[]` | Experience timeline |
| `PROJECTS` | `Project[]` | Projects section |
| `SKILLS` | `SkillCategory[]` | Skills orbits |
| `SOCIALS` | `SocialLink[]` | Contact section |
| `SITE` | `{ name, title, description, url }` | Layout metadata + footer |

## Color System / Theming

Colors use semantic CSS custom properties defined in `globals.css`. Dark is the default; light overrides via `[data-theme="light"]`.

| Token | Purpose |
|-------|---------|
| `--background`, `--foreground` | Page bg and default text |
| `--text-primary/secondary/tertiary/muted/faint` | Text hierarchy (5 levels) |
| `--accent`, `--accent-text` | Decorative vs. readable accent (emerald) |
| `--surface`, `--surface-hover` | Card/element backgrounds |
| `--border`, `--border-hover`, `--border-subtle` | Border hierarchy |
| `--glass-bg`, `--glass-border`, `--glass-shadow` | Glassmorphism effect |
| `--glow-sm/md/lg/border` | Emerald glow at different intensities |
| `--beam-1/2/3`, `--beam-opacity` | Hero background beams |

All tokens are wired into Tailwind v4 via `@theme inline` — use classes like `text-text-primary`, `bg-surface`, `border-border`.

**Key principle**: CSS-first theming. Only `ThemeToggle` uses `useTheme()`. All other components are theme-agnostic via CSS variables.

## Adding a New Section

1. Create `components/sections/NewSection.tsx` with `"use client"`
2. Add typed data to `lib/data.ts`
3. Use `SectionHeading` for the title, `GlowingBorder` for cards
4. Apply `fadeInUp` or `staggerContainer` variants from `lib/animations.ts`
5. Add `<NewSection />` to `app/page.tsx`
6. Add nav entry to `NAV_ITEMS` in `lib/data.ts`

## Adding a New Tech Icon

Add an entry to the `icons` record in `components/ui/TechIcon.tsx:8` — each icon is a function returning an SVG element with a `className` prop.

## Additional Documentation

When working in specific areas, check these docs:

- **[Architectural Patterns](.claude/docs/architectural_patterns.md)** — Component composition, animation strategy, state management, styling conventions, and performance patterns used across the codebase
