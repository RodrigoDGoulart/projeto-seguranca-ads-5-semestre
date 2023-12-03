import { Request, Response } from "express";
import ConexaoMongo from "../models/ConexaoMongo";
import AppDataSource from "../data-source";
import { Usuario } from "../entities/Usuario";


class BackupController {
  public async createBackup(req: Request, res: Response) {
    // requisição p/ elephantsql criar backup

  }

  public async createBackupCallback(req: Request, res: Response) {
    // limpar logs

  }

  public async restoreBackup(req: Request, res: Response) {
    // requisição p/ elephantsql p/ restaurar último backup
  }

  public async restoreBackupCallback(req: Request, res: Response) {
    const conexao_mongodb = ConexaoMongo;
    await conexao_mongodb.conectar();

    try {
      // leitura log usuarios criados
      const usuariosCriados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_criado');
      const usuariosCriados = await usuariosCriados_collection.find().toArray();
  
      // criar usuarios no banco
      await AppDataSource.manager.save(Usuario, usuariosCriados.map(user => {
        const usuario = new Usuario();
        usuario.descricao = user.descricao,
        usuario.nome = user.nome,
        usuario.email = user.email,
        usuario.senha = user.senha,
        usuario.dataCriacao = user.dataCriacao
  
        return usuario;
      }));

      // leitura log usuarios editados
      const usuariosEditados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_editado');
      const usuariosEditados = await usuariosEditados_collection.find().toArray();

      // editar usuarios no banco
      await AppDataSource.manager.save(Usuario, usuariosEditados.map(user => {
        const usuario = new Usuario();
        usuario.id = user.id,
        usuario.descricao = user.descricao,
        usuario.nome = user.nome,
        usuario.email = user.email
  
        return usuario;
      }));

      // leitura log usuarios excluídos
      const usuariosExcluidos_collection = conexao_mongodb.getBancoDados().collection('log_usuario_excluido');
      const usuariosExcluidos = await usuariosExcluidos_collection.find().toArray();

      // excluir usuarios no banco
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Usuario)
        .where("id IN (:...ids)", {ids: usuariosExcluidos.map(item => item.id_usuario)})
        .execute();
    } catch (e) {
      return res.status(500).json({ error: "Erro no servidor", errorCode: "500-server-error", details: { ...e } });
    } finally {
      conexao_mongodb.desconectar();
      return res.sendStatus(200);
    }
  }

  public async getLastBackup (req: Request, res: Response) {
    res.sendStatus(200);
  }
}

export default new BackupController();