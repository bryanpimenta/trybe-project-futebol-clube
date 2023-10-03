import { Router } from 'express';
import TeamsRouter from './team.routes';
import UserRouter from './user.routes';
import MatchRouter from './match.routes';
import LeaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
