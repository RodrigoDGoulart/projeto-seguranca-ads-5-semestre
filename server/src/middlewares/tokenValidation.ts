import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

interface User {
  id: number;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

class TokenValidation {
  public anyUserVerification(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido.", errorCode: '401-token-not-found' });
    }

    const tokenWithoutBearer = token.substring("Bearer ".length);
    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        console.log(process.env.SECRET);
        return res.status(401).json({ error: "Token inválido.", errorCode: '401-invalid-token' });
      }

      const user = decoded as User;
      if (user.isAdmin) {
        return res.status(401).json({ 
          error: "Requisição somente para usuário comum",
          errorCode: "401-not-admin"
        });
      }

      req.user = user;
      
      next();
    });
  };

  public adminUserVerification(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido.", errorCode: '401-token-not-found' });
    }
    
    const tokenWithoutBearer = token.substring("Bearer ".length);
    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido.", errorCode: '401-invalid-token' });
      }

      const user = decoded as User;
      if (!user.isAdmin) {
        return res.status(401).json({ error: "Requisição somente para administrador.", errorCode: '401-not-auth' });
      }

      req.user = user;

      next();
    });
  };
}

export default new TokenValidation();