# HeritageLens

**Immersive Cultural Heritage Platform** — discover Indian monuments through AR, VR, 3D exploration, drone views, historical reconstruction, and an AI-powered Heritage Guide.

> "Technology can help us experience the past."

Full documentation lives in [`/docs`](./docs):

| Doc | What it covers |
|---|---|
| [`docs/SETUP_GUIDE.md`](./docs/SETUP_GUIDE.md) | Installing, running locally, connecting Supabase & the AI Guide |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Folder structure, page/component map, data flow |
| [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md) | All 7 Supabase tables, relationships, storage buckets |
| [`docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md) | The `/api/ai-guide` route, request/response shape |
| [`docs/DEMO_SCRIPT.md`](./docs/DEMO_SCRIPT.md) | Recommended 2–3 minute hackathon walkthrough |

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Anthropic keys (optional for demo)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs fully with **zero configuration** — every page falls back to a bundled sample dataset (6 real Indian heritage sites) if Supabase/Anthropic keys aren't set, so it's demo-ready out of the box.

## Navigation

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Cinematic hero, featured sites, reconstruction slider, timeline |
| Explore | `/explore` | Search/filter all sites + 3D, AR, VR, Drone, Map sections |
| Heritage Detail | `/explore/[slug]` | Full site history + tabbed 3D/AR/VR/Drone/Reconstruction experience |
| AI Guide | `/ai-guide` | Chat with the Heritage Guide, grounded in site data |
| Report | `/report` | Coverage stats + feedback / suggest-a-site form |
| Contact / About | `/contact` | Project story + contact form |

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, Storage) · Anthropic API (Heritage Guide) · lucide-react icons · Three.js/React Three Fiber (3D viewer integration point) · A-Frame (VR integration point)

## Project status

This is a hackathon-ready scaffold: every page, component, and data flow is real and functional using a bundled sample dataset. AR/VR/3D asset integration points are clearly marked in code comments (search for `PRODUCTION NOTE`) — wire in real `.glb` models and 360° panoramas by following those comments once assets are available.
