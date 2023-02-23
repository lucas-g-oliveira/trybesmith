import JWTOKEN from '../JWTOKEN';
import connection from '../models/connection';
import UserModel from '../models/UserModel';
import { UserLoginType, UserType } from '../types';

export default class UserService {
  private model:UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async get(user:UserLoginType) {
    const data = await this.model.getOne(user);
    if (!data) return { type: 'NOT FOUND', data: 'Username or password invalid' };
    const token = JWTOKEN.encript({ username: user.username, id: data.id });
    return { type: null, data: { token } };
  }

  public async add(user:UserType) {
    const data = await this.model.add(user);
    return { type: null, data };
  }
}