import { Router, Request, Response } from "express";
import { getHeritageSiteBySlug } from "../data/heritageSites";
import { getSuggestedTopics, joinWithAnd } from "../utils/siteTopics";

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
      return res.json({ answer: fallbackAnswer(question, site), grounded: false });
    }

    const systemPrompt = site
      ? `You are the "Heritage Guide" for HeritageLens, an AI assistant embedded in a cultural-heritage exploration app. ` +
        `Answer questions about "${site.name}" (${site.city}, ${site.state}) using ONLY the following verified facts. ` +
        `If the question can't be answered from these facts, briefly say that specific detail isn't in your verified ` +
        `facts — don't just apologize and stop. Immediately pivot to 2-3 related things you CAN tell them about from ` +
        `the topics below, phrased as an invitation, e.g. "I don't have specifics on that particular carving, but I ` +
        `can tell you about who commissioned it or its architecture instead." ` +
        `Use the earlier conversation for context (e.g. "it", "that", follow-ups), but keep every factual claim grounded in the facts below. ` +
        `If the message is just a greeting (hi, hello, hey, namaste, etc.) with no actual question, ` +
        `reply with ONLY a short 1-2 sentence welcome naming the site and inviting them to ask about its ` +
        `history, architecture, or sculptures. Do NOT explain the history yet. ` +
        `Keep every answer under 80 words maximum. Be warm and educational. ` +
        `STRICT RULES: Never use any asterisks (*), never use markdown, never use bold, italic, or any special symbols. Write only plain clean sentences.\n\n` +
        `Topics you have grounded facts for: ${getSuggestedTopics(site, 5).map((t) => t.label).join(", ")}.\n` +
        `Description: ${site.description}\n` +
        `Historical period: ${site.historical_period}\n` +
        `Construction date: ${site.construction_date}\n` +
        `Cultural significance: ${site.cultural_significance}\n` +
        `Architectural details: ${site.architectural_details}\n` +
        `Facts: ${site.historical_facts.join(" | ")}`
      : `You are the "Heritage Guide" for HeritageLens, an AI assistant about Indian cultural heritage. ` +
        `Answer briefly in under 80 words. ` +
        `STRICT RULES: Never use any asterisks (*), never use markdown, never use bold or italic. Write only plain clean sentences. ` +
        `Encourage the user to select a specific monument for grounded detail. ` +
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
        max_tokens: 250,
        messages,
      }),
    });

    if (!response.ok) {
      return res.json({ answer: fallbackAnswer(question, site), grounded: false });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content ?? fallbackAnswer(question, site);

    return res.json({ answer, grounded: !!site });
  } catch {
    return res.status(500).json({
      error: "The Heritage Guide couldn't process that question. Please try again.",
    });
  }
});

function fallbackAnswer(question: string, site?: ReturnType<typeof getHeritageSiteBySlug>) {
  if (!site) {
    return `Select a heritage site first so the Heritage Guide can answer grounded in its verified history — or connect GROQ_API_KEY in .env to enable general Q&A.`;
  }
  const topics = getSuggestedTopics(site, 3).map((t) => t.label);
  const pivot = topics.length
    ? `In the meantime, I can tell you about ${joinWithAnd(topics)}.`
    : `Check the "Historical Significance" and "Interesting Facts" sections on the site's detail page.`;
  return `I don't have a fully grounded AI answer for that yet — connect a GROQ_API_KEY in .env to enable it. ${pivot}`;
}

export default router;