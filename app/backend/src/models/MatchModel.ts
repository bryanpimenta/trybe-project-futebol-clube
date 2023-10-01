import { IMatch, IMatchResponse } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findById(id: IMatch['id']): Promise<IMatchResponse | null> {
    const dbData = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!dbData) return null;
    return dbData.toJSON() as IMatchResponse;
  }

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
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    const dbData = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData?.toJSON() as IMatchResponse;
  }
}
