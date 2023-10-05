import { ResponseService } from '../util/mapStatus';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getTeams(): Promise<ResponseService<ITeam>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'successful', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ResponseService<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'notFound', data: { message: `Team ${id} not found` } };
    return { status: 'successful', data: team };
  }

}
