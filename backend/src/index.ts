import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // Agrega el middleware para analizar el cuerpo de la solicitud como JSON

const openai = new OpenAI({
    apiKey: 'TU_API-KEY',
});

// Ruta para recibir las preguntas del frontend y obtener la respuesta de OpenAI
app.post("/preguntas", async (req, res) => {
    try {
        const { pregunta } = req.body; // Obtiene la pregunta del cuerpo de la solicitud

        // Realiza la solicitud a la API de OpenAI para obtener la respuesta
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: pregunta }],
            model: 'gpt-3.5-turbo',
        });

        const respuesta = chatCompletion.choices[0]?.message?.content?.trim(); // Verifica la nulidad antes de acceder a las propiedades

        res.json({ respuesta }); // Envía la respuesta al frontend
    } catch (error) {
        console.error("Error al obtener la respuesta de OpenAI:", error);
        res.status(500).json({ error: "Error desconocido al obtener la respuesta de OpenAI" });
    }
});

app.listen(port, () => {
    console.log("Example app listening on port http://localhost:", port);
});
