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
  imageId: string | UploadedFile; // it is of type UploadedFile when the user makes the request (when the image is going to be uploaded) and takes the value of string when it is saved in the database
  // e.g "Products/dnaar7qtosptxztq7apv" or an image
  // If an image is not selected, the default image will be used.
  imageUrl: string;
  permissionLevel: number;
  refreshToken?: Array<string>;
  cart?: mongoose.Types.ObjectId | ICreateCartDto;
  createdAt?: Date; // automatically added by mongoose
  updatedAt?: Date; // automatically added by mongoose
}
