import express from "express";
import { Request } from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import routes from './routes';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));