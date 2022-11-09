import mongoose from 'mongoose';
import { ICreateUserDto } from '../../user/dto/create.user.dto';

export interface ICreateMessageDto extends mongoose.Document {
  id: string;
  user: TMessageUser;
  text: string;
  type: TMessageType;
  createdAt?: Date; // automatically added by mongoose
  updatedAt?: Date; // automatically added by mongoose
}

export type TMessageUser = mongoose.Types.ObjectId | ICreateUserDto;

export type TMessageType = 'user' | 'server';
