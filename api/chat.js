import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `
Eres un experto en Meta Ads.

Debes analizar el negocio del usuario y generar:

1. Objetivo de campaña
2. Estructura de campañas
3. Segmentación recomendada
4. Creativos recomendados
5. Distribución de presupuesto
6. KPI a medir

Negocio del usuario:

${message}
`
  });

  res.status(200).json({
    reply: response.output_text
  });

}
