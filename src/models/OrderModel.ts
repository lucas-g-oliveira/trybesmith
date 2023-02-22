import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IModelAddAndGetAll } from '../interfaces';
import { OrdersType } from '../types';

export default class OrderModel implements IModelAddAndGetAll {
  private connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrdersType[]> {
    const qp1 = 'SELECT o.id AS id, o.user_id AS userId, json_arrayagg(p.id) ';
    const qp2 = 'AS productsIds FROM Trybesmith.orders AS o LEFT JOIN Trybesmith.products AS p ';
    const qp3 = 'ON o.id = p.order_id GROUP BY o.id;';

    const result = await this.connection.execute(`${qp1}${qp2}${qp3}`);
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