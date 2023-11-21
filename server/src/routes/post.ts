import { Router } from "express";
import PostController from "../controllers/PostController";

const routes = Router();

routes.post('/', PostController.new);

routes.get('/', PostController.get);

routes.put('/:id', PostController.update);

routes.delete('/:id', PostController.delete);

export default routes;