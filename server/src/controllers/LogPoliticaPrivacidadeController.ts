// LogPoliticaPrivacidadeController.ts

import { Request, Response } from 'express';
import LogPoliticaPrivacidade from '../models/LogPoliticaPrivacidade';
import ConexaoMongo from '../models/ConexaoMongo';
import { ObjectId } from "mongodb";

class LogPoliticaPrivacidadeController {
    public async new(req: Request, res: Response) {
        try {
            const { titulo, data, politicas } = req.body;

            // Crie uma instância de LogPoliticaPrivacidade com os dados recebidos
            const logPoliticaPrivacidade = new LogPoliticaPrivacidade({titulo, data:new Date(data), politicas});

            // Salve os logs de política de privacidade e obtenha o _id
            const idPoliticaPrivacidade = await logPoliticaPrivacidade.salvarLogPoliticaPrivacidade();

            res.status(200).json({ message: 'Log de Política de Privacidade salvo com sucesso.', politica_privacidade: idPoliticaPrivacidade });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar o Log da Política de Privacidade.' });
        }
    }

    public async getAllPoliticaPrivacidade(req: Request, res: Response){
        try {
            const conexaoMongoService = ConexaoMongo;
            await conexaoMongoService.conectar();
            const politicaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");
            const todosDocumentos = await politicaPrivacidadeCollection.find({}).sort({ data: -1 }).toArray();
            return res.json(todosDocumentos)
            
        } catch (error){
            console.error("Erro:", error);
            res.status(500).json({"message": "Erro interno do servidor."});
        
        } finally {
            await ConexaoMongo.desconectar()
    }};

    public async getPoliticaPrivacidade(req: Request, res: Response){
        try{
            const conexaoMongoService = ConexaoMongo;
            const { id } = req.query;
            await conexaoMongoService.conectar();
            const politicaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");
            if (!id) {
                const documentoRecente = await politicaPrivacidadeCollection.find({}).sort({ data : -1 }).toArray();
                return res.status(200).json(documentoRecente[0]);

            } else {
                const documentoEncontrado = await politicaPrivacidadeCollection.findOne({ _id: new ObjectId(id as string)})
                return res.status(200).json(documentoEncontrado)
            }
            
        } catch (error){
            return res.status(500).json({"message":"Erro interno do servidor"})

        }
    };
}

export default new LogPoliticaPrivacidadeController;
