import { ObjectId } from "mongodb";
import ConexaoMongo from "./ConexaoMongo";

class Termos {
    constructor(public id_usuario: number, public data: Date, public id?: ObjectId) {}

    async salvarTermos(): Promise<void> {
        const conexaoMongoService = ConexaoMongo;

        try {
            await conexaoMongoService.conectar();
            console.log("conectou")
            const termosCollection = conexaoMongoService.getBancoDados().collection("termos");
            if (this.id) {
                // Atualizar termos existentes
                await termosCollection.updateOne({ _id: this.id }, { $set: { id_usuario: this.id_usuario, data: this.data } });
            } else {
                // Criar novos termos
                await termosCollection.insertOne({ id_usuario: this.id_usuario, data: this.data });
                console.log("inseriu")
            }
        } finally {
            await conexaoMongoService.desconectar();
        }
    }
}

export default Termos
