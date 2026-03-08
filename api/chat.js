import OpenAI from "openai";

export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

const { message } = req.body;

  // 1. Ocultamos esta instrucción al final del mensaje del usuario
  const instruccionesFormato = "\n\nIMPORTANTE: Responde de forma muy amigable, conversacional y fácil de leer. Usa párrafos cortos (máximo 3 líneas). Usa doble salto de línea entre ideas. NO uses formato Markdown (cero asteriscos y cero numerales).";
  
  const mensajeFinal = message + instruccionesFormato;

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: mensajeFinal
})

res.status(200).json({
reply:response.output_text
})

}catch(error){

res.status(500).json({
error:"Error generating response"
})

}

}
