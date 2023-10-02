import { IMatch, IMatchResponse } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ResponseMessage, ResponseService } from '../util/mapStatus';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  public async getMatches(inProgress?: boolean | undefined):
  Promise<ResponseService<IMatchResponse[]>> {
    const matches = await this.matchModel.findAll();
    const filteredMatches = inProgress === undefined
      ? matches : matches.filter((match) => match.inProgress === inProgress);
    return { status: 'successful', data: filteredMatches };
  }

  public async finishMatch(id: number): Promise<ResponseService<ResponseMessage>> {
    await this.matchModel.update(id, { inProgress: false });
    return { status: 'successful', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, match: IMatchResponse):
  Promise<ResponseService<ResponseMessage>> {
    await this.matchModel.update(id, match);
    return { status: 'successful', data: { message: 'Updated' } };
  }

  public async createMatch(match: IMatchResponse):
  Promise<ResponseService<ResponseMessage | IMatch>> {
    if (match.homeTeamId === match.awayTeamId) {
      return {
        status: 'unprocessable',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await this.teamModel.findById(Number(match.homeTeamId));
    const awayTeam = await this.teamModel.findById(Number(match.awayTeamId));

    if (!homeTeam || !awayTeam) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create({ ...match, inProgress: true });
    return { status: 'created', data: newMatch };
  }
}
