// Importando o mysql2
const mysql = require('mysql2');
const { OpenAI, Configuration } = require('openai');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'avaliacaomestrado'
});

// Conectando ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');

  // Executando o SELECT para obter os códigos
  connection.query('SELECT id, codigo FROM codigos WHERE id >= 88', (error, results) => {
    if (error) {
      console.error('Erro ao executar o SELECT:', error);
      return;
    }

    const openai = new OpenAI({
        apiKey: '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',
    });
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

    // Iterando sobre os resultados
    results.forEach(async row => {
      const { id, codigo } = row;     
      console.log(`Testando código ${id}...`);     
      //FAZ AQUI A MAGIA
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

      // Inserindo no banco de dados na tabela resultados
      const sqlquery = `
        INSERT INTO interacoes(
            momento, modelo, codigo_id, jsonres, acdi, comments, dataclass, dataclumps, deadcode, divergentchange, 
            duplicatecode, featureenvy, innapintimacy, largeclass, lazyclass, longmethod, longparameter, 
            messagechain, middleman, pih, primitiveobss, refusedbequest, shotgun, 
            speculativegen, switchstatements, tempfields, demeter, telldontask, 
            solid_s, solid_o, solid_l, solid_i, solid_d
        ) VALUES (
            CURRENT_TIMESTAMP, 'o1-mini', ${id}, '${JSON.stringify(data.checks)}', 
            ${checks.alternative_classes_with_different_interfaces_smell ?? false}, 
            ${checks.comments_smell ?? false}, 
            ${checks.data_class_smell ?? false}, 
            ${checks.data_clumps_smell ?? false}, 
            ${checks.dead_code_smell ?? false}, 
            ${checks.divergent_change_smell ?? false},
            ${checks.duplicate_code_smell ?? false}, 
            ${checks.feature_envy_smell ?? false}, 
            ${checks.inappropriate_intimacy_smell ?? false}, 
            ${checks.large_class_smell ?? false}, 
            ${checks.lazy_class_smell ?? false}, 
            ${checks.long_method_smell ?? false}, 
            ${checks.long_parameter_list_smell ?? false}, 
            ${checks.message_chains_smell ?? false}, 
            ${checks.middle_man_smell ?? false}, 
            ${checks.parallel_inheritance_hierarchies_smell ?? false}, 
            ${checks.primitive_obsession_smell ?? false}, 
            ${checks.refused_bequest_smell ?? false}, 
            ${checks.shotgun_surgery_smell ?? false},
            ${checks.speculative_generality_smell ?? false}, 
            ${checks.switch_statements_smell ?? false}, 
            ${checks.temporary_fields_smell ?? false}, 
            ${checks.demeter_law_violation ?? false}, 
            ${checks.tell_dont_ask_principle_violation ?? false}, 
            ${checks.single_responsability_principle_violation ?? false}, 
            ${checks.open_close_principle_violation ?? false}, 
            ${checks.liskov_substitution_principle_violation ?? false}, 
            ${checks.interface_segregation_principle_violation ?? false}, 
            ${checks.dependency_inversion_principle_violation ?? false}
        );
        `;

      connection.query(
        sqlquery,
        (insertError) => {
          if (insertError) {
            console.error(`Erro ao inserir resultado para id ${id}:`, insertError);
            console.log('Resultado:', JSON.stringify(data.checks));
            console.log('SQL:', sqlquery);
            process.exit(1);
          } else {
            console.log(`Resultado inserido para id ${id}`);
          }
        }
      );
    });
  });
});

