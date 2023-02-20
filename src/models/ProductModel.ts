import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IModelAddAndGetAll } from '../interfaces';
import { ProductType } from '../types';

export default class ProductModel implements IModelAddAndGetAll {
  private connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ProductType[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.products');
    const [rows] = result;
    return rows as ProductType[];
  }

  public async add(product: ProductType): Promise<ProductType> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products(name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}