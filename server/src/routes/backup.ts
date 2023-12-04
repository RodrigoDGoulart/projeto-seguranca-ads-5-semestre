import { Router } from "express";
import BackupController from "../controllers/BackupController";
import tokenValidation from "../middlewares/tokenValidation";

const routes = Router();

routes.post('/create', tokenValidation.adminUserVerification,BackupController.createBackup);

routes.post('/restore', tokenValidation.adminUserVerification,BackupController.restoreBackup);

routes.post('/create/callback', BackupController.createBackupCallback);

routes.post('/restore/callback', BackupController.restoreBackupCallback);

routes.get('/', tokenValidation.adminUserVerification, BackupController.getLastBackup);

export default routes;