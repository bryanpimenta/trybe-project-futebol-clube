import { IMatchResponse } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ResponseMessage, ResponseService } from '../util/mapStatus';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
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
}
