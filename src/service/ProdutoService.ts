import ProductModel from '../models/ProductModel';
import { ProductType } from '../types';
import connection from '../models/connection';

export default class ProductService {
  private model:ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll() {
    const data = await this.model.getAll();
    return { type: null, data };
  }

  public async getById(id:number) {
    const data = await this.model.getById(id);
    return { type: null, data };
  } 

  public async addWithOrderId(producs: ProductType) {
    const data = await this.model.addWithOrderId(producs);
    return { type: null, data };
  } 

  public async add(producs: ProductType) {
    const data = await this.model.add(producs);
    return { type: null, data };
  } 

  public async update(idOrder:number, idProduct:number) {
    const data = await this.model.update(idOrder, idProduct);
    return { type: null, data };
  } 
}