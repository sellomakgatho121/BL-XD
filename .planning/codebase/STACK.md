# Technology Stack

## Core Framework
- **Next.js** 16.1.6 (App Router)
- **React** 19.2.3
- **TypeScript** 5.9.3

## Styling
- **Tailwind CSS** v4 (via @tailwindcss/postcss)
- **Shadcn UI** v3.8.4 - Copy-on-write component primitives
- **Tailwind Merge** - Class utility merging

## 3D & Graphics
- **Three.js** 0.183.2
- **React Three Fiber** 9.5.0
- **@react-three/drei** 10.7.7 - R3F helpers
- **@react-three/postprocessing** 3.0.4 - Post-FX
- **@react-three/rapier** 2.2.0 - Physics
- **three-custom-shader-material** 6.4.0
- **three-stdlib** 2.36.1
- **Spline** @splinetool/react-spline 4.1.0, runtime 1.12.69

## Animation
- **Framer Motion** 12.31.1
- **GSAP** 3.14.2 + @gsap/react 2.1.2
- **Lenis** 1.3.18-dev.1 - Smooth scroll

## Backend & Database
- **Supabase** SSR, auth, storage
  - @supabase/ssr 0.8.0
  - @supabase/supabase-js 2.95.3

## AI & ML
- **Google Gemini** @google/generative-ai 0.24.1
- **OpenAI** openai 4.104.0

## Forms & Validation
- **React Hook Form** 7.71.1
- **@hookform/resolvers** 5.2.2
- **Zod** 4.3.6

## UI Components
- **Radix UI** 1.4.3 - Headless primitives
- **Lucide React** 0.563.0 - Icons

## Email
- **Resend** 6.9.1
- **EmailJS** @emailjs/browser 4.4.1, @emailjs/nodejs 5.0.2

## Development
- **ESLint** 9
- **ESLint Config Next** 16.1.6
- **r3f-perf** 7.2.3 - R3F performance profiling
- **tw-animate-css** 1.4.0

---

## Package Summary

| Category | Dependencies |
|----------|---------------|
| Core | next, react, typescript |
| Styling | tailwindcss, shadcn, class-variance-authority, clsx, tailwind-merge |
| 3D | three, r3f, drei, postprocessing, rapier |
| Animation | framer-motion, gsap, lenis |
| Backend | supabase |
| AI | google-generative-ai, openai |
| Forms | react-hook-form, zod |
| Email | resend, emailjs |
