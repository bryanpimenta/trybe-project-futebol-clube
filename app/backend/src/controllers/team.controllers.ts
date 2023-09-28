import { Request, Response } from 'express';
import mapStatusHTTP from '../util/mapStatus';
import TeamService from '../services/team.services';

export default class TeamsController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getTeams(_req: Request, res: Response) {
    const { data } = await this.teamService.getTeams();
    res.status(200).json(data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.teamService.getTeamById(Number(id));

    if (status !== 'successful') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(200).json(data);
  }
}
