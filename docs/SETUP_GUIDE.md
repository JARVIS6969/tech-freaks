# Setup Guide

## 1. Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+ (or pnpm/yarn if you prefer — adjust commands accordingly)
- A free [Supabase](https://supabase.com) account (optional — only needed for persistence)
- An [Anthropic API key](https://console.anthropic.com) (optional — only needed for live AI Guide answers)

## 2. Install

```bash
cd tech-freaks          # your repo root
npm install
```

## 3. Run without any backend (fastest path — good for a first look)

```bash
npm run dev
```

Visit `http://localhost:3000`. Every page reads from the bundled sample dataset in `src/lib/data/heritageSites.ts`, so the whole app — Home, Explore, all 6 heritage detail pages, AR/3D/VR/Drone tabs, Heritage Map, Report, Contact — works immediately.

The AI Guide will respond with a helpful fallback message until `ANTHROPIC_API_KEY` is set (see step 5).

## 4. Connect Supabase (for real persistence)

1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose to the browser)
3. Go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it.
4. Run `supabase/seed.sql` the same way to load the 6 demo heritage sites into real tables.
5. Copy `.env.example` to `.env.local` and paste in the three values above.
6. Restart `npm run dev`. The data-access layer (`src/lib/supabase/queries.ts`) automatically switches from the bundled sample data to live Supabase queries — no component changes needed.

## 5. Connect the AI Heritage Guide

1. Get an API key from [console.anthropic.com](https://console.anthropic.com).
2. Add it to `.env.local` as `ANTHROPIC_API_KEY=sk-ant-...`.
3. Restart the dev server. `/ai-guide` and the floating widget will now return live, grounded answers via `src/app/api/ai-guide/route.ts`.

**Never commit `.env.local`** — it's already in `.gitignore`.

## 6. Adding a new heritage site

**Without Supabase:** add an entry to the `heritageSites` array in `src/lib/data/heritageSites.ts` following the existing shape.

**With Supabase:** insert a row into `heritage_sites` (see `docs/DATABASE_SCHEMA.md` for the full column list) — either via the Supabase Table Editor UI or a SQL `insert` statement modeled on `supabase/seed.sql`.

## 7. Build for production

```bash
npm run build
npm run start
```

## 8. Deploying

The app is a standard Next.js 14 App Router project — it deploys as-is to Vercel, Netlify, or any Node-compatible host. Set the same environment variables from `.env.local` in your hosting provider's dashboard.

## 9. Wiring real 3D / AR / VR assets

Every experience component currently ships a clearly labeled, functional placeholder so the UX flow can be demoed without real assets. Search the codebase for `PRODUCTION NOTE` comments — each one shows exactly what to swap in:

- `src/components/heritage/Model3DViewer.tsx` → React Three Fiber `<Canvas>` + `useGLTF`
- `src/components/heritage/ARExperience.tsx` → WebXR Device API or `<model-viewer ar>`
- `src/components/heritage/VRTour.tsx` → A-Frame `<a-scene><a-sky>`
- `src/components/heritage/HeritageMap.tsx` → Mapbox GL JS / Leaflet with real projection
