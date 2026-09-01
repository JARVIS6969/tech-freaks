import { Router, Request, Response } from "express";
import { getHeritageSiteBySlug } from "../data/heritageSites";

const router = Router();

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { question, siteSlug, history } = req.body as {
      question?: string;
      siteSlug?: string;
      history?: ChatMessage[];
    };

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "A question is required." });
    }

    const site = siteSlug ? getHeritageSiteBySlug(siteSlug) : undefined;
    const apiKey = process.env.GROQ_API_KEY;
    console.log("DEBUG apiKey present:", !!apiKey, apiKey ? apiKey.slice(0, 8) : null);

    if (!apiKey) {
      return res.json({ answer: fallbackAnswer(question, site?.name), grounded: false });
    }

    const systemPrompt = site
      ? `You are the "Heritage Guide" for HeritageLens, an AI assistant embedded in a cultural-heritage exploration app. ` +
        `Answer questions about "${site.name}" (${site.city}, ${site.state}) using ONLY the following verified facts. ` +
        `If the question can't be answered from these facts, say so honestly rather than inventing details. ` +
        `Use the earlier conversation for context (e.g. "it", "that", follow-ups), but keep every factual claim grounded in the facts below. ` +
        `Keep answers under 120 words, warm and educational.\n\n` +
        `Description: ${site.description}\n` +
        `Historical period: ${site.historical_period}\n` +
        `Construction date: ${site.construction_date}\n` +
        `Cultural significance: ${site.cultural_significance}\n` +
        `Architectural details: ${site.architectural_details}\n` +
        `Facts: ${site.historical_facts.join(" | ")}`
      : `You are the "Heritage Guide" for HeritageLens, an AI assistant about Indian cultural heritage. ` +
        `Answer briefly and generate the response with few emojis and encourage the user to select a specific monument for grounded detail. ` +
        `Use the earlier conversation for context where relevant.`;

    // Cap history to the last N turns to avoid runaway token growth
    const trimmedHistory = (history ?? []).slice(-10);

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: question },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        max_tokens: 400,
        messages,
      }),
    });

    if (!response.ok) {
      return res.json({ answer: fallbackAnswer(question, site?.name), grounded: false });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content ?? fallbackAnswer(question, site?.name);

    return res.json({ answer, grounded: !!site });
  } catch {
    return res.status(500).json({
      error: "The Heritage Guide couldn't process that question. Please try again.",
    });
  }
});

function fallbackAnswer(question: string, siteName?: string) {
  return siteName
    ? `That's a great question about ${siteName}. Connect a GROQ_API_KEY in .env to get a fully grounded answer here — for now, check the "Historical Significance" and "Interesting Facts" sections on the site's detail page.`
    : `Select a heritage site first so the Heritage Guide can answer grounded in its verified history — or connect GROQ_API_KEY in .env to enable general Q&A.`;
}

export default router;