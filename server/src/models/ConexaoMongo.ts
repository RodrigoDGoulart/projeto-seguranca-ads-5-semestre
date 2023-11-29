import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://francisco:asterisk@fatec.rixvtrs.mongodb.net/lgpd?retryWrites=true&w=majority";

class ConexaoMongoService {
    private client: MongoClient;
    private db: Db;

    constructor() {
        this.client = new MongoClient(uri);
    }

    async conectar(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db();
        } catch (e) {
            console.error(e);
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
