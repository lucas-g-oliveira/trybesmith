import { NextFunction, Request, Response } from 'express';
import { addProduct as product, addUser as user, addOrder as order, login } from './schemas';
import Validations from '../Validations';
import statusCodes from '../statusCode';

export default class Middlewares {
  public static tokenValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      Validations.token(req);
      next();
    } catch (err) {
      return err;
    }
  }

  public static loginArgumentsValidate(req:Request, res:Response, next:NextFunction) {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: '"username" is required' });
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: '"password" is required' });
    const { error } = login.validate(req.body);
    if (error) {
      const { code, message } = this.resErrorExpress(error.message);
      return res.status(code).json(message);
    }
    next();
  }
  
  public static addProductValidate(req: Request, _res:Response, next: NextFunction) {
    Validations.useSchema(req, product);
    next();
  }
  
  public static addUserValidate(req: Request, _res: Response, next: NextFunction) {
    Validations.useSchema(req, user);
    next();
  }
  
  public static addOrderValidate(req: Request, _res: Response, next: NextFunction) {
    Validations.useSchema(req, order);
    next();
  }
  
  public static errorMidllaware(error:Error, _req: Request, res: Response, next: NextFunction) {
    if (error.message) {
      const { message, code } = Middlewares.resErrorExpress(error.message);
      console.log(error);
      return res.status(code).json({ message });
    }
    next();
  }

  private static resErrorExpress(message: string) {
    const result = (code: number, msg: string) => ({ message: msg, code });
    if (message.includes('is required')) return result(statusCodes.BAD_REQUEST, message);
    if (message.includes(`${/token/i}`)) return result(statusCodes.UNAUTHORIZED, message);
    /* if (message.includes('must')) */ return result(statusCodes.UNPROCESSABE_ENTITY, message);
  }
}