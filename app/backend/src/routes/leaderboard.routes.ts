import { Router, Response, Request } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res, 'home'),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res, 'away'),
);

export default router;
