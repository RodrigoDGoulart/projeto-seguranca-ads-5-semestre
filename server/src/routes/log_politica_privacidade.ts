import { Router } from "express";
import LogPoliticaPrivacidade from "../controllers/LogPoliticaPrivacidadeController";
import LogUsuarioPolitica from "../controllers/LogUsuarioPoliticasController";
import tokenValidation from "../middlewares/tokenValidation";

const routes = Router();

routes.get('/', tokenValidation.adminUserVerification, LogPoliticaPrivacidade.getAllPoliticaPrivacidade)
routes.post('/', tokenValidation.adminUserVerification, LogPoliticaPrivacidade.new);
routes.get('/get', LogPoliticaPrivacidade.getPoliticaPrivacidade)
routes.post('/user', LogUsuarioPolitica.new)
routes.get('/user', tokenValidation.adminUserVerification, LogUsuarioPolitica.get)
export default routes;