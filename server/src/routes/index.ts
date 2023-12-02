import { Router, Request, Response } from "express";
import usuario from './usuario';

const routes = Router();

routes.use('/usuario', usuario);

routes.post('/test', (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;