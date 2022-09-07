import mongoose from 'mongoose';

export interface ICreateProductDto extends mongoose.Document {
  id: string;
  name: string;
  description?: string;
  productCode?: number;
  imageUrl?: string;
  hasFreeShipping?: boolean;
  discount?: number;
  promotion?: Array<string>;
  categories?: Array<string>;
  region?: Array<string>;
  rating?: number;
  payment?: Array<string>;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}
