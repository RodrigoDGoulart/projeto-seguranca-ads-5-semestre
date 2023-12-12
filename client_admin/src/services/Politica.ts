import { Politica as PoliticaType } from "../types/politica";
import { UsuarioLog } from "../types/usuario";
import api from "./api";

interface PolicyForm {
  titulo: string;
  politicas: {
    obrigatorio: string,
    opcionais: {
      index: number,
      titulo: string,
      conteudo: string
    }[]
  }
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
    console.log({...info, data: dia})
    return data;
  }

  async getUsuarioLog (): Promise<UsuarioLog[]> {
    const { data } = await api.request.get('/policies/user');
    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Politica();