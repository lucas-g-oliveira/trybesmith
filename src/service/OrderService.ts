import JWTOKEN from '../JWTOKEN';
import connection from '../models/connection';
import OrderModel from '../models/OrderModel';
import { OrdersType } from '../types';

export default class OrderService {
  private model:OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll() {
    const data = await this.model.getAll();
    return { type: null, data };
  }

  public async add(order:OrdersType, authorization:undefined) {
    const { id, username } = JWTOKEN.decript(authorization);
    if (id) {
      console.log({ ...order, userId: id });
      await this.model.add({ ...order, userId: id });
    }
    return { type: username, data: 'invalid' };
  }
}