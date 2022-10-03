import { ICrud } from './crud.interface';
import { TKeys } from './factory.persistence.enum';

export interface IFactory {
  get: (key: TKeys) => Promise<ICrud>;
}
