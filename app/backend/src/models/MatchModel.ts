import { IMatch, IMatchResponse } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatchResponse[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => match.toJSON() as IMatchResponse);
  }

  async update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatchResponse | null> {
    await this.model.update(data, { where: { id } });
    return null;
  }

  async create(data: Omit<IMatch, 'id'>): Promise<IMatchResponse> {
    const dbData = await this.model.create(data);
    return dbData.toJSON() as IMatchResponse;
  }
}
