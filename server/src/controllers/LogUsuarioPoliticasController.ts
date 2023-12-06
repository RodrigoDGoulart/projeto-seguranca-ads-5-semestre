// LogUsuarioPoliticasController.ts

import { Request, Response } from 'express';
import LogUsuarioPoliticas from '../models/LogUsuarioPoliticas';
import ConexaoMongo from '../models/ConexaoMongo';
import AppDataSource from '../data-source';
import { Usuario } from '../entities/Usuario';

class LogUsuarioPoliticasController {
    public async new(req: Request, res: Response) {
        try {
            const { id_usuario, data, id_politica_privacidade } = req.body;

            const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: id_usuario })
            if (!usuario){
                return res.json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'})
            }
            usuario.id_politica_privacidade = id_politica_privacidade
            
            // Crie uma instância de LogUsuarioPoliticas com os dados recebidos
            const logUsuarioPoliticas = new LogUsuarioPoliticas(id_usuario, new Date(data), id_politica_privacidade, usuario.email);

            // Salve o log do usuário de políticas usando o último _id do log de política de privacidade
            await logUsuarioPoliticas.salvarLogUsuarioPoliticas();
            await AppDataSource.manager.save(Usuario, usuario)
            
            res.status(200).json({ message: 'Logs do Usuário de Políticas salvos com sucesso.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar os Logs das Políticas aceitas pelo Usuario.' });
        }
    }

    public async get(req: Request, res: Response){
        try {
            const conexaoMongoService = ConexaoMongo;
            await conexaoMongoService.conectar();
            const usuarioPoliticaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_usuario_politica_privacidade");
            const todosUsers = await usuarioPoliticaPrivacidadeCollection.find({}).toArray();
            return res.json(todosUsers)
            
        } catch (error){
            console.error("Erro:", error);
            res.status(500).json({"message": "Erro interno do servidor."});
        
        } finally {
            await ConexaoMongo.desconectar()
    }};


}

export default new LogUsuarioPoliticasController;
