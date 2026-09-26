const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const Room = require("../models/Room");
const LostFound = require("../models/LostFound");
const { isAuthenticated } = require("../middleware/authMiddleware");

function extractText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const interaction = data.interaction || data;
  if (typeof interaction.output_text === "string") return interaction.output_text;
  if (Array.isArray(interaction.steps)) {
    const parts = [];
    for (const step of interaction.steps) {
      if (step.type === "model_output" && Array.isArray(step.content)) {
        for (const block of step.content) {
          if (block.type === "text" && block.text) parts.push(block.text);
        }
      }
    }
    if (parts.length) return parts.join("");
  }
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts.map((p) => p.text || "").join("");
  }
  return null;
}

router.post("/", isAuthenticated, async (req, res) => {
  const message = (req.body.message || "").trim();
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "The chatbot is not configured yet — missing API key on the server." });
  }

  try {
    const [buses, notices, events, rooms, lostAndFound] = await Promise.all([
      Bus.find({}, "busTitle routeDirection destination stops currentStopIndex isRunning").sort({ order: 1 }),
      Notice.find({}, "title description category").sort({ createdAt: -1 }).limit(10),
      Event.find({}, "title date time location description status").sort({ order: 1 }),
      Room.find({}, "name number status nextAvailableTime").sort({ order: 1 }),
      LostFound.find({}, "title type location date description").sort({ createdAt: -1 }).limit(10),
    ]);

    const context = JSON.stringify({ buses, notices, events, rooms, lostAndFound }).slice(0, 8000);

    const systemInstruction =
      "You are the CampusX campus assistant. Answer ONLY using the database context below. " +
      "Keep answers short and friendly. If the answer is not in the context, say you don't have that information. " +
      "DATABASE CONTEXT (JSON): " + context;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
        input: message,
        system_instruction: systemInstruction,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429) {
      return res.status(429).json({
        error: "The chatbot is getting a lot of questions right now — please try again in a minute.",
      });
    }
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gemini ${response.status}:`, errorBody.slice(0, 300));
      throw new Error("Gemini request failed");
    }
    const data = await response.json();
    const reply = extractText(data);
    if (!reply) throw new Error("Empty Gemini response");

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(502).json({ error: "The chatbot could not answer right now. Please try again." });
  }
});

module.exports = router;
