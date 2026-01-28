import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_CHARS = 1000;
const BLOCKED_KEYWORDS = ["hate", "violence", "self-harm", "suicide"]; // simple keyword guard

app.use(cors());
app.use(express.json());

const toneGuidance = {
  casual: "Use a friendly, relaxed tone that feels conversational.",
  professional: "Use a clear, polished tone appropriate for work settings.",
  "very-human": "Use a warm, natural tone with subtle human-like phrasing."
};

function buildPrompt(text, tone) {
  const guidance = toneGuidance[tone] || toneGuidance.casual;
  return `You are an AI writing assistant. ${guidance}
Rewrite the following text to sound more natural and fluent without changing the meaning:
"""
${text}
"""`;
}

function hasBlockedContent(text) {
  const lowered = text.toLowerCase();
  return BLOCKED_KEYWORDS.some((keyword) => lowered.includes(keyword));
}

async function callRealAI({ text, tone }) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const prompt = buildPrompt(text, tone);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You rewrite user text to sound human." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("AI API returned no content");
  }

  return content;
}

function mockHumanize({ text, tone }) {
  const toneLabel = tone || "casual";
  const trimmed = text.trim();
  const softened = trimmed
    .replace(/\bdo not\b/gi, "don't")
    .replace(/\bdoes not\b/gi, "doesn't")
    .replace(/\bI am\b/gi, "I'm")
    .replace(/\bWe are\b/gi, "We're")
    .replace(/\bIt is\b/gi, "It's");

  const introMap = {
    casual: "Here's a more relaxed take:",
    professional: "Here is a clearer, professional rewrite:",
    "very-human": "Here is a warmer, more human-sounding version:"
  };

  const intro = introMap[toneLabel] || introMap.casual;
  return `${intro}\n${softened}`;
}

app.post("/humanize", async (req, res) => {
  const { text, tone } = req.body || {};

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ error: "Please provide text to humanize." });
  }

  if (text.length > MAX_CHARS) {
    return res
      .status(400)
      .json({ error: `Text exceeds ${MAX_CHARS} characters.` });
  }

  if (hasBlockedContent(text)) {
    return res.status(400).json({
      error: "This request was blocked due to restricted content."
    });
  }

  try {
    const humanized = await callRealAI({ text, tone });
    return res.json({ humanized, usedMock: false });
  } catch (error) {
    const humanized = mockHumanize({ text, tone });
    return res.json({ humanized, usedMock: true, note: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI Humanizer API running on http://localhost:${PORT}`);
});
