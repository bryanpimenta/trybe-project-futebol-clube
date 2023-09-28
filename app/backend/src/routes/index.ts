import { Router } from 'express';
import TeamsRouter from './team.routes';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;