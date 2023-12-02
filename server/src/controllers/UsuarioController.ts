import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";
import AppDataSource from "../data-source";
import encryptPassword from "../utils/encryptPassword";
import LogUsuarioCriado from "../models/LogUsuarioCriado";

class UsuarioController {
  public async new(req: Request, res: Response) {
    const { nome, email, senha, descricao } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos incompletos ou não informados." });
    }

    const obj = new Usuario();
    obj.email = email;
    obj.nome = nome;
    obj.senha = await encryptPassword(senha);
    obj.descricao = descricao || '';

    const usuario: any = await AppDataSource.manager.save(Usuario, obj).catch(e => {
      if (e.code === '23505') {
        return { error: 'E-mail já existe' };
      }
      return { error: e.message }
    });

    if (usuario.error) {
      return res.status(400).json({ error: usuario.error });
    } else {
      const log = new LogUsuarioCriado(
        obj.nome,
        obj.email,
        obj.senha,
        obj.descricao,
        obj.dataCriacao
      );
      await log.save();
      return res.json({ usuario });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.json({ error: "Identificador inválido." });
    }

    const { nome, email, senha } = req.body;

    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })
      .catch(e => {
        return res.json({ error: "Usuário não encontrado." });
      });

    if (usuario && usuario.id) {
      if (nome) {
        usuario.nome = nome;
      }
      if (email) {
        usuario.email = email;
      }
      if (senha) {
        usuario.senha = senha;
      }

      const r = await AppDataSource.manager.save(Usuario, usuario)
        .catch(e => {
          if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
            return ({ error: 'nome já existe' });
          }
          return ({ error: e.message });
        });

      if (r.error) {
        return res.status(400).json(r);
      }

      return res.json(r);
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })
      .catch(e => {
        return res.json({ error: "Usuário não encontrado." });
      });

    if (!usuario) {
      return res.json({ error: "Usuário não encontrado." });
    }

    if (usuario && usuario.id) {
      const r = await AppDataSource.manager.delete(Usuario, { id: Number(id) })
        .catch(e => {
          return res.json({ error: e.message });
        });

      return res.json(r);
    }
  }

  public async get(req: Request, res: Response) {
    const r = await AppDataSource.manager.find(Usuario);

    return res.json({ usuarios: r });
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.json({ error: "Identificador inválido." });
    }

    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: Number(id) })
    .catch(e => {
      return res.json({ error: "Usuário não encontrado." });;
    });

    if (!usuario) {
      return res.json({ error: "Usuário não encontrado." });
    }

    return res.json(usuario);
  }
}

export default new UsuarioController();