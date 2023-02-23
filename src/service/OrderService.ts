import JWTOKEN from '../JWTOKEN';
import connection from '../models/connection';
import OrderModel from '../models/OrderModel';
// import ProductModel from '../models/ProductModel';
import { OrdersAddType } from '../types';
import ProductService from './ProdutoService';

export default class OrderService {
  private model:OrderModel;

  private prodServ:ProductService;

  constructor() {
    this.model = new OrderModel(connection);
    this.prodServ = new ProductService();
  }

  public async getAll() {
    const data = await this.model.getAll();
    return { type: null, data };
  }

  public async add(order:OrdersAddType, authorization:undefined) {
    const { id, username } = JWTOKEN.decript(authorization);
    const orderSaved = await this.model.add({ userId: id });

    if (orderSaved.id) {
      const updatedProducts = order.productsIds.map(async (e) => {
        await this.prodServ.update(orderSaved.id as number, e);
      });
      Promise.all(updatedProducts);
      return { type: null, data: { ...order, userId: id } };
    }
    return { type: username, data: { ...order, userId: id } };
  }
}