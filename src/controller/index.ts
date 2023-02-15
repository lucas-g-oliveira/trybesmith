import { Request, Response } from 'express';
import ProductService from '../service';
import statusCodes from './statusCode';

class ProductControler {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.CREATED).json(products);
  };
}

export default ProductControler;
