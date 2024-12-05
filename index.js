const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI, Configuration } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configuração da API OpenAI
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

// Rota principal
app.post('/processar-codigo', async (req, res) => {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: 'O parâmetro "codigo" é obrigatório.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente especializado em análise de código." },
        { role: "user", content: codigo },
      ],
    });

    const resultado = response.choices[0].message;
    res.json({ resposta: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
