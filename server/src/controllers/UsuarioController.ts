import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";
import AppDataSource from "../data-source";
import encryptPassword from "../utils/encryptPassword";
import LogUsuarioCriado from "../models/LogUsuarioCriado";
import LogUsuarioEditado from "../models/LogUsuarioEditado";
import LogUsuarioExcluido from "../models/LogUsuarioExcluido";
import * as bcrypt from 'bcrypt';
import { generateToken } from "../middlewares/generateToken";
import ConexaoMongo from "../models/ConexaoMongo";
import LogUsuarioPoliticas from "../models/LogUsuarioPoliticas";

class UsuarioController {
  public async new(req: Request, res: Response) {
    const { nome, email, senha, descricao } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos incompletos ou não informados.", errorCode: "400-undefined-fields" });
    }
    const conexaoMongoService = ConexaoMongo;
    await conexaoMongoService.conectar();
    const politicaPrivacidadeCollection = conexaoMongoService.getBancoDados().collection("log_politica_privacidade");
    const ultimoDocumento = await politicaPrivacidadeCollection.findOne({}, { sort: { data: -1 } });
    const id_politica = ultimoDocumento._id.toString()

    const obj = new Usuario();
    obj.email = email;
    obj.nome = nome;
    obj.senha = await encryptPassword(senha);
    obj.descricao = descricao || '';
    obj.id_politica_privacidade = id_politica

    const emailVerify = await AppDataSource.manager.findBy(Usuario, { email });
    if (emailVerify.length) {
      return res.status(400).json({ error: 'E-mail já cadastrado.', errorCode: '400-already-email' });
    }

    const usuario: any = await AppDataSource.manager.save(Usuario, obj)
      .catch(e => {
        return { error: e.message, errorCode: '500-bd-error' }
      });

    if (usuario.error) {
      return res.status(500).json({ ...usuario });
    } else {
      await AppDataSource.manager.save(Usuario, usuario)
      const log = new LogUsuarioCriado(
        obj.nome,
        obj.email,
        obj.senha,
        obj.descricao,
        obj.dataCriacao,
        obj.id_politica_privacidade
      );
      await log.save();

      const logUsuarioPoliticas = new LogUsuarioPoliticas(usuario.id, new Date(), usuario.id_politica_privacidade, usuario.email);
      // Salve o log do usuário de políticas usando o último _id do log de política de privacidade
      await logUsuarioPoliticas.salvarLogUsuarioPoliticas();
      
      const token = await generateToken({id: usuario.id, isAdmin: false});

      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          descricao: usuario.descricao,
          dataCriacao: usuario.dataCriacao,
          id_politica_privacidade: usuario.id_politica_privacidade
        },
        token,
      });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.user;

    if (isNaN(Number(id))) {
      return res.json({ error: "Identificador inválido." });
    }

    const { nome, email, descricao } = req.body;

    try {
      const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'})
      }

      if (email && email !== usuario.email) {
        const emailVerify = await AppDataSource.manager.findBy(Usuario, { email });
        if (emailVerify.length) {
          return res.status(400).json({ error: 'E-mail já cadastrado.', errorCode: '400-already-email' });
        }
      }
      
      if (nome) {
        usuario.nome = nome;
      }
      if (email) {
        usuario.email = email;
      }
      if (descricao) {
        usuario.descricao = descricao;
      }

      const r = await AppDataSource.manager.save(Usuario, usuario)
        .catch(e => {
          return ({ error: e.message, errorCode: '500-bd-error' });
        });

      if (r.error) {
        return res.status(400).json({ ...r });
      } else {
        const log = new LogUsuarioEditado(
          Number(id),
          usuario.nome,
          usuario.email,
          usuario.descricao
        )
        await log.save();

        if (email){
          const conexaoMongoService = ConexaoMongo;
          await conexaoMongoService.conectar();
          const termosCollection = conexaoMongoService.getBancoDados().collection("log_usuario_politica_privacidade");
          await termosCollection.updateMany({ id_usuario : usuario.id }, { email_usuario : email })

        }
        return res.json(r);
      }
    } catch (e) {
      return res.status(500).json({ error: 'Erro desconhecido', errorCode: '500-server-error', details: {...e}});
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.user;

    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })
      .catch(e => {
        return res.status(404).json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'});
      });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'});
    }
    try {
      if (usuario && usuario.id) {
        const r = await AppDataSource.manager.delete(Usuario, { id: Number(id) })
          .catch(e => {
            return res.json({ error: e.message });
          });
          const log = new LogUsuarioExcluido(Number(id));
          await log.save();
          const conexaoMongoService = ConexaoMongo;
          await conexaoMongoService.conectar();
          const termosCollection = conexaoMongoService.getBancoDados().collection("log_usuario_politica_privacidade");
          await termosCollection.deleteMany({id_usuario : usuario.id})

        return res.json(r);
      }
    } catch (e) {
      return res.status(500).json({ error: 'Erro desconhecido', errorCode: '500-server-error', details: {...e}});
    }
  }

  public async get(req: Request, res: Response) {
    const r = await AppDataSource.manager.find(Usuario);

    return res.json({ usuarios: r });
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Identificador inválido.", errorCode: "400-invalid-id" });
    }

    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })
    .catch(e => {
      return res.status(404).json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'});
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'});
    }

    return res.json(usuario);
  }

  public async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Campo email ou senha ausentes ou inválidos.", errorCode: "400-invalid-fields" });
    }

    try {
      const usuario = await AppDataSource.manager.findOneBy(Usuario, { email });
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado", errorCode: "404-user-not-found" });
      }
      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) {
        return res.status(401).json({ error: "Senha inválida", errorCode: "401-incorrect-password" });
      }

      const token = generateToken({id: usuario.id, isAdmin: false});

      return res.status(200).json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          descricao: usuario.descricao,
          dataCriacao: usuario.dataCriacao,
          id_politica_privacidade: usuario.id_politica_privacidade
        },
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Erro do servidor.", errorCode: "500-server-error", details: e.message });
    }
  }
}

export default new UsuarioController();