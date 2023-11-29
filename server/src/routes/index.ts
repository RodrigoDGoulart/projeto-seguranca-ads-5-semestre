import { Router, Request, Response } from "express";
import usuario from './usuario';
import termos from './termos';

const routes = Router();

routes.use('/usuario', usuario);
routes.use('/termos', termos)

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;