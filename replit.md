# PSE&G Intelligent Front Door

## Overview
A redesigned PSE&G utility website concept serving as an "Intelligent Front Door" with AI-powered conversational interface, modern authentication, database persistence, and comprehensive self-service workflows.

## Architecture
- **Frontend**: React + TypeScript, Vite, TailwindCSS, shadcn/ui, wouter router, framer-motion, recharts
- **Backend**: Express.js, passport-local auth with session (connect-pg-simple), Drizzle ORM
- **Database**: PostgreSQL via DATABASE_URL

## Brand Design System
- **Heading Font**: DM Serif Display (serif) — premium editorial feel
- **Body Font**: Outfit (sans-serif) — clean geometric
- **Primary Color**: Navy #142C41 (--primary)
- **Accent Color**: Orange #F0512C (--brand-orange, --accent)
- **Steel Gray**: #485263 (--steel) — secondary text/muted elements
- **Background**: Warm gray ~HSL(40, 6%, 88%) — darker, more premium feel
- **Cards**: Slightly off-white HSL(40, 8%, 95%) (--card)
- **Border Radius**: 0rem — sharp/squared corners throughout
- **Header**: Dark navy bg-primary/95 with white text nav links
- **Footer**: Full navy bg-primary with white text

## Key Pages
- **Home** (`/`): Hero with intelligent search, action tiles, promotional sections
- **Auth** (`/login`): Login/register with social options, MFA, magic link (login currently bypassed for demo)
- **Dashboard** (`/dashboard`): Tabbed (Overview, Usage & Smart Meter, Billing & Payments, My Programs)
  - Usage tab shows both Electric (smart meter, kWh) and Gas (monthly read, therms) usage
  - Billing tab has Equal Payment Plan, AutoPay, Deferred Payment, transaction history
- **Payment Arrangement** (`/payment-arrangement`): Installments or date extension
- **Support Center** (`/support-center`): Tabbed hub with Submit Request (contact form persisted to DB), Department Contacts (5 categories: Outages, Billing, WorryFree, Business, Company Info), and FAQ (11 categories, 89 real Q&A pairs from PSE&G)
- Plus: pay-bill, report-outage, start-stop-service, bill-assistance, safety, savings, business, onboarding

## Auth Notes
- Login is BYPASSED for demo — `onLogin` redirects to `/dashboard` with no API call
- Backend auth is fully built (passport-local, scrypt, sessions) but frontend skips it
- Schema uses `serial` integer IDs (not UUID), email field for auth
- Dashboard shows user.firstName with "Alex" as fallback

## Design System (Applied Sitewide)
- **Page Hero Banners**: Navy bg-primary with orange accent badge, white heading, white/70 subtitle, decorative orange blur orb
- **Orange Accent Badges**: `bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))]` with relevant icon
- **CTA Buttons**: Primary actions use `bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white`
- **Card Hover Effects**: `border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`
- **Icon Containers**: `bg-[hsl(var(--brand-orange))]/10 group-hover:bg-[hsl(var(--brand-orange))]` with matching icon color transitions
- **Footer Links**: `hover:text-[hsl(var(--brand-orange))]` on all footer nav links, functional links to /support-center and /report-outage
- **Arrow Links**: `inline-flex items-center gap-1.5 hover:gap-2.5 transition-all` for animated arrow links

## Important Conventions
- All Lucide imports must match JSX usage exactly
- Cards use `bg-card backdrop-blur-md border-border/50` pattern
- Zero border radius enforced: `rounded-none` everywhere
- `data-testid` attributes on all interactive/meaningful elements
- Use `hsl(var(--brand-orange))` token, not raw hex, for brand orange throughout
