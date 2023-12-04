import { Router, Request, Response } from "express";
import usuario from './usuario';
import log_politica_provacidade from './log_politica_privacidade'
import backup from './backup';
import admin from './admin';

const routes = Router();

routes.use('/usuario', usuario);
routes.use('/admin/policies', log_politica_provacidade)
routes.use('/admin/auth', admin)
routes.use('/admin/backup', backup);

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;