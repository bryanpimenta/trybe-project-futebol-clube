import { ICRUDModelReaderAll, ICRUDModelUpdater, ICRUDModelCreator } from '../ICRUDModel';
import { IMatchResponse } from './IMatch';

export interface IMatchModel extends
  ICRUDModelReaderAll<IMatchResponse>,
  ICRUDModelUpdater<IMatchResponse>,
  ICRUDModelCreator<IMatchResponse> { }
