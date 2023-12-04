import { Response, Request } from "express";
import * as dotenv from 'dotenv';
import { generateToken } from "../middlewares/generateToken";

dotenv.config();

class AdminController {
  public async auth(req: Request, res: Response) {
    const { usuario, senha } = req.body;

    if (usuario !== process.env.ADMIN_USER) {
      return res.status(401).json({ error: "Usuário incorreto.", errorCode: "401-invalid-user"});
    }
    if (senha !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Senha incorreta.", errorCode: "401-invalid-password"});
    }

    const token = await generateToken({id: -1, isAdmin: true});
    return res.status(200).json({ token });
  }
}

export default new AdminController();