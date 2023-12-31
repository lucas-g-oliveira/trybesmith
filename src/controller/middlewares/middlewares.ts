import { NextFunction, Request, Response } from 'express';
import { addProduct as product, addUser as user, addOrder as order, login } from './schemas';
import Validations from '../Validations';
import statusCodes from '../statusCode';

export default class Middlewares {
  public static tokenValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = Validations.token(req);
      if (!data.id) return res.status(401).json({ message: data.username });
      next();
    } catch (err) {
      return err;
    }
  }

  public static loginArgumentsValidate(req:Request, res:Response, next:NextFunction) {
    const { username, password } = req.body;
    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (!password) return res.status(400).json({ message: '"password" is required' });
    const { error } = login.validate(req.body);
    if (error) {
      const { code, message } = Middlewares.resErrorExpress(error.message);
      return res.status(code).json({ message });
    }
    next();
  }
  
  public static addProductValidate(req: Request, res:Response, next: NextFunction) {
    const { name, amount } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (!amount) return res.status(400).json({ message: '"amount" is required' });
    const data = product.validate(req.body);
    if (!data.error) {
      next();
    } else {
      return res.status(422).json({ message: data.error.message });
    }
  }
  
  public static addUserValidate(req: Request, res: Response, next: NextFunction) {
    const keys = ['username', 'password', 'level', 'vocation']
      .filter((e) => !Object.keys(req.body).includes(e));

    if (keys.length > 0) return res.status(400).json({ message: `"${keys[0]}" is required` });

    const data = user.validate(req.body);
    if (!data.error) {
      next();
    } else {
      return res.status(422).json({ message: data.error.message });
    }
  }
  
  public static addOrderValidate(req: Request, res: Response, next: NextFunction) {
    const keys = ['productsIds'/* , 'userId' */]
      .filter((e) => !Object.keys(req.body).includes(e));
    if (keys.length > 0) return res.status(400).json({ message: `"${keys[0]}" is required` });
    const data = order(req.body);

    if (data === 'ok') {
      next();
    } else {
      return res.status(422).json({ message: data });
    }
  }

  private static resErrorExpress(message: string) {
    const result = (code: number, msg: string) => ({ message: msg, code });
    if (message.includes('is required')) return result(statusCodes.BAD_REQUEST, message);
    if (message.includes(`${/token/i}`)) return result(statusCodes.UNAUTHORIZED, message);
    /* if (message.includes('must')) */ return result(statusCodes.UNPROCESSABE_ENTITY, message);
  }
}