# API Documentation

## `POST /api/ai-guide`

Answers a natural-language question about a heritage site, grounded in that site's verified data.

**Location:** `src/app/api/ai-guide/route.ts`

### Request

```json
{
  "question": "Why was this temple built?",
  "siteSlug": "modhera-sun-temple"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `question` | string | Yes | The user's natural-language question |
| `siteSlug` | string | No | If provided, the answer is grounded in that site's `heritage_sites` record. If omitted, the guide gives general guidance and asks the user to pick a site. |

### Response — success

```json
{
  "answer": "The Modhera Sun Temple was built by King Bhima I of the Chaulukya dynasty in 1026–1027 CE, designed so the equinox sunrise strikes the sanctum directly...",
  "grounded": true
}
```

`grounded: true` means the answer was generated with the site's real data as system-prompt context. `grounded: false` means either no `siteSlug` was given, or `ANTHROPIC_API_KEY` isn't configured (fallback response returned instead) — the UI can use this flag to show a subtle "general answer" indicator if desired.

### Response — error

```json
{ "error": "A question is required." }
```
Returned with HTTP 400 if `question` is missing/empty, or HTTP 500 if the upstream call fails unexpectedly.

### How grounding works

The route builds a system prompt containing only the requested site's verified fields (`description`, `historical_period`, `construction_date`, `cultural_significance`, `architectural_details`, `historical_facts`) and instructs the model to answer only from those facts, or admit it doesn't know — preventing hallucinated history. See the `systemPrompt` construction inside `route.ts` for the exact wording.

### Configuration

Requires `ANTHROPIC_API_KEY` in `.env.local`. Without it, the route still returns HTTP 200 with a helpful fallback message rather than failing — so the AI Guide page never looks broken in a zero-config demo.

### Extending

- **Persist Q&A history:** insert into the `ai_questions` table (see `docs/DATABASE_SCHEMA.md`) after a successful answer, tagged with the requesting user's id if authenticated.
- **Streaming responses:** switch to `stream: true` in the Anthropic request body and adapt the route to return a `ReadableStream` — update `AIChatPage.tsx`'s fetch handling to read the stream incrementally.
- **Multi-turn context:** currently each question is stateless. To support follow-ups, pass the full `messages` array (see `AIChatPage.tsx`'s `messages` state) instead of just the latest question.
