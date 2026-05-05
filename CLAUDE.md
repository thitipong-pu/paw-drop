# Paw Drop — CLAUDE.md

## Project Overview
**Paw Drop** is a modern web application for managing pet-related activities (drops, appointments, daily tasks). This file provides context for AI assistants (Claude, Gemini, etc.) working on this codebase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | **React 19** |
| Build Tool | **Vite 6** |
| Language | **TypeScript** |
| CSS | **Tailwind CSS v4** |
| Component Library | **HeroUI React v3** (`@heroui/react`) |
| Animation | **Framer Motion** |

---

## Key HeroUI v3 Differences (vs v2)

> [!IMPORTANT]
> HeroUI v3 is a major breaking change from v2. Follow these rules strictly:

1. **No Provider required** — Do NOT wrap the app in `<HeroUIProvider>`. It's not needed in v3.
2. **Requires React 19+** — Ensure hooks and APIs are compatible with React 19.
3. **Requires Tailwind CSS v4** — Config is in `src/index.css`, not `tailwind.config.js`.
4. **Style import** — `@heroui/styles` must be imported in CSS **after** Tailwind.

---

## CSS Setup

Tailwind v4 uses CSS-first configuration. All setup is in `src/index.css`:

```css
@import "tailwindcss";
@import "@heroui/styles";

@theme {
  /* Custom design tokens here */
}
```

Do **not** create a `tailwind.config.js` file — it is not used in v4.

---

## Commands

```bash
npm install       # Install all dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
```

---

## Project Structure

```
paw-drop/
├── src/
│   ├── main.tsx        # Entry point
│   ├── App.tsx         # Root component
│   ├── index.css       # Global styles (Tailwind v4 + HeroUI)
│   └── components/     # Reusable components
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── CLAUDE.md           # This file
└── README.md
```

---

## Design Guidelines

- **Dark mode first** — Background is `zinc-950` (`#09090b`)
- **Primary accent** — Pink-to-violet gradient (`from-pink-500 to-violet-500`)
- **Typography** — `font-extrabold`, `tracking-tight` for headings
- **No plain colors** — Use curated HSL/gradient palettes, not raw red/blue/green
- **Micro-animations** — Use Framer Motion or Tailwind transitions for hover/interaction states
- **Premium feel** — Glassmorphism, shadows, gradients, and smooth transitions

---

## Component Conventions

- Functional components only (no class components)
- Use React hooks for state management
- Co-locate component styles with the component (Tailwind classes)
- Import HeroUI components directly from `@heroui/react`

```tsx
// ✅ Correct
import { Button, Card, CardBody } from "@heroui/react";

// ❌ Incorrect — no deep imports needed
import { Button } from "@heroui/react/button";
```
