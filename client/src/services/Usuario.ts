import { ErrorResponse } from '../types/api';
import { Usuario as UsuarioType, UsuarioContext, UsuarioItem as UsuarioItemType } from '../types/usuario';
import api from './api';

interface NewUsuarioForm {
  nome: string;
  email: string;
  senha: string;
  descricao: string;
}
interface UsuarioUpdateForm {
  nome: string;
  email: string;
  descricao: string;
}

class Usuario {
  async criar(usuario: NewUsuarioForm): Promise<UsuarioContext | ErrorResponse> {
    const resp = api.request.post('/usuario', usuario)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return e.response.data;
      });
    return resp;
  };

  async getUsuarios(): Promise<UsuarioItemType[]> {
    const { data } = await api.request.get('/usuario');
    return data.usuarios as UsuarioType[];
  }

  async getUsuario(id: number): Promise<UsuarioType> {
    const { data } = await api.request.get(`/usuario/${id}`);
    return data;
  }

  async login(login: {email: string; senha: string}): Promise<UsuarioContext | ErrorResponse> {
    const retorno = api.request.post('/usuario/login', login)
      .then(res => {
        return res.data
      })
      .catch(e => {
        return e.response.data;
      });

    return retorno;
  }

  async delete() {
    await api.request.delete('/usuario');
  }

  async update(usuario: UsuarioUpdateForm) {
    const resp = api.request.put('/usuario', usuario)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return e.response.data;
      });
    return resp;
  }

  async agreeNewTerms(id: number) {
    console.log(id);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Usuario();