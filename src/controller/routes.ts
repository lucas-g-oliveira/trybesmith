import express, { Request, Response } from 'express';
import ProductControler from '.';

const products = new ProductControler();

const route = express.Router();

route.post('/products', async (req: Request, res: Response) => {
  const message = 'postProduct';
  return res.status(200).json({ message });
});

route.get('/products', products.getAll);

route.post('/users', async (req: Request, res: Response) => {
  const message = 'postUsers';
  return res.status(200).json({ message });
});

route.post('/login', async (req: Request, res: Response) => {
  const message = 'login';
  return res.status(200).json({ message });
});

route.get('/orders', async (req: Request, res: Response) => {
  const message = 'listOrders';
  return res.status(200).json({ message });
});

route.post('/orders', async (req: Request, res: Response) => {
  const message = 'addOrder';
  return res.status(200).json({ message });
});

export = route;
