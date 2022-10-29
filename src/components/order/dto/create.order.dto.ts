import mongoose from 'mongoose';
import { ICreateUserDto } from '../../user/dto/create.user.dto';

export interface ICreateOrderDto extends mongoose.Document {
  id: string;
  user: TOrderUser;
  products: Array<{
    data: IOrderProduct;
    quantity: number;
  }>;
  total: number;
  status: string;
  deliveryAddress: string;
  contact: {
    mail: string;
    phoneNumber: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type TOrderUser = mongoose.Types.ObjectId | ICreateUserDto;

export interface IOrderProduct {
  id: string; // product id
  name: string;
  description: string;
  imageUrl: string;
  hasFreeShipping: boolean;
  discountedPrice: number;
}
