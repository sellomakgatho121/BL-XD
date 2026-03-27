# Project: BL-XD (Blacklight Web Designs)

**Generated**: 2026-03-28

## Overview

Private web application for "Blacklight Web Designs" - a South African web design agency. Built with Next.js 15 + React 19 featuring high-end 3D visuals, AI-powered content tools, and comprehensive admin dashboard.

## Technology Stack

- **Framework**: Next.js 16.1.6 (App Router), React 19.2.3
- **Styling**: Tailwind CSS v4, Shadcn UI
- **3D**: Three.js, React Three Fiber, Drei, Postprocessing, Rapier
- **Animation**: Framer Motion, GSAP, Lenis
- **Backend**: Supabase (SSR, auth, storage)
- **AI**: Google Gemini, OpenAI
- **Forms**: React Hook Form, Zod

## Key Features

1. **Marketing Site** - Portfolio, services, blog, contact
2. **Admin Dashboard** - Team, projects, leads, invoices
3. **Content Studio** - AI-powered blog/social/SEO generation
4. **3D Visual Effects** - Custom WebGL scenes and animations

## Architecture

- Route groups: (admin), (auth), (marketing), (portal)
- Server Components by default
- Client Components for interactivity
- API routes for backend logic
- Supabase for auth and database

## Current State

- **Phase**: 0 (Planning)
- **Risk Mitigation**: Completed - fixed type suppressions, removed console.log
- **Codebase Map**: Complete - 7 documents in .planning/codebase/

## Goals

1. Complete admin dashboard features
2. Improve AI content tools
3. Add comprehensive tests
4. Production deployment optimization
