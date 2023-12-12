import { Politica as PoliticaType } from "../types/termo";
import api from "./api";

class Termo {
  async getLastTerm(): Promise<PoliticaType> {
    const { data } = await api.request.get('admin/policies/get');
    console.log(data)
    return data;
  }

  async agreeNewTerms(id: number, politica_id: string, politicas_opcionais_aceitas: number[]) {
    const { data } = await api.request.post('admin/policies/user', {
      id_usuario: id,
      data: new Date().toISOString(),
      id_politica_privacidade: politica_id,
      politicas_opcionais_aceitas
    });
    console.log(data);
    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Termo();