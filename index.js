const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI, Configuration } = require('openai');
require('dotenv').config();

const app = express();
const port = 1000;

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
  
  const code_problems_report = [{
    "name": "code_problems_report",
    "description": "Generates a JSON report indicating the presence or absence of various code issues identified in the provided code.",
    //"strict": true,
    "parameters": {
        "type": "object",
        "required": [
        "checks"
        ],
        "properties": {
        "checks": {
            "type": "object",
            "properties": {
            "P1001": {
                "type": "boolean",
                "description": "Indicates whether the code has a data class smell"
            },
            "P1002": {
                "type": "boolean",
                "description": "Indicates whether the code has a large class smell"
            },
            "P1003": {
                "type": "boolean",
                "description": "Indicates whether the code has a lazy class smell"
            },
            "P1004": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Open/Closed Principle"
            },
            "P1205": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits speculative generality smell"
            },
            "P1306": {
                "type": "boolean",
                "description": "Indicates whether there are alternative classes with different interfaces smell"
            },
            "P1307": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Interface Segregation Principle"
            },
            "P1608": {
                "type": "boolean",
                "description": "Indicates whether the code has a middle man smell"
            },
            "P2009": {
                "type": "boolean",
                "description": "Indicates whether the code has a long method smell"
            },
            "P2310": {
                "type": "boolean",
                "description": "Indicates whether the code has a long parameter list smell"
            },
            "P2511": {
                "type": "boolean",
                "description": "Indicates whether the code has switch statements smell"
            },
            "P3012": {
                "type": "boolean",
                "description": "Indicates whether the code has excessive comments smell"
            },
            "P3013": {
                "type": "boolean",
                "description": "Indicates whether the code has data clumps smell"
            },
            "P3014": {
                "type": "boolean",
                "description": "Indicates whether the code has dead code smell"
            },
            "P3015": {
                "type": "boolean",
                "description": "Indicates whether the code has divergent change smell"
            },
            "P3016": {
                "type": "boolean",
                "description": "Indicates whether the code has primitive obsession smell"
            },
            "P3017": {
                "type": "boolean",
                "description": "Indicates whether the code has temporary fields smell"
            },
            "P3618": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Single Responsibility Principle"
            },
            "P4019": {
                "type": "boolean",
                "description": "Indicates whether the code has parallel inheritance hierarchies smell"
            },
            "P4020": {
                "type": "boolean",
                "description": "Indicates whether the code has refused bequest smell"
            },
            "P4021": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Dependency Inversion Principle"
            },
            "P4022": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Liskov Substitution Principle"
            },
            "P4523": {
                "type": "boolean",
                "description": "Indicates whether the code has duplicate code smell"
            },
            "P4624": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits feature envy smell"
            },
            "P6025": {
                "type": "boolean",
                "description": "Indicates whether the code has inappropriate intimacy smell"
            },
            "P6026": {
                "type": "boolean",
                "description": "Indicates whether the code has message chains smell"
            },
            "P6027": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits shotgun surgery smell"
            },
            "P6028": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of Demeter's Law"
            },
            "P6029": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Tell Don’t Ask Principle"
            }
            },
            "additionalProperties": false,
            "required": [
            "P1001",
            "P1002",
            "P1003",
            "P1004",
            "P1205",
            "P1306",
            "P1307",
            "P1608",
            "P2009",
            "P2310",
            "P2511",
            "P3012",
            "P3013",
            "P3014",
            "P3015",
            "P3016",
            "P3017",
            "P3618",
            "P4019",
            "P4020",
            "P4021",
            "P4022",
            "P4523",
            "P4624",
            "P6025",
            "P6026",
            "P6027",
            "P6028",
            "P6029"
            ]
        }
        },
        "additionalProperties": false
    }
}];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um professor que analisa o código fonte dos seus alunos e gera uma resposta code_problems_report, apontando true para os problemas identificados no trecho fornecido, e false para os que não estão presentes no trecho fornecido." },
        { role: "user", content: codigo },
      ],
      functions: code_problems_report,
      function_call: "auto",
    });
    const resultado = response.choices[0].message.function_call.arguments;
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
