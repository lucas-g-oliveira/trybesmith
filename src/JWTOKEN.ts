import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'CHAVE-ULTRA-SECRET4';
// const jwtConfig = { type: 'JWT', algorithm: 'HS256' };

export default class JWTOKEN {
  public static encript(data:string) {
    try {
      return jwt.sign(data, secret);
    } catch (err) {
      return err;
    }
  }

  public static decript(token:string | undefined) {
    if (!token) return { error: { message: 'Token not found' }, data: null };
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (err) {
      return { error: { message: 'Expired or invalid token' } };
    }
  }
}