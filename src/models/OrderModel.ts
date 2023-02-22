import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IModelAddAndGetAll } from '../interfaces';
import { OrdersType } from '../types';

export default class OrderModel implements IModelAddAndGetAll {
  private connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrdersType[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.orders');
    const [rows] = result;
    return rows as OrdersType[];
  }

  public async add(order: OrdersType): Promise<OrdersType> {
    const { userId, id } = order;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders(name, amount) VALUES (?, ?)',
      [id, userId],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...order };
  }
}