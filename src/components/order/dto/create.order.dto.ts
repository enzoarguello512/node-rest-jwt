import mongoose from 'mongoose';
import { ICreateUserDto } from '../../user/dto/create.user.dto';

export interface ICreateOrderDto extends mongoose.Document {
  id: string;
  user: TOrderUser;
  text: string;
  type: TOrderType;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TOrderUser = mongoose.Types.ObjectId | ICreateUserDto;

export type TOrderType = 'user' | 'server';
