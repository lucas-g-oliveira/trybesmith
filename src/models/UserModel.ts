import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IModelAddAndGetOne } from '../interfaces';
import { UserLoginType, UserType } from '../types';

export default class UserModel implements IModelAddAndGetOne {
  private connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getOne(userlogin: UserLoginType): Promise<UserType> {
    const { name, password } = userlogin;
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.users WHERE username = ? AND password = ?',
      [name, password],
    );
    const [user] = result as UserType[];
    return user;
  }

  public async add(user: UserType): Promise<UserType> {
    const { username, password, level, vocation } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users(username, password, level, vocation) VALUES (?, ?, ?, ?)',
      [username, password, level, vocation],
    );

    const [rows] = result;
    
    return { ...user, id: rows.insertId };
  }
}