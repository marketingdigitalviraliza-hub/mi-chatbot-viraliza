const express = require("express")
const cors = require("cors")
const OpenAI = require("openai")

const app = express()

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: "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"
})

app.post("/chat", async (req,res)=>{

const mensaje = req.body.message

const respuesta = await openai.responses.create({
model:"gpt-5",
input:`
Eres un experto en Meta Ads.

El usuario describirá su negocio.

Debes recomendar:

- tipo de campaña
- segmentación
- creativos
- presupuesto

Información del negocio:

${mensaje}
`
})

res.json({
reply: respuesta.output_text
})

})

app.listen(3000,()=>{
console.log("Servidor funcionando")
})