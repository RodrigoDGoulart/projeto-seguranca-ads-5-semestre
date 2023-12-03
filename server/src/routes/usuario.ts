import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import tokenValidation from "../middlewares/tokenValidation";

const routes = Router();

routes.post('/', UsuarioController.new);

routes.get('/', UsuarioController.get);

routes.put('/', tokenValidation.anyUserVerification, UsuarioController.update);

routes.delete('/', tokenValidation.anyUserVerification, UsuarioController.delete);

routes.post('/login', UsuarioController.login);

routes.get('/:id', UsuarioController.getById);

export default routes;