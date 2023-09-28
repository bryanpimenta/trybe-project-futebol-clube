import { Router, Request, Response } from "express";
import TeamsController from "../controllers/team.controllers";

const teamController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.getTeamsById(req, res));

export default router;