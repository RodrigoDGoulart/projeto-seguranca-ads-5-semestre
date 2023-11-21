import { Router, Request, Response } from "express";
import usuario from './usuario';

const routes = Router();

routes.use('/usuario', usuario);

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;