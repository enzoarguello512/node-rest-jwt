import mongoose from 'mongoose';
import { ICreateUserDto } from '../../user/dto/create.user.dto';

export interface ICreateMessageDto extends mongoose.Document {
  id: string;
  user: TMessageUser;
  text: string;
  type: TMessageType;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TMessageUser = mongoose.Types.ObjectId | ICreateUserDto;

export type TMessageType = 'user' | 'server';
