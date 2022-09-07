import mongoose from 'mongoose';

export interface ICreateUserDto extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  permissionLevel: number;
  age: number;
  address?: string;
  country: string;
  city?: string;
  zipCode?: string;
  state?: string;
  phoneNumber: string;
  avatar: string;
  avatarId: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: Array<string>;
}
