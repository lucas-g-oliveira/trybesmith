import { Request } from 'express';
import { ObjectSchema } from 'joi';
import JWTOKEN from '../JWTOKEN';

export default class Validations {
  public static useSchema(req:Request, schema:ObjectSchema) {
    const { error } = schema.validate(req.body);
    if (error) return new Error(error.message);
    return true;
  }

  public static token(req:Request) {
    const token = req.header('authorization');
    return JWTOKEN.decript(token);
  }
}