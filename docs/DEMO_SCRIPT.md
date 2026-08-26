# Hackathon Demo Script (2–3 minutes)

Optimized walkthrough for a live judged demo. All steps work with zero backend configuration.

## Flow

1. **Home (`/`)** — Open on the cinematic hero. Call out the "AR Ready / 3D Available / 360° Tour" floating badges and the gold-on-ivory visual identity.
2. **Scroll to Featured Heritage** — point out the AR/3D/VR badges on each card.
3. **Click "Modhera Sun Temple"** → lands on `/explore/modhera-sun-temple`.
4. **Read the historical info** — Historical Significance, Cultural Significance, Architecture, Interesting Facts.
5. **Open the "3D View" tab** — rotate the model, click a hotspot marker (e.g. "Surya Kund Stepwell") to show the info panel updating live.
6. **Click "AR Experience" tab** → **View in AR** — show the graceful QR-code fallback flow and narrate: "In production this opens a live WebXR camera view."
7. **Open "Then vs Now" tab** — drag the Before/After slider to compare the historical reconstruction with the present-day photo. Call this out as a signature feature.
8. **Open "VR Tour" tab** → **Enter Virtual Tour** — click between hotspots (Temple Entrance, Main Shrine, Sculpture Gallery, Ancient Stepwell).
9. **Go to `/ai-guide`** — select Modhera Sun Temple, click a suggested question ("Tell me the history in 60 seconds") and show the grounded answer streaming in.
10. **Close on `/` or `/contact`** with the line:

> "We don't just preserve history. We make people experience it."

## Talking points if asked technical questions

- **"Is this connected to a real database?"** — Yes, Supabase PostgreSQL with 7 tables and RLS policies (`supabase/schema.sql`); the app also runs fully on bundled sample data with zero config, which is what's demoed here.
- **"Is the AI Guide really an LLM?"** — Yes, it calls the Anthropic API server-side (`src/app/api/ai-guide/route.ts`), grounded in each site's verified historical record so it doesn't hallucinate facts.
- **"What about the AR/VR — is that real?"** — The interaction flow (camera permission → QR fallback → placement) is real and built; the 3D/AR asset pipeline (`.glb` models, 360° panoramas) is the next integration step once real assets are produced — see the `PRODUCTION NOTE` comments in each viewer component for exactly how.
- **"Can it scale beyond 6 monuments?"** — Yes — the schema and every query are written for N sites; adding a new one is one `INSERT` (see `docs/SETUP_GUIDE.md` §6).

## Suggested screen order for slides/video

Home hero → Featured cards → Detail page overview → 3D tab → AR tab → Reconstruction slider → VR tab → AI Guide → closing line.
