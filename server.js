const express = require("express")
const cors = require("cors")
const OpenAI = require("openai")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname))

const openai = new OpenAI({
  apiKey: "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"
})

app.post("/chat", async (req,res)=>{

const mensaje = req.body.message

const respuesta = await openai.responses.create({
model:"gpt-4.1-mini",
input:`
Eres un Media Buyer experto en Meta Ads y marketing digital.

Debes analizar el negocio del usuario y generar una estrategia completa.

Responde con esta estructura:

1. Objetivo de campaña recomendado
2. Estructura de campañas
3. Número de conjuntos de anuncios
4. Segmentación detallada (intereses, comportamientos)
5. Creativos recomendados
6. Distribución de presupuesto
7. KPI a medir
8. Estrategia de optimización

Explica de forma clara para emprendedores.

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

app.listen(process.env.PORT || 3000)
console.log("Servidor funcionando")

})



