import mongoose from 'mongoose';
import { ICreateProductDto } from '../../product/dto/create.product.dto';
import { ICreateUserDto } from '../../user/dto/create.user.dto';

export interface ICreateCartDto extends mongoose.Document {
  id: string;
  products: Array<ICartProduct>;
  user?: mongoose.Types.ObjectId | ICreateUserDto;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartProduct {
  data: mongoose.Types.ObjectId | ICreateProductDto;
  quantity: number;
}
