import { RequestHandler } from "express";

type ChatBody = { message: string };

const chat: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body as ChatBody;

    if (!message || typeof message !== "string") {
      res.status(400).json({ status: "ERROR", message: "message is required" });
      return;
    }

    const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "gemma2:2b";

    const r = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      res.status(500).json({
        status: "ERROR",
        message: "Failed to call Ollama",
        details: text,
      });
      return;
    }

    const data = await r.json();

    res.status(200).json({
      status: "OK",
      model,
      output: (data?.message?.content ?? "").trim(),
    });
    return;
  } catch (err: any) {
    res.status(500).json({
      status: "ERROR",
      message: err?.message ?? "Failed to call Ollama",
    });
    return;
  }
};

export default chat;
