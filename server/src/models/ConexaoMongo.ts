import { MongoClient, Db } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

class ConexaoMongoService {
    private client: MongoClient;
    private db: Db;

    constructor() {
        this.client = new MongoClient(process.env.DB_CONN_STRING);
    }

    async conectar(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db();
            console.log('conectou no banco de dados')
        } catch (e) {
            console.error(e);
            console.log('deu erro fio', e)
        }
    }

    async desconectar(): Promise<void> {
        await this.client.close();
    }

    getClienteMongo(): MongoClient {
        return this.client;
    }

    getBancoDados(): Db {
        return this.db;
    }
}

export default new ConexaoMongoService();
