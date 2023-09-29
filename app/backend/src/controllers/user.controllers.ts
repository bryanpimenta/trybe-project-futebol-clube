import { Request, Response } from 'express';
import UserService from '../services/user.services';
import mapStatusHTTP from '../util/mapStatus';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public static async getRole(req: Request, res: Response) {
    const reqToken = req.headers.authorization;
    if (!reqToken) return res.status(401).json({ message: 'Token not found' });
    const parts = reqToken?.split(' ');
    const jwtToken = parts?.[1];
    const { status, data } = await UserService.getRole(jwtToken);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
