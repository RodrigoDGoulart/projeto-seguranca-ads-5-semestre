import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";
import AppDataSource from "../data-source";
import encryptPassword from "../utils/encryptPassword";
import LogUsuarioCriado from "../models/LogUsuarioCriado";
import LogUsuarioEditado from "../models/LogUsuarioEditado";
import LogUsuarioExcluido from "../models/LogUsuarioExcluido";
import * as bcrypt from 'bcrypt';
import { generateToken } from "../middlewares/generateToken";

class UsuarioController {
  public async new(req: Request, res: Response) {
    const { nome, email, senha, descricao } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos incompletos ou não informados.", errorCode: "400-undefined-fields" });
    }

    const obj = new Usuario();
    obj.email = email;
    obj.nome = nome;
    obj.senha = await encryptPassword(senha);
    obj.descricao = descricao || '';

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
      const log = new LogUsuarioCriado(
        obj.nome,
        obj.email,
        obj.senha,
        obj.descricao,
        obj.dataCriacao
      );
      await log.save();
      
      const token = await generateToken({id: usuario.id, isAdmin: false});

      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          descricao: usuario.descricao,
          dataCriacao: usuario.dataCriacao,
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

    if (email) {
      const emailVerify = await AppDataSource.manager.findBy(Usuario, { email });
      if (emailVerify.length) {
        return res.status(400).json({ error: 'E-mail já cadastrado.', errorCode: '400-already-email' });
      }
    }

    try {
      const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })

      if (!usuario) {
        return res.json({ error: "Usuário não encontrado", errorCode: '404-user-not-found'})
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