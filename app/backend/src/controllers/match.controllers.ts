import { Request, Response } from 'express';
import MatchService from '../services/match.services';
import mapStatusHTTP from '../util/mapStatus';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let parsedInProgress;

    if (inProgress === 'true') {
      parsedInProgress = true;
    } else if (inProgress === 'false') {
      parsedInProgress = false;
    } else {
      parsedInProgress = undefined;
    }

    const { status, data } = await this.matchService.getMatches(parsedInProgress);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatch(Number(id), req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService.createMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
