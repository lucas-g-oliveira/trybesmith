import express, { Request, Response } from 'express';
import ProductService from '../service/ProdutoService';
import UserService from '../service/UserService';
import OrderService from '../service/OrderService';

// import Middlewares from './middlewares/middlewares';

const route = express.Router();

route.post(
  '/products',
  // Middlewares.tokenValidate,
  // Middlewares.addProductValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await new ProductService().add(req.body);
    return res.status(201).json(message.data);
  },
);

route.get(
  '/products',
  // Middlewares.tokenValidate,
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
    console.log(req.body);
    const message = await new UserService().add(req.body);
    return res.status(201).json(message.data);
  },
);

route.post(
  '/login',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await new UserService().get(req.body);
    console.log(message);
    return res.status(200).json(message.data);
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
    const message = await new OrderService().add(req.body);
    return res.status(200).json(message.data);
  },
);

export = route;
