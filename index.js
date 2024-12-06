const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI, Configuration } = require('openai');
require('dotenv').config();


const app = express();
app.use(cors());
const port = 30000;

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
            "data_class_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a data class smell"
            },
            "large_class_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a large class smell"
            },
            "lazy_class_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a lazy class smell"
            },
            "open_close_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Open/Closed Principle"
            },
            "speculative_generality_smell": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits speculative generality smell"
            },
            "alternative_classes_with_different_interfaces_smell": {
                "type": "boolean",
                "description": "Indicates whether there are alternative classes with different interfaces smell"
            },
            "interface_segregation_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Interface Segregation Principle"
            },
            "middle_man_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a middle man smell"
            },
            "long_method_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a long method smell"
            },
            "long_parameter_list_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has a long parameter list smell"
            },
            "switch_statements_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has switch statements smell"
            },
            "comments_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has excessive comments smell"
            },
            "data_clumps_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has data clumps smell"
            },
            "dead_code_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has dead code smell"
            },
            "divergent_change_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has divergent change smell"
            },
            "primitive_obsession_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has primitive obsession smell"
            },
            "temporary_fields_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has temporary fields smell"
            },
            "single_responsability_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Single Responsibility Principle"
            },
            "parallel_inheritance_hierarchies_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has parallel inheritance hierarchies smell"
            },
            "refused_bequest_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has refused bequest smell"
            },
            "dependency_inversion_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Dependency Inversion Principle"
            },
            "liskov_substitution_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Liskov Substitution Principle"
            },
            "duplicate_code_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has duplicate code smell"
            },
            "feature_envy_smell": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits feature envy smell"
            },
            "inappropriate_intimacy_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has inappropriate intimacy smell"
            },
            "message_chains_smell": {
                "type": "boolean",
                "description": "Indicates whether the code has message chains smell"
            },
            "shotgun_surgery_smell": {
                "type": "boolean",
                "description": "Indicates whether the code exhibits shotgun surgery smell"
            },
            "demeter_law_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of Demeter's Law"
            },
            "tell_dont_ask_principle_violation": {
                "type": "boolean",
                "description": "Indicates whether there is a violation of the Tell Don’t Ask Principle"
            }
            },
            "additionalProperties": false,
            "required": [
            "data_class_smell",
            "large_class_smell",
            "lazy_class_smell",
            "open_close_principle_violation",
            "speculative_generality_smell",
            "alternative_classes_with_different_interfaces_smell",
            "interface_segregation_principle_violation",
            "middle_man_smell",
            "long_method_smell",
            "long_parameter_list_smell",
            "switch_statements_smell",
            "comments_smell",
            "data_clumps_smell",
            "dead_code_smell",
            "divergent_change_smell",
            "primitive_obsession_smell",
            "temporary_fields_smell",
            "single_responsability_principle_violation",
            "parallel_inheritance_hierarchies_smell",
            "refused_bequest_smell",
            "dependency_inversion_principle_violation",
            "liskov_substitution_principle_violation",
            "duplicate_code_smell",
            "feature_envy_smell",
            "inappropriate_intimacy_smell",
            "message_chains_smell",
            "shotgun_surgery_smell",
            "demeter_law_violation",
            "tell_dont_ask_principle_violation"
            ]
        }
        },
        "additionalProperties": false
    }
  }];
  const c1 = "A incidência de problemas do tipo Data Class Smell, Large Class Smell, Lazy Class Smell, Middle Man Smell, Speculative Generality Smell, Alternative Classes With Different Interfaces Smell, Violações do Open Close Principle e Violações do Interface Segregation Principle indicam Dificuldades Relacionadas ao Entendimento de Classes. " ;
  const c2 = "A incidência de problemas do tipo Speculative Generality Smell, Long Method Smell, Long Parameter List Smell e Switch Statements Smell indicam Dificuldades em Entender o Conceito de Método. ";
  const c3 = "A incidência de problemas do tipo Long Parameter List Smell, Alternative Classes With Different Interfaces Smell, Temporary Fields Smell, Divergent Change Smell, Dead Code Smell, Data Clumps Smell, Primitive Obsession Smell, Comments Smell, Violações do Single Responsability Principle e Violações do Interface Segregation Principle indicam Dificuldades em Entender e Implementar a Orientação a Objetos. ";
  const c4 = "A incidência de problemas do tipo Duplicate Code Smell, Feature Envy Smell, Refused Bequest Smell, Parallel Inheritance Hiearachies Smell, Violações do Liskov Substitution Principle e Violações do Dependency Inversion Principle indicam Dificuldades em Entender Relacionamento Entre Objetos. ";
  const c5 = "A incidência de problemas do tipo Duplicate Code Smell e Switch Statements Smell indicam Dificuldades em Entender Polimorfismo e Sobrecarga. ";
  const c6 = "A incidência de problemas do tipo Middle Man Smell, Shotgun Surgery Smell, Inappropriate Intimacy Smell, Feature Envy Smell, Message Chains Smell, Violações do Princípio Tell Don't Asl, Violações do Single Responsability Principle e Violações da Lei de Demeter indicam Dificuldades em Entender e Implementar o Conceito de Encapsulamento. ";
  const mapaIncidencias = c1 + c2 + c3 + c4 + c5 + c6;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a teacher who analyzes your students' source code and generates a `code_problems_report`, marking `true` for the problems identified in the provided snippet and `false` for those not present in the provided snippet." },
        { role: "user", content: codigo },
      ],
      functions: code_problems_report,
      function_call: "auto",
    });
    const resultado = response.choices[0].message.function_call.arguments;

    const data = JSON.parse(resultado);
    const checks = data.checks;
    const checksMap = new Map(Object.entries(checks));
    //segunda interação, agora com o modelo GPT-4o para pedir feedback. enviar os problemas identificados e o código original e a string de prompt
    const feedbackResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Você é um professor que analisa o código-fonte dos seus alunos, identifica problemas de qualidade de código e gera um feedback educacional. Certifique-se de não refatorar diretamente o código-fonte fornecido, mas você pode apresentar exemplos relacionados. Seu feedback deve conter detalhes técnicos de cada problema presente, insights técnicos e exemplos relacionados, e ajudar na motivação do estudante." },
        { role: "assistant", content: mapaIncidencias},
        { role: "user", content: "O código-fonte do estudante: " + codigo},
        { role: "assistant", content: "Problemas já identificados: " + checksMap},
        { role: "user", content: "Gere agora a mensagem de feedback" + codigo}
      ],
    });
    const resultadoFeedback = feedbackResponse.choices[0].message.content;


    res.json(resultadoFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
