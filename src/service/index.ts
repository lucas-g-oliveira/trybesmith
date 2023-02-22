import UserModel from '../models/UserModel';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import connection from '../models/connection';

export const userService = new UserModel(connection);
export const productService = new ProductModel(connection);
export const orderService = new OrderModel(connection);

export default { UserModel, OrderModel, ProductModel };