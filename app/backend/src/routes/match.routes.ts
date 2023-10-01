import { Router, Response, Request } from 'express';
import MatchController from '../controllers/match.controllers';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getMatches(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
