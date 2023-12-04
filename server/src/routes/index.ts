import { Router, Request, Response } from "express";
import usuario from './usuario';
import log_politica_provacidade from './log_politica_privacidade'

const routes = Router();

routes.use('/usuario', usuario);
routes.use('/admin/policies', log_politica_provacidade)

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;