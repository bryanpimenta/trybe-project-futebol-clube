import { IMatch } from './../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress}) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
    ));
  }
}