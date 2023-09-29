import { Router, Response, Request } from 'express';
import UsersController from '../controllers/user.controllers';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => UsersController.getRole(req, res),
);

export default router;
