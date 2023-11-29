import { Router } from "express";
import TermosController from "../controllers/TermosController";

const routes = Router();

routes.post('/salvar-termos', TermosController.new);


export default routes;