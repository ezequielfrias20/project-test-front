import axios from 'axios';
import { EndpointConfig } from '../config/config';

export default class BillsRepository {
  // Definir el cliente Axios para consumir el servicio
  get ws() {
    const cfg = new EndpointConfig();
    const ws = axios.create({
      baseURL: cfg.URL_DEV
    });
    return ws;
  }

  async getAllBills(user) {
    const endpoint = `/users/${user.username}/bills`;
    const res = await this.ws.get(endpoint);
    return res.data;
  }

  async getBillById(user, bill_id) {
    const endpoint = `/users/${user.username}/bills/${bill_id}`;
    const res = await this.ws.get(endpoint);
    return res.data;
  }

  async create(body, user) {
    const endpoint = `/users/${user.username}/bills`;
    const res = await this.ws.post(endpoint, body);
    return res;
  }

  async remove(user, bill_id) {
    const endpoint = `/users/${user.username}/bills/${bill_id}`;
    const res = await this.ws.delete(endpoint);
    return res;
  }
}