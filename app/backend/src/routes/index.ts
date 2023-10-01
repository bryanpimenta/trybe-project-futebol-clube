import { Router } from 'express';
import TeamsRouter from './team.routes';
import UserRouter from './user.routes';
import MatchRouter from './match.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);

export default router;
