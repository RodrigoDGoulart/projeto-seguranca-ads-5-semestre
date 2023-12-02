import { Router } from "express";
import LogUsuarioPoliticas from "../controllers/LogUsuarioPoliticasController";

const routes = Router();

routes.post('/salvar-log-usuario', LogUsuarioPoliticas.new);


export default routes;