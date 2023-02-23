import express, { Request, Response } from 'express';
import ProductService from '../service/ProdutoService';
import UserService from '../service/UserService';
import OrderService from '../service/OrderService';
import JWTOKEN from '../JWTOKEN';
import Middlewares from './middlewares/middlewares';

const route = express.Router();

route.post(
  '/products',
  // Middlewares.tokenValidate,
  Middlewares.addProductValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await new ProductService().add(req.body);
    return res.status(201).json(message.data);
  },
);

route.get(
  '/products',
  Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (_req: Request, res: Response) => {
    const message = await new ProductService().getAll();
    return res.status(200).json(message.data);
  },
);

route.post(
  '/users',
  // Middlewares.addUserValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await new UserService().add(req.body);
    if (!message.type) { 
      const token = JWTOKEN.encript({
        username: message.data.username,
        id: message.data.id,
      });
      return res.status(201).json({ token });
    }
    return res.status(400).json(message.type);
  },
);

route.post(
  '/login',
  Middlewares.loginArgumentsValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const { data, type } = await new UserService().get(req.body);
    if (type) {
      return res.status(401).json({ message: data });
    }
    return res.status(200).json(data);
  },
);

route.get(
  '/orders',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (_req: Request, res: Response) => {
    const message = await new OrderService().getAll();
    return res.status(200).json(message.data);
  },
);

route.post(
  '/orders',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const { body, headers } = req;
    const message = await new OrderService().add(body, headers.authorization as undefined);
    return res.status(200).json(message.data);
  },
);

export = route;
