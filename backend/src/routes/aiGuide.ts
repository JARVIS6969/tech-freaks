import { Router, Request, Response } from "express";
import { getHeritageSiteBySlug } from "../data/heritageSites";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { question, siteSlug } = req.body as { question?: string; siteSlug?: string };

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "A question is required." });
    }

    const site = siteSlug ? getHeritageSiteBySlug(siteSlug) : undefined;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.json({ answer: fallbackAnswer(question, site?.name), grounded: false });
    }

    const systemPrompt = site
      ? `You are the "Heritage Guide" for HeritageLens, an AI assistant embedded in a cultural-heritage exploration app. ` +
        `Answer questions about "${site.name}" (${site.city}, ${site.state}) using ONLY the following verified facts. ` +
        `If the question can't be answered from these facts, say so honestly rather than inventing details. Keep answers under 120 words, warm and educational.\n\n` +
        `Description: ${site.description}\n` +
        `Historical period: ${site.historical_period}\n` +
        `Construction date: ${site.construction_date}\n` +
        `Cultural significance: ${site.cultural_significance}\n` +
        `Architectural details: ${site.architectural_details}\n` +
        `Facts: ${site.historical_facts.join(" | ")}`
      : `You are the "Heritage Guide" for HeritageLens, an AI assistant about Indian cultural heritage. ` +
        `Answer briefly and encourage the user to select a specific monument for grounded detail.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!response.ok) {
      return res.json({ answer: fallbackAnswer(question, site?.name), grounded: false });
    }

    const data = await response.json();
    const answer =
      data.content?.find((c: { type: string }) => c.type === "text")?.text ??
      fallbackAnswer(question, site?.name);

    return res.json({ answer, grounded: !!site });
  } catch {
    return res.status(500).json({
      error: "The Heritage Guide couldn't process that question. Please try again.",
    });
  }
});

function fallbackAnswer(question: string, siteName?: string) {
  return siteName
    ? `That's a great question about ${siteName}. Connect an ANTHROPIC_API_KEY in .env to get a fully grounded answer here — for now, check the "Historical Significance" and "Interesting Facts" sections on the site's detail page.`
    : `Select a heritage site first so the Heritage Guide can answer grounded in its verified history — or connect ANTHROPIC_API_KEY in .env to enable general Q&A.`;
}

export default router;