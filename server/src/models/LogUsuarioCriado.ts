import ConexaoMongo from "./ConexaoMongo";

class LogUsuarioCriado {
  constructor(
    public nome: String,
    public email: String,
    public senha: String,
    public descricao: String,
    public dataCriacao: Date,
    public id_politica_privacidade: String,
    public politicas_opcionais_aceitas: Number[]
  ) { }

  async save(): Promise<void> {
    const conexaoMongoService = ConexaoMongo;

    try {
      await conexaoMongoService.conectar();
      console.log("conectou")
      const logCollection = conexaoMongoService.getBancoDados().collection("log_usuario_criado");
      await logCollection.insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        descricao: this.descricao,
        dataCriacao: this.dataCriacao,
        id_politica_privacidade: this.id_politica_privacidade,
        politicas_opcionais_aceitas: this.politicas_opcionais_aceitas
      })
    } finally {
      await conexaoMongoService.desconectar();
    }
  }
}

export default LogUsuarioCriado
