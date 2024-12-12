async function createPdfReportFromHtml(htmlContent, outputPath) {
    const pdf = require('html-pdf');
    const options = { format: 'A4', border: '20mm' };
    pdf.create(htmlContent, options).toFile(outputPath);
    return outputPath;
}

function prepareDataForReport(data) {
    let htmlBase = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Relatório CodeBuddy</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 2cm;
                    padding: 0;
                    line-height: 1;
                }

                h1 {
                    text-align: center;
                    font-size: 30px;
                    margin-bottom: 20px;
                }
                h2 {
                    text-align: center;
                    font-size: 20px;
                    margin-bottom: 20px;
                }

                p {
                    text-align: justify;
                    margin-bottom: 15px;
                }

                ul {
                    margin: 15px 0;
                    padding-left: 20px;
                }

                li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Relatório CodeBuddy</h1>
            <p>
                [CHECKS_FEEDBACK]
            </p>
            <hr>
            <h2>Dificuldades Encontradas</h2>
            <ul>
                [DIFFICULTIES_LIST]
            </ul>
            <p>
                [DIFFICULTIES_FEEDBACK]
            </p>
        </body>
        </html>

    `;
    const { marked } = require('marked');
    const checksFeedback = marked(data.feedback_checks);
    htmlBase = htmlBase.replace('[CHECKS_FEEDBACK]', checksFeedback);
    let difficultiesList = '';
    if (data.difficulties.classes_difficulties) difficultiesList += "<li>Entendimento de classes</li>";
    if (data.difficulties.method_difficulties) difficultiesList += "<li>Compreensão do conceito de método</li>";
    if (data.difficulties.object_orientation_difficulties) difficultiesList += "<li>Entendimento e implementação da orientação a objetos</li>";
    if (data.difficulties.object_relations_difficulties) difficultiesList += "<li>Relacionamento entre objetos</li>";
    if (data.difficulties.polymorphism_overloading_difficulties) difficultiesList += "<li>Entendimento de polimorfismo e sobrecarga</li>";
    if (data.difficulties.encapsulation_difficulties) difficultiesList += "<li>Compreensão de encapsulamento</li>";
    htmlBase = htmlBase.replace('[DIFFICULTIES_LIST]', difficultiesList);
    const difficultiesFeedback = marked(data.feedback_difficulties);
    htmlBase = htmlBase.replace('[DIFFICULTIES_FEEDBACK]', difficultiesFeedback);
    return htmlBase;
}

function generateReport(data){
    const htmlReport = prepareDataForReport(data);
    /*const { v4: uuidv4 } = require('uuid');
    const reportFile = "report_" + uuidv4() + ".pdf";
    const dir = "/var/www/html/reports/"
    createPdfReportFromHtml(htmlReport, dir+reportFile);
    return reportFile;*/
    return htmlReport;
}

function identifyDifficulties(checks){
    const classes_difficulties = checks.data_class_smell || checks.large_class_smell || checks.lazy_class_smell || 
        checks.open_close_principle_violation || checks.speculative_generality_smell || 
        checks.alternative_classes_with_different_interfaces_smell || checks.interface_segregation_principle_violation || 
        checks.middle_man_smell;
    const method_difficulties = checks.speculative_generality_smell || checks.long_method_smell || 
        checks.long_parameter_list_smell || checks.switch_statements_smell;
    const object_orientation_difficulties = checks.alternative_classes_with_different_interfaces_smell || 
        checks.interface_segregation_principle_violation || checks.long_parameter_list_smell || checks.data_clumps_smell || 
        checks.dead_code_smell || checks.divergent_change_smell || checks.primitive_obsession_smell || 
        checks.temporary_fields_smell || checks.comments_smell || checks.single_responsability_principle_violation;
    const object_relations_difficulties = checks.duplicate_code_smell || checks.liskov_substitution_principle_violation || 
        checks.feature_envy_smell || checks.dependency_inversion_principle_violation || checks.refused_bequest_smell ||
        checks.parallel_inheritance_hierarchies_smell;
    const polymorphism_overloading_difficulties = checks.switch_statements_smell || duplicate_code_smell;
    const encapsulation_difficulties = checks.demeter_law_violation || checks.middle_man_smell || checks.shotgun_surgery_smell ||
        checks.single_responsability_principle_violation || checks.inappropriate_intimacy_smell || checks.feature_envy_smell ||
        checks.tell_dont_ask_principle_violation || checks.message_chains_smell;
    const difficulties = { classes_difficulties, method_difficulties, object_orientation_difficulties, object_relations_difficulties, polymorphism_overloading_difficulties, encapsulation_difficulties };
    return difficulties;
} 

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'codebuddy';
const collectionName = 'interacoes';

async function saveInteracao(interacao){
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const resultado = await collection.insertOne(interacao);
    await client.close();
}
async function retrieveInteracao(guid){
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documento = await collection.findOne({ guid });
    await client.close();
    return documento;
}

module.exports = {generateReport, identifyDifficulties, saveInteracao, retrieveInteracao};
