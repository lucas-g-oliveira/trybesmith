import Joi from 'joi';
import { OrdersAddType } from '../../types';

const addProduct = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const addUser = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const addOrder = (obj:OrdersAddType) => {
  console.log(obj.productsIds);
  if (!Array.isArray(obj.productsIds)) return '"productsIds" must be an array';
  if (obj.productsIds.length < 1) return '"productsIds" must include only numbers';
  if (obj.productsIds.some((e) => !Number.isInteger(e))) {
    return '"productsIds" must include only numbers';
  }
  return 'ok';
};

const login = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

export { addUser, addProduct, addOrder, login };
