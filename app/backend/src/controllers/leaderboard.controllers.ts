import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';
import mapStatusHTTP from '../util/mapStatus';
import { matchType } from '../Interfaces/leaderboards/ILeaderboard';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(_req: Request, res: Response, mt?: matchType) {
    const { status, data } = await this.leaderboardService.getLeaderboard(mt);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
