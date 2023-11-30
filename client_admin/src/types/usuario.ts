interface Usuario {
  id: number;
  nome: string;
  email: string;
  descricao: string;
};

interface UsuarioContext extends Usuario {
  acceptedTerms: string
}

export type {
  Usuario,
  UsuarioContext
}