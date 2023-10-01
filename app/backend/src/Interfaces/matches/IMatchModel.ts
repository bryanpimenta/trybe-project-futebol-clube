import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import { IMatchResponse } from './IMatch';

export interface IMatchModel extends
  ICRUDModelReader<IMatchResponse>,
  ICRUDModelUpdater<IMatchResponse> { }
