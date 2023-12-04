import ConexaoMongo from "./ConexaoMongo";

class LogUsuarioEditado {
  constructor(
    public id: Number,
    public nome: String,
    public email: String,
    public descricao: String,
  ) { }

  async save(): Promise<void> {
    const conexaoMongoService = ConexaoMongo;

    try {
      await conexaoMongoService.conectar();
      console.log("conectou")
      const logCollection = conexaoMongoService.getBancoDados().collection("log_usuario_editado");
      await logCollection.insertOne({
        id: this.id,
        nome: this.nome,
        email: this.email,
        descricao: this.descricao,
      })
    } finally {
      await conexaoMongoService.desconectar();
    }
  }
}

export default LogUsuarioEditado
