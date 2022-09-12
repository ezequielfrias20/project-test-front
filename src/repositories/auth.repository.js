import axios from 'axios';
import { EndpointConfig } from '../config/config';

export default class AuthRepository {
  // Definir el cliente Axios para consumir el servicio
  get ws() {
    const cfg = new EndpointConfig();
    const ws = axios.create({
      baseURL: cfg.URL_DEV
    });
    return ws;
  }

  async login(body) {
    const endpoint = '/login';
    const res = await this.ws.post(endpoint, body);
    return res.data;
  }
}