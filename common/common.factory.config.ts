import { ICrud } from './types/crud.interface';
import { TKeys } from './types/factory.persistence.enum';

export default abstract class CommonFactoryConfig {
  public abstract get(key: TKeys): Promise<ICrud>;
}
