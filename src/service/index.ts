import UserModel from '../models/UserModel';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import connection from '../models/connection';

export const userModel = new UserModel(connection);
export const productModel = new ProductModel(connection);
export const orderModel = new OrderModel(connection);

export default { UserModel, OrderModel, ProductModel };