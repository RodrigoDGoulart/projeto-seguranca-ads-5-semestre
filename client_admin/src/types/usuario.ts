interface Usuario {
  id: number;
  nome: string;
  email: string;
  descricao: string;
};

interface UsuarioContext extends Usuario {
  acceptedTerms: string
}

interface UsuarioLog {
  id_usuario: string;
  nome_usuario: string;
  data: string;
  id_politica_privacidade: string;
}

export type {
  Usuario,
  UsuarioContext,
  UsuarioLog,
}