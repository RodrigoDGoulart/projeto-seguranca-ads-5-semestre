// LogPoliticaPrivacidadeController.ts

import { Request, Response } from 'express';
import LogPoliticaPrivacidade from '../models/LogPoliticaPrivacidade';
import ConexaoMongo from '../models/ConexaoMongo';
import { ObjectId } from "mongodb";

class LogPoliticaPrivacidadeController {
    public async new(req: Request, res: Response) {
        try {
            const { titulo, data, id_politica_privacidade } = req.body;

            // Crie uma instância de LogPoliticaPrivacidade com os dados recebidos
            const logPoliticaPrivacidade = new LogPoliticaPrivacidade(titulo, new Date(data), id_politica_privacidade);

            // Salve os logs de política de privacidade e obtenha o _id
            const idPoliticaPrivacidade = await logPoliticaPrivacidade.salvarLogPoliticaPrivacidade();

            res.status(200).json({ message: 'Log de Política de Privacidade salvo com sucesso.', id_politica_privacidade: idPoliticaPrivacidade });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar o Log da Política de Privacidade.' });
        }
    }

    public async getAllPoliticaPrivacidade(req: Request, res: Response){
        try {
            const conexaoMongoService = ConexaoMongo;
            const { id } = req.query;
            await conexaoMongoService.conectar();
            const politicaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");
            if (id){
                const documentoEncontrado = await politicaPrivacidadeCollection.findOne({ _id: new ObjectId(id as string) })
                if (!documentoEncontrado) {
                    res.status(404).json({message: "Nada foi encontrado."});
                    return;
                }
                res.json(documentoEncontrado)
            
            } else {
                const todosDocumentos = await politicaPrivacidadeCollection.find({}).toArray();
                res.json(todosDocumentos)
            }
        
        } catch (error){
            console.error("Erro:", error);
            res.status(500).json({"message": "Erro interno do servidor."});
        
        } finally {
            await ConexaoMongo.desconectar()
    }};
}

export default new LogPoliticaPrivacidadeController;
