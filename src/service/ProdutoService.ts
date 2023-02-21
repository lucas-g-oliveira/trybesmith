import ProductModel from '../models/ProductModel';
import { ProductType } from '../types';

export default class ProductService {
  private model:ProductModel;

  constructor(model: ProductModel) {
    this.model = model;
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