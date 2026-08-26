# Database Schema

Backend: **Supabase PostgreSQL**. Full DDL lives in [`supabase/schema.sql`](../supabase/schema.sql); demo rows in [`supabase/seed.sql`](../supabase/seed.sql).

## Entity-relationship overview

```
auth.users (Supabase Auth)
      │ 1:1
      ▼
   users ──────────────┬──────────────┬───────────────────┐
      │ 1:N             │ 1:N          │ 1:N               │
      ▼                 ▼              ▼                    │
 favorites      user_explorations   ai_questions             │
      │                 │              │                    │
      └────────┬────────┴──────┬───────┘                    │
               ▼               ▼                            │
        heritage_sites ◄───────┴──────────── feedback_reports (optional FK)
               │ 1:N
               ▼
        heritage_objects
```

## Tables

### `heritage_sites`
The core monument record. Every field the frontend needs to render a heritage detail page — history, coordinates, media URLs for each experience type.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `name`, `slug` | text | `slug` is unique, used in `/explore/[slug]` |
| `description`, `short_description` | text | Long-form + card summary |
| `state`, `city` | text | For location filters |
| `latitude`, `longitude` | float8 | For the Heritage Map |
| `historical_period` | text | `Ancient` \| `Medieval` \| `Colonial` \| `Modern` |
| `construction_date` | text | Free-form (e.g. "1026–1027 CE") |
| `heritage_type` | text | `Temple` \| `Fort` \| `Cave` \| `Stupa` \| `Palace` \| `Stepwell` |
| `cultural_significance`, `architectural_details` | text | Detail page sections |
| `historical_facts` | text[] | Rendered as a bulleted list |
| `main_image`, `gallery_images` | text / text[] | Supabase Storage URLs |
| `model_3d_url`, `ar_model_url` | text (nullable) | `.glb`/`.gltf` assets |
| `vr_tour_url` | text (nullable) | 360° panorama asset |
| `drone_view_url` | text (nullable) | Aerial image/video |
| `historical_reconstruction_url` | text (nullable) | Before/after slider "before" image |
| `audio_url` | text (nullable) | Narration for VR tour |
| `is_unesco` | boolean | Drives the UNESCO badge + map filter |

### `heritage_objects`
Sub-elements of a site (pillars, shrines, entrances) used as clickable hotspots in the 3D viewer. FK → `heritage_sites.id` (cascade delete).

### `users`
App-facing profile table, mirroring `auth.users` 1:1 via a shared `id`. Created automatically on first sign-in (recommend a Postgres trigger on `auth.users` insert — see Supabase docs on "Managing user data").

### `favorites`
Join table: `user_id` × `heritage_site_id`, unique constraint prevents duplicate favorites. Powers "My Favorites" on the profile page.

### `user_explorations`
Logs every time a user opens an AR, VR, 3D, Drone, or Article experience — `experience_type` enum matches those five values. Powers "My Heritage Journey" stats (sites explored, AR experiences, VR tours completed).

### `ai_questions`
Every question asked to the Heritage Guide, with its answer, for analytics and to improve grounding over time. `user_id` is nullable to support anonymous questions.

### `feedback_reports`
Backs the `/report` page's feedback form — issue type, optional related site, reporter email, free-text details. Not in the original spec's core 6 tables, but added because the `/report` page needs somewhere to persist submissions; wire the form's `onSubmit` to a route handler that inserts here.

## Storage buckets

| Bucket | Contents |
|---|---|
| `heritage-images` | Main + gallery photos |
| `heritage-3d-models` | `.glb` / `.gltf` files |
| `heritage-audio` | VR tour narration |
| `heritage-360` | 360° panorama images |
| `heritage-reconstructions` | Historical reconstruction renders |

All buckets are created as **public** in `schema.sql` for simplicity (read access needed by the frontend `<Image>`/`<video>` tags). Tighten to signed URLs if content licensing requires it.

## Row Level Security summary

- `heritage_sites` / `heritage_objects`: public **read**, write reserved for the service role (used by an admin CMS or direct SQL, not the public app).
- `users` / `favorites` / `user_explorations`: a user can only read/write **their own** rows (`auth.uid() = user_id`).
- `ai_questions` / `feedback_reports`: open **insert** (so anonymous visitors can ask questions / submit feedback), but reads are restricted to the owning user for `ai_questions`.
