import { ICreateUserDto } from '../../components/user/dto/create.user.dto';
import mongoose from 'mongoose';

export interface IUserModel extends mongoose.Model<ICreateUserDto> {
  encryptPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}
