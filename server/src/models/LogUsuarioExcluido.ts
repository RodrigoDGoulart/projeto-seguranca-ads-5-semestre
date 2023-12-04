import ConexaoMongo from "./ConexaoMongo";

class LogUsuarioExcluido {
  constructor(
    public id_usuario: Number,
  ) { }

  async save(): Promise<void> {
    const conexaoMongoService = ConexaoMongo;

    try {
      await conexaoMongoService.conectar();
      console.log("conectou")
      const logCollection = conexaoMongoService.getBancoDados().collection("log_usuario_excluido");
      await logCollection.insertOne({
        id_usuario: this.id_usuario,
      })
    } finally {
      await conexaoMongoService.desconectar();
    }
  }
}

export default LogUsuarioExcluido
