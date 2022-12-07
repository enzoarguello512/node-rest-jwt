import { ICreateCartDto } from '../../components/cart/dto/create.cart.dto';
import { ICreateMessageDto } from '../../components/message/dto/create.message.dto';

// JSON Web Token
export interface IJwt {
  id: string;
  email: string;
  firstName: string;
  permissionLevel: number;
  cart: Partial<ICreateCartDto>;
  messages: Array<ICreateMessageDto>;
}
