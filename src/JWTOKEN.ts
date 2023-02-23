import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AUTH } from './types';

dotenv.config();

const secret = process.env.JWT_SECRET || 'CHAVE-ULTRA-SECRET4';
// const jwtConfig = { type: 'JWT', algorithm: 'HS256' };

export default class JWTOKEN {
  public static encript(data:object) {
    try {
      return jwt.sign(data, secret);
    } catch (err) {
      return err;
    }
  }

  public static decript(token:string | undefined):AUTH {
    if (!token) return { iat: 0, id: null, username: 'invalido' };
    try {
      const data = jwt.verify(token, secret);
      return data as AUTH;
    } catch (err) {
      return { iat: 0, id: null, username: 'invalido' };
    }
  }
}