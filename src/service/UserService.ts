import UserModel from '../models/UserModel';
import { UserLoginType, UserType } from '../types';

export default class UserService {
  private model:UserModel;

  constructor(model:UserModel) {
    this.model = model;
  }

  public async get(user:UserLoginType) {
    const data = await this.model.getOne(user);
    return { type: null, data };
  }

  public async add(user:UserType) {
    const data = await this.model.add(user);
    return { type: null, data };
  }
}