import OpenAI from "openai";

export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

const { message } = req.body

try{

const response = await openai.responses.create({
model:"gpt-4o-mini",
input:message
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
