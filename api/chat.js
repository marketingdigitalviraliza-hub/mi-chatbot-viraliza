import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { message } = req.body;

  try {

    const stream = await openai.responses.stream({
      model: "gpt-4o-mini",
      input: message
    });

    let finalText = "";

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        finalText += event.delta;
      }
    }

    res.status(200).json({
      reply: finalText
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error generating response"
    });

  }

}
