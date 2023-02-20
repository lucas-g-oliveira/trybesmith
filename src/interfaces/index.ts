import { OrdersType, ProductType, UserLoginType, UserType } from '../types';

export interface IModelAddAndGetAll {
  getAll(): Promise<ProductType[]> | Promise<OrdersType[]>;
  add(data: ProductType | OrdersType): Promise<ProductType> | Promise<OrdersType>;
}

export interface IModelAddAndGetOne {
  getOne(userloguin:UserLoginType):Promise<UserType>;
  add(data:UserType):Promise<UserType>;
}