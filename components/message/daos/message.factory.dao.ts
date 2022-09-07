import { ICrudMessage } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class MessageFactory {
  static async get(key: TKeys): Promise<ICrudMessage> {
    const { default: MessageDao } = await import(`./message.${key}.dao`);
    return MessageDao;
    // return new MessageDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default MessageFactory.get(persistenceType);
