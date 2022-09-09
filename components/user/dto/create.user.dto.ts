import mongoose from 'mongoose';

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
}
