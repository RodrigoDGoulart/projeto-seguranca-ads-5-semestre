interface PoliticaItem {
  id: string;
  titulo: string;
  data: string;
}
interface Politica {
  id: string;
  titulo: string;
  texto: string;
  data: string;
}

export type {
  Politica,
  PoliticaItem,
}