import { Router } from "express";
import AdminController from "../controllers/AdminController";

const routes = Router();

routes.post('/', AdminController.auth);

export default routes;