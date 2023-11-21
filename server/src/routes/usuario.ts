import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const routes = Router();

routes.post('/', UsuarioController.new);

routes.get('/', UsuarioController.get);

routes.get('/:id', UsuarioController.getById);

routes.put('/:id', UsuarioController.update);

routes.delete('/:id', UsuarioController.delete);

export default routes;