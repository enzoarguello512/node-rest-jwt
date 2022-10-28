import { ICrudDerivedToUser } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class MessageFactory {
  static async get(key: TKeys): Promise<ICrudDerivedToUser> {
    if (key === 'mongoatlas' || key === 'mongolocal') key = 'mongoose';
    const { default: MessageDao } = await import(`./message.${key}.dao`);
    return MessageDao;
    // return new MessageDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default MessageFactory.get(persistenceType);
