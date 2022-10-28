import { UploadedFile } from 'express-fileupload';
import mongoose from 'mongoose';
import { ICreateCartDto } from '../../cart/dto/create.cart.dto';

export interface ICreateUserDto extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  address: string;
  age: number;
  phoneNumber: string;
  imageId: string | UploadedFile;
  imageUrl: string;
  permissionLevel: number;
  refreshToken?: Array<string>;
  cart?: mongoose.Types.ObjectId | ICreateCartDto;
  createdAt?: Date;
  updatedAt?: Date;
}
