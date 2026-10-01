// Import required modules
import express from 'express'
import dotenv from "dotenv"
import OpenAI from 'openai'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = 4100

app.use("/", express.static("public"))

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize OpenAI client with API key from environment variables
const openAi = new OpenAI({
    apiKey: process.env.OPENIA_KEY
})


// Define POST route for chatbot requests
app.post('api/chatbot', async (req, res) => {

    const contextIA = `
    Eres un asistente de soporte para un negocio.
    Información:
        -Ubicación:Calle Siempreviva 132,
        -Horarios: Lunes a viernes de 9 a 22
        -Productos: Alimenticios y de Limpieza
 `

    const { message } = req.body

    if (!message) {
        return res.status(404).send({
            status: "error",
            message: "No se ha enviado un mensaje"
        })
    }

    try {

        const response = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: contextIA },
                { role: "system", content: "Responder de manera corta y directa" },
                { role: "user", content: message }
            ],
            max_tokens: 500
        })

         // Extract chatbot reply from response
        const reply = response.choices[0].message.content

        return res.status(200).json({reply})

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: error.message
        })
    }


})

app.listen(PORT, () => {
    console.log("El servidor se encuentra corriendo en el puesto 4100");
})