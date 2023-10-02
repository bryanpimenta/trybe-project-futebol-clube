import { ICRUDModelReader, ICRUDModelUpdater, ICRUDModelCreator } from '../ICRUDModel';
import { IMatchResponse } from './IMatch';

export interface IMatchModel extends
  ICRUDModelReader<IMatchResponse>,
  ICRUDModelUpdater<IMatchResponse>,
  ICRUDModelCreator<IMatchResponse> { }
