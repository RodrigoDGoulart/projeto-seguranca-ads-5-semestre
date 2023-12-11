interface PoliticaItem {
  _id: string;
  titulo: string;
  data: string;
}
interface Politica {
  _id: string;
  titulo: string;
  politica_privacidade: string;
  data: string;
}

export type {
  Politica,
  PoliticaItem,
}