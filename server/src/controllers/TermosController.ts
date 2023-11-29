// routes.ts
import { Request, Response } from 'express';
import Termos from '../models/Termos';

class TermosController{
    public async new(req: Request, res: Response){
        try {
            const { id_usuario, data } = req.body;

            // Crie uma instância de Termos com os dados recebidos
            const termos = new Termos(id_usuario, new Date(data));

            // Salve os termos
            await termos.salvarTermos();

            res.status(200).json({ message: 'Termos salvos com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar os termos.' });
        }
    }
}

export default new TermosController;
