import { ErrorResponse } from "react-router-dom";
import api from "./api";

class Admin {
  async auth(auth: {usuario: string, senha: string}): Promise<{token: string} | ErrorResponse> {
    const retorno = api.request.post('/auth', auth)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        return e.response.data;
      });

    return retorno;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Admin();