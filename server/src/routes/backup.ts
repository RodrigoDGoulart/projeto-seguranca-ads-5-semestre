import { Router } from "express";
import BackupController from "../controllers/BackupController";

const routes = Router();

routes.post('/create', BackupController.createBackup);

routes.post('/restore', BackupController.restoreBackup);

routes.post('/create/callback', BackupController.createBackupCallback);

routes.post('/restore/callback', BackupController.restoreBackupCallback);

routes.get('/', BackupController.getLastBackup);

export default routes;