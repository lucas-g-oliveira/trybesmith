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

  public async getById(id:number):Promise<ProductType> {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.products WHERE id = ?', [id]);
    const [data] = result as ProductType[];
    return data as ProductType;
  }

  // add
  public async add(product: ProductType): Promise<ProductType> {
    const { name, amount } = product;
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products(name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  // addPlus
  public async addWithOrderId(product:ProductType):Promise<ProductType> {
    const arr = Object.keys(product);
    const key = arr.join(', ');
    const char = arr.map(() => '?').join(', ');
    const result = await this.connection
      .execute<ResultSetHeader>(`INSERT INTO Trybesmith.products (${key}) VALUES (${char})`, arr);

    const [data] = result;
    return { ...product, id: data.insertId } as ProductType;
  }

  // set
  public async update(idOrder:number, idProduct:number):Promise<ProductType> {
    await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.products SET order_id = ? WHERE id = ?',
      [idOrder, idProduct],
    );
    const devol = await this.getById(idProduct);
    return devol;
  }
}