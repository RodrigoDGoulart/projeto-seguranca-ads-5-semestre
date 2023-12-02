import { Router } from "express";
import LogPoliticaPrivacidade from "../controllers/LogPoliticaPrivacidadeController";

const routes = Router();

routes.post('/salvar-log-politica', LogPoliticaPrivacidade.new);
routes.get('/get', LogPoliticaPrivacidade.getAllPoliticaPrivacidade)

export default routes;