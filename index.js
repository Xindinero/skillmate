import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('SkillMate API está viva 🚀');
});

app.post('/api/ai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = completion.choices[0].message.content;
    res.json({ result: response });
  } catch (error) {
    console.error('Error al generar respuesta:', error.message);
    res.status(500).json({ error: 'Error generando respuesta con OpenAI' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor SkillMate funcionando 🚀');
});
