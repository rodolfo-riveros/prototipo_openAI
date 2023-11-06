"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = __importDefault(require("openai"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Agrega el middleware para analizar el cuerpo de la solicitud como JSON
const openai = new openai_1.default({
    apiKey: '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',
});
// Ruta para recibir las preguntas del frontend y obtener la respuesta de OpenAI
app.post("/preguntas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { pregunta } = req.body; // Obtiene la pregunta del cuerpo de la solicitud
        // Realiza la solicitud a la API de OpenAI para obtener la respuesta
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: pregunta }],
            model: 'gpt-3.5-turbo',
        });
        const respuesta = (_c = (_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim(); // Verifica la nulidad antes de acceder a las propiedades
        res.json({ respuesta }); // Envía la respuesta al frontend
    }
    catch (error) {
        console.error("Error al obtener la respuesta de OpenAI:", error);
        res.status(500).json({ error: "Error desconocido al obtener la respuesta de OpenAI" });
    }
}));
app.listen(port, () => {
    console.log("Example app listening on port http://localhost:", port);
});
