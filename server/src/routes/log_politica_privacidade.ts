import { Router } from "express";
import LogPoliticaPrivacidade from "../controllers/LogPoliticaPrivacidadeController";
import LogUsuarioPolitica from "../controllers/LogUsuarioPoliticasController";

const routes = Router();

routes.get('/', LogPoliticaPrivacidade.getAllPoliticaPrivacidade)
routes.post('/', LogPoliticaPrivacidade.new);
routes.get('/get', LogPoliticaPrivacidade.getPoliticaPrivacidade)
routes.post('/user', LogUsuarioPolitica.new)
routes.get('/user', LogUsuarioPolitica.get)
export default routes;