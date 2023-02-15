import { Request } from 'express';
import { ObjectSchema } from 'joi';
import jwt from 'jsonwebtoken';

export default class Validations {
  public static useSchema(req:Request, schema:ObjectSchema) {
    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    return true;
  }

  public static token(req:Request) {
    const secret = process.env.JWT_SECRET || 'CHAVE-ULTRA-SECRET4';
    const token = req.header('Authorization');
    if (!token) throw new Error('Token not found');
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}