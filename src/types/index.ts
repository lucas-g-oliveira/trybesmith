export type ProductType = {
  id?: number | undefined;
  name: string;
  amount: string;
  orderId: number;
};

export type UserLoginType = {
  password:string;
  username:string;
};

export type UserType = {
  id: number | undefined
  username: string;
  vocation: string;
  level: number;
  password: string;
};

export type OrdersType = {
  id?: number | undefined;
  userId: string;
};