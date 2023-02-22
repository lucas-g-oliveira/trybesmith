import express, { Request, Response } from 'express';
import { productService, userService, orderService } from '../service';
// import Middlewares from './middlewares/middlewares';

const route = express.Router();

route.post(
  '/products',
  // Middlewares.tokenValidate,
  // Middlewares.addProductValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await productService.add(req.body);
    return res.status(201).json({ message });
  },
);

route.get(
  '/products',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (_req: Request, res: Response) => {
    const message = await productService.getAll();
    return res.status(200).json({ message });
  },
);

route.post(
  '/users',
  // Middlewares.addUserValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await userService.add(req.body);
    return res.status(200).json({ message });
  },
);

route.post(
  '/login',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await userService.getOne(req.body);
    return res.status(200).json({ message });
  },
);

route.get(
  '/orders',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (_req: Request, res: Response) => {
    const message = await orderService.getAll();
    return res.status(200).json({ message });
  },
);

route.post(
  '/orders',
  // Middlewares.tokenValidate,
  // Middlewares.errorMidllaware,
  async (req: Request, res: Response) => {
    const message = await orderService.add(req.body.productsIds);
    return res.status(200).json({ message });
  },
);

export = route;
