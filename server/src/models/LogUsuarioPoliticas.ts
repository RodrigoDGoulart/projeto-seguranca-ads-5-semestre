// LogUsuarioPoliticas.ts

import { ObjectId } from "mongodb";
import ConexaoMongo from "./ConexaoMongo";

interface iLogUsuarioPoliticas{
    _id? : ObjectId,
    id_usuario: Number,
    data: Date,
    id_politica_privacidade: string,
    email_usuario: string,
    politicas_opcionais_aceitas: Number[]
}

class LogUsuarioPoliticas {
    constructor(public log_usuario_politica:iLogUsuarioPoliticas) {}

    async salvarLogUsuarioPoliticas(): Promise<void> {
        const conexaoMongoService = ConexaoMongo;
        try {
            await conexaoMongoService.conectar();

            // Obter o _id do documento inserido em log_politica_privacidade
            const idPoliticaPrivacidade = await this.obterUltimoIdPoliticaPrivacidade();

            const termosCollection = conexaoMongoService.getBancoDados().collection("log_usuario_politica_privacidade");

            // Criar novo log de usuario com a referência ao _id do documento em log_politica_privacidade
            await termosCollection.insertOne(this.log_usuario_politica);
            console.log("Inseriu log_usuario_politicas");

        } finally {
            await conexaoMongoService.desconectar();
        }
    }

    public async obterUltimoIdPoliticaPrivacidade(): Promise<string | null> {
        const conexaoMongoService = ConexaoMongo;
        try {
            await conexaoMongoService.conectar();
            const politicaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");
            const ultimoDocumento = await politicaPrivacidadeCollection.findOne({}, { sort: { data: -1 } });
            return ultimoDocumento ? ultimoDocumento._id.toString() : null;
        } catch (error){
            console.error(error)
        }
        
    }
}

export default LogUsuarioPoliticas;
