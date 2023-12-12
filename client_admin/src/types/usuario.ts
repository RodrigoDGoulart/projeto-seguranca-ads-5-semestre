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
  email_usuario: string;
  data: string;
  id_politica_privacidade: string;
  politicas_opcionais_aceitas: number[]
}

export type {
  Usuario,
  UsuarioContext,
  UsuarioLog,
}