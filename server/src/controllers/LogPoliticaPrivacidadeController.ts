// LogPoliticaPrivacidadeController.ts

import { Request, Response } from 'express';
import LogPoliticaPrivacidade from '../models/LogPoliticaPrivacidade';

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
}

export default new LogPoliticaPrivacidadeController;
