import { Router, Response, Request } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default router;
