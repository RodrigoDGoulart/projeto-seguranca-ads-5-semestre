import { Request, Response } from "express";

import ConexaoMongo from "../models/ConexaoMongo";

import AppDataSource from "../data-source";
import { Usuario } from "../entities/Usuario";

import elephantSqlApi from "../utils/elephantSqlApi";

class BackupController {
  public async createBackup(req: Request, res: Response) {
    // requisição p/ elephantsql criar backup
    const retorno = await elephantSqlApi.createBackup();
    try {
      if (retorno.code !== 200) {
        return res.status(500).json({
          error: 'Erro desconhecido',
          errorCode: '500-unkown-error',
          details: { ...retorno.data }
        });
      } else {
        return res.sendStatus(200);
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Erro no servidor',
        errorCode: '500-server-error',
        details: { ...e },
      });
    }
  }

  public async createBackupCallback(req: Request, res: Response) {
    const conexao_mongodb = ConexaoMongo;
    await conexao_mongodb.conectar();

    try {
      // leitura log usuarios criados
      const usuariosCriados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_criado');
      const usuariosEditados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_editado');
      const usuariosExcluidos_collection = conexao_mongodb.getBancoDados().collection('log_usuario_excluido');

      // limpar logs
      await usuariosCriados_collection.deleteMany({});
      await usuariosEditados_collection.deleteMany({});
      await usuariosExcluidos_collection.deleteMany({});
    } catch (e) {
      return res.status(500).json({ error: "Erro no servidor", errorCode: "500-server-error", details: { ...e } });
    } finally {
      conexao_mongodb.desconectar();
      return res.sendStatus(200);
    }
  }

  public async restoreBackup(req: Request, res: Response) {
    // requisição p/ elephantsql p/ restaurar último backup
    try {
      const backups = await elephantSqlApi.getBackups();
      const backup = backups[0];

      const retorno = await elephantSqlApi.restore(backup.id);
      if (retorno.code !== 200) {
        return res.status(500).json({
          error: 'Erro desconhecido',
          errorCode: '500-unkown-error',
          details: { ...retorno.data }
        });
      } else {
        return res.sendStatus(200);
      }
    } catch (e) {
      return res.status(500).json({ error: "Erro no servidor", errorCode: "500-server-error", details: { ...e } });
    }
  }

  public async restoreBackupCallback(req: Request, res: Response) {
    const conexao_mongodb = ConexaoMongo;
    await conexao_mongodb.conectar();

    try {
      // leitura log usuarios criados
      const usuariosCriados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_criado');
      const usuariosCriados = await usuariosCriados_collection.find().toArray();
      if (usuariosCriados.length){

        // criar usuarios no banco
        await AppDataSource.manager.save(Usuario, usuariosCriados.map(user => {
          const usuario = new Usuario();
          usuario.descricao = user.descricao;
          usuario.nome = user.nome;
          usuario.email = user.email;
          usuario.senha = user.senha;
          usuario.dataCriacao = user.dataCriacao;
  
          return usuario;
        }));

      }

      // leitura log usuarios editados
      const usuariosEditados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_editado');
      const usuariosEditados = await usuariosEditados_collection.find().toArray();
      
      if (usuariosCriados.length){

        // editar usuarios no banco
        await AppDataSource.manager.save(Usuario, usuariosEditados.map(user => {
          const usuario = new Usuario();
          usuario.id = user.id;
          usuario.descricao = user.descricao;
          usuario.nome = user.nome;
          usuario.email = user.email;
  
          return usuario;
        }));

      }

      // leitura log usuarios excluídos
      const usuariosExcluidos_collection = conexao_mongodb.getBancoDados().collection('log_usuario_excluido');
      const usuariosExcluidos = await usuariosExcluidos_collection.find().toArray();

      if(usuariosExcluidos.length) {
        // excluir usuarios no banco
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Usuario)
          .where("id IN (:...ids)", { ids: usuariosExcluidos.map(item => item.id_usuario) })
          .execute();
      }
      conexao_mongodb.desconectar();
      console.log("Restore do Banco de Dados feito com Sucesso!")
      return res.sendStatus(200);
    } catch (e) {
      return res.status(500).json({ error: "Erro no servidor", errorCode: "500-server-error", details: { ...e } });
    } 
  }

  public async getLastBackup(req: Request, res: Response) {
    try {
      const backups = await elephantSqlApi.getBackups();
      const backup = backups[0];

      const conexao_mongodb = ConexaoMongo;
      await conexao_mongodb.conectar();

      const usuariosCriados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_criado');
      const usuariosEditados_collection = conexao_mongodb.getBancoDados().collection('log_usuario_editado');
      const usuariosExcluidos_collection = conexao_mongodb.getBancoDados().collection('log_usuario_excluido');
      
      const usuariosCriados = await usuariosCriados_collection.find().toArray();
      const usuariosEditados = await usuariosEditados_collection.find().toArray();
      const usuariosExcluidos = await usuariosExcluidos_collection.find().toArray();

      await conexao_mongodb.desconectar();

      return res.status(200).json({
        backup,
        usuarios_criados: usuariosCriados.length,
        usuarios_editados: usuariosEditados.length,
        usuariosExcluidos: usuariosExcluidos.length,
      });
    } catch (e) {
      return res.status(500).json({ error: "Erro no servidor", errorCode: "500-server-error", details: { ...e } });
    }
  }
}

export default new BackupController();