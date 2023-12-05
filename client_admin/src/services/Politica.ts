import { PoliticaItem as PoliticaItemType, Politica as PoliticaType } from "../types/politica";
import { UsuarioLog } from "../types/usuario";
import api from "./api";

interface PolicyForm {
  titulo: string;
  politica_privacidade: string;
}

class Politica {
  async getPoliticas(): Promise<PoliticaType[]> {
    const { data } = await api.request.get('/policies');
    console.log(data)
    return data;
  }

  async getPolitica(id: string): Promise<PoliticaType> {
    const { data } = await api.request.get(`/policies?id=${id}`);
    return data;
  }

  async getLastPolitica(): Promise<PoliticaType> {
    const { data } = await api.request.get('/policies/get');
    return data;
  }

  async updatePolitica (info: PolicyForm) {
    const dia = new Date().toISOString();
    const { data } = await api.request.post('/policies', {...info, data: dia});
    return data;
  }

  async getUsuarioLog (): Promise<UsuarioLog[]> {
    const lista:UsuarioLog[] = [
      {id_usuario: '123', data: new Date().toISOString(), nome_usuario: 'Fulano1'},
      {id_usuario: '123456', data: new Date().toISOString(), nome_usuario: 'Fulano2'},
      {id_usuario: '123789', data: new Date().toISOString(), nome_usuario: 'Fulano3'},
      {id_usuario: '123123', data: new Date().toISOString(), nome_usuario: 'Fulano4'},
    ]
    return lista;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Politica();