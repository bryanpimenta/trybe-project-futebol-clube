import * as bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { ILogin } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ResponseService, ResponseMessage } from '../util/mapStatus';
import JWT from '../util/jwt';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(data: ILogin): Promise<ResponseService<ResponseMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'invalidValue', data: { message: 'Invalid email or password' } };
    }
    const { id, username, email, role } = user;
    const token = JWT.sign({ id, username, email, role });
    return { status: 'successful', data: { token } };
  }
}
