import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';
import mapStatusHTTP from '../util/mapStatus';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
