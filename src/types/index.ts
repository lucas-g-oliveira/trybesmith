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
  userId: number | null;
};

export type OrdersAddType = {
  productsIds: number[] ;
};

export type AUTH = {
  username: string;
  id: number | null;
  iat: number; 
};