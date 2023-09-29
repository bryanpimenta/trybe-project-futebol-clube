import { NextFunction, Request, Response } from 'express';
import JWT from '../util/jwt';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const reqToken = req.headers.authorization;
    const parts = reqToken?.split(' ');
    const jwtToken = parts?.[1] || '';
    if (!reqToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validToken = JWT.verify(jwtToken);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}

export default Validations;
