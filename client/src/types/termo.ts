interface Termo {
  id: string;
  termo: string;
  data: string;
}

interface Politica {
  _id: string,
  titulo: string,
  data: string,
  politicas: {
    obrigatorio: string,
    opcionais: [
      {
        index: number,
        titulo: string,
        conteudo: string
      }
    ]
  }
}

export type {
  Termo,
  Politica
}