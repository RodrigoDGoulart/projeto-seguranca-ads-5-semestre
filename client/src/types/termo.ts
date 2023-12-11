interface Termo {
  id: string;
  termo: string;
  data: string;
}

interface Politica {
  _id: string;
  titulo: string;
  politica_privacidade: string;
  data: string;
}

export type {
  Termo,
  Politica
}