import api from "./api";
import { Usuario as UsuarioType } from '../types';

interface UsuarioInput {
  nome: string;
  email: string;
  senha: string;
}

class Usuario {
  async criar(usuario: UsuarioInput) {

  };

  async getUsuarios(): Promise<UsuarioType[]> {
    const { data } = await api.get('/usuario');
    return data.usuarios as UsuarioType[];
  }

  async login(login: {email: string; senha: string}) {
    console.log(login);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Usuario();