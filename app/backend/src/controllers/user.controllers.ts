import { Request, Response } from 'express';
import UserService from '../services/user.services';
import mapStatusHTTP from '../util/mapStatus';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);

    if (status !== 'successful') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
