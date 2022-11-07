import { UploadedFile } from 'express-fileupload';
import mongoose from 'mongoose';

export interface ICreateProductDto extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  productCode?: number;
  imageId: string | UploadedFile; // it is of type UploadedFile when the user makes the request (when the image is going to be uploaded) and takes the value of string when it is saved in the database
  // e.g "Products/dnaar7qtosptxztq7apv" or an image
  imageUrl: string;
  hasFreeShipping: boolean;
  discount: number;
  discountedPrice: number; // automatically calculated by mongoose
  promotion?: Array<string>;
  categories?: Array<string>;
  region?: Array<string>;
  rating?: number;
  payment?: Array<string>;
  price: number;
  stock: number;
  createdAt?: Date; // automatically added by mongoose
  updatedAt?: Date; // automatically added by mongoose
}
