import UserModel from '../models/UserModel';
import connection from '../models/connection';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';

const userModel = new UserModel(connection);
const orderModel = new OrderModel(connection);
const productModel = new ProductModel(connection);

export { userModel, orderModel, productModel };