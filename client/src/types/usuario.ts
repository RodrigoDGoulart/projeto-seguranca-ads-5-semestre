interface Usuario {
  id: number;
  nome: string;
  email: string;
  descricao: string;
};

interface UsuarioItem {
  id: number;
  nome: string;
  email: string;
}

interface UsuarioInfoContext extends Usuario {
  acceptedTerms: string;
}

interface UsuarioContext {
  usuario: UsuarioInfoContext;
  token: string;
}

export type {
  Usuario,
  UsuarioContext,
  UsuarioItem
}