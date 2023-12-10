// LogPoliticaPrivacidade.ts

import { ObjectId } from "mongodb";
import ConexaoMongo from "./ConexaoMongo";

interface iPoliticaPrivacidade{
    _id?: ObjectId,
    titulo: string,
    data: Date,
    politicas: {
        obrigatorio: string,
        opcionais: {
            index: number,
            titulo: string
            conteudo: string
        }[]
    }
}

class LogPoliticaPrivacidade {
    constructor(public politica_privacidade: iPoliticaPrivacidade) {}

    async salvarLogPoliticaPrivacidade(): Promise<ObjectId> {
        const conexaoMongoService = ConexaoMongo;

        try {
            await conexaoMongoService.conectar();
            const termosCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");

            // Criar novos logs de politica_privacidade
            const result = await termosCollection.insertOne(this.politica_privacidade);
            console.log("Inseriu log_politica_privacidade");

            return result.insertedId;  // Retorna o _id do documento inserido
        }catch(error){
            console.log(error)
        }
    }
}

export default LogPoliticaPrivacidade;
