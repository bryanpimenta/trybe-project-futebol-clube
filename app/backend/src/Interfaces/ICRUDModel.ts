export type ID = number;

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReaderAll<T> {
  findAll(): Promise<T[]>,
}

export interface ICRUDModelReaderById<T> {
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>,
  ICRUDModelReaderAll<T>, 
  ICRUDModelUpdater<T>, 
  ICRUDModelReaderById<T>, 
  ICRUDModelDeleter { }
