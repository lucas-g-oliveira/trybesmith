import Joi from 'joi';

const addProduct = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const addUser = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().min(0).required(),
  password: Joi.string().min(8).required(),
});

const addOrder = Joi.object().keys({
  productsIds: Joi.array().items(Joi.number().integer().min(1)).required(),
});

const login = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

export { addUser, addProduct, addOrder, login };
