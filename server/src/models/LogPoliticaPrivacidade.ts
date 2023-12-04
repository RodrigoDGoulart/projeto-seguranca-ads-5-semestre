// LogPoliticaPrivacidade.ts

import { ObjectId } from "mongodb";
import ConexaoMongo from "./ConexaoMongo";

class LogPoliticaPrivacidade {
    constructor(public titulo: string, public data: Date, public politica_privacidade:string, public id?: ObjectId) {}

    async salvarLogPoliticaPrivacidade(): Promise<ObjectId> {
        const conexaoMongoService = ConexaoMongo;

        try {
            await conexaoMongoService.conectar();
            const termosCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");

            // Criar novos logs de politica_privacidade
            const result = await termosCollection.insertOne({ titulo: this.titulo, data: this.data, politica_privacidade: this.politica_privacidade });

            console.log("Inseriu log_politica_privacidade");

            return result.insertedId;  // Retorna o _id do documento inserido
        }catch(error){
            console.log(error)
        }
    }
}

export default LogPoliticaPrivacidade;
