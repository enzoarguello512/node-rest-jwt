import mongoose from 'mongoose';
import { ICreateCartDto } from '../../cart/dto/create.cart.dto';

export interface ICreateUserDto extends mongoose.Document {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  permissionLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: Array<string>;
  cart?: mongoose.Types.ObjectId | ICreateCartDto;
}
