# Architecture

## Folder structure

```
tech-freaks/
├── docs/                          # ← you are here
│   ├── SETUP_GUIDE.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── DEMO_SCRIPT.md
├── supabase/
│   ├── schema.sql                 # all tables + RLS policies + storage buckets
│   └── seed.sql                   # 6 demo heritage sites, mirrors src/lib/data
├── public/
│   └── images/                    # static assets (logos, favicons, OG image)
├── src/
│   ├── app/                       # Next.js App Router — one folder per route
│   │   ├── layout.tsx             # root layout: fonts, Navbar, Footer, AI widget
│   │   ├── globals.css            # Tailwind base + heritage pattern + gold utilities
│   │   ├── page.tsx               # Home
│   │   ├── explore/
│   │   │   ├── page.tsx           # Explore hub (search/filter + AR/3D/VR/Drone/Map)
│   │   │   └── [slug]/page.tsx    # Heritage detail page (dynamic route)
│   │   ├── ai-guide/page.tsx      # AI Heritage Guide chat page
│   │   ├── report/page.tsx        # Reports & impact + feedback form
│   │   ├── contact/page.tsx       # About + Contact
│   │   └── api/
│   │       └── ai-guide/route.ts  # POST handler — calls Anthropic API
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── home/                  # Hero, FeaturedHeritage, Timeline
│   │   ├── heritage/               # HeritageCard, ExploreGrid, Model3DViewer,
│   │   │                            ARExperience, VRTour, DroneView, HeritageMap,
│   │   │                            BeforeAfterSlider, HeritageDetailTabs
│   │   ├── ai/                    # AIGuideWidget (floating button), AIChatPage
│   │   ├── report/                # ReportForm
│   │   └── ui/                    # GoldButton, Badge, SectionHeading
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # browser client (anon key)
│   │   │   ├── server.ts          # server-only client (service role key)
│   │   │   └── queries.ts         # data-access layer — Supabase w/ sample-data fallback
│   │   ├── data/
│   │   │   ├── heritageSites.ts   # bundled sample dataset (6 sites)
│   │   │   └── heritageObjects.ts # sample 3D hotspot sub-elements
│   │   └── utils.ts               # cn() className helper
│   └── types/
│       ├── heritage.ts            # HeritageSite, HeritageObject, enums
│       └── user.ts                # AppUser, Favorite, UserStats
├── .env.example
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Data flow

```
Component (Server Component, e.g. app/page.tsx)
        │
        ▼
lib/supabase/queries.ts   ── is Supabase configured? ──┐
        │ yes                                          │ no
        ▼                                               ▼
Supabase Postgres (heritage_sites, ...)      lib/data/heritageSites.ts
        │                                               │
        └───────────────────► same HeritageSite[] shape ◄┘
                              │
                              ▼
                   Rendered by the same components either way
```

This means **every page in the app was built and can be demoed without any backend**, and upgrading to real persistence is a matter of setting three environment variables — no component code changes.

## Rendering strategy

- Pages that read heritage data (`/`, `/explore`, `/explore/[slug]`, `/ai-guide`, `/report`) are **Server Components** — data is fetched on the server via `fetchAllHeritageSites()` / `fetchHeritageSiteBySlug()`, keeping API keys off the client.
- Interactive pieces (search/filter, 3D viewer, AR/VR tabs, chat) are **Client Components** (`"use client"`), composed inside the server-rendered pages.
- The AI Guide's actual LLM call happens in a **Route Handler** (`src/app/api/ai-guide/route.ts`), which is the only place `ANTHROPIC_API_KEY` is read — it never reaches the browser.

## Component reuse map

| Component | Used on |
|---|---|
| `HeritageCard` | Home (Featured), Explore (grid) |
| `Model3DViewer` | Explore (`#3d`), Heritage Detail (3D tab) |
| `ARExperience` | Explore (`#ar`), Heritage Detail (AR tab) |
| `VRTour` | Explore (`#vr`), Heritage Detail (VR tab) |
| `DroneView` | Explore, Heritage Detail (Drone tab) |
| `BeforeAfterSlider` | Home (reconstruction preview), Heritage Detail (Then vs Now tab) |
| `AIGuideWidget` | Every page (in root layout) |

## Why sample-data fallback instead of hard Supabase dependency

Hackathon demos fail most often on last-minute environment/config issues. By making every read path fall back gracefully (`lib/supabase/queries.ts`), the judges see a fully working product even if Wi-Fi or Supabase is flaky on demo day — while the codebase is 100% ready to become a real, persisted multi-user app.
