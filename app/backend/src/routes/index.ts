import { Router } from 'express';
import TeamsRouter from './team.routes';
import UserRouter from './user.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UserRouter);

export default router;
