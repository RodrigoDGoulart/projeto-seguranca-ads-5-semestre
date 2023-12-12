import axios, { AxiosInstance } from "axios";

class Api {
  private url = 'http://localhost:8080';

  public request: AxiosInstance = axios.create({
    baseURL: this.url,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  public setToken(token: string | null) {
    this.request.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();