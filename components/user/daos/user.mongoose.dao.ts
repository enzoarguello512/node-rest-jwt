import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';
import BaseError from '../../../common/error/base.error';
import { ICrudUser } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { User } from '../models/user.model';
import { EPermissionLevel } from '../../../common/types/common.permissionlevel.enum';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao implements ICrudUser {
  constructor() {
    log('Created new instance of UsersDao');
  }

  public async create(userFields: ICreateUserDto) {
    try {
      const user = new User({
        ...userFields,
        permissionLevel: EPermissionLevel.FREE_PERMISSION,
      });
      await user.save();
      return user.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save user', err, 'create');
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return User.findOne({ email }).exec();
    } catch (err) {
      throw new BaseError('Failed to find user', err, 'getUserByEmail');
    }
  }

  public async getUserByEmailWithPassword(email: string) {
    try {
      return User.findOne({ email: email })
        .select('id email firstName permissionLevel +password refreshToken')
        .exec();
    } catch (err) {
      throw new BaseError(
        'Failed to find user',
        err,
        'getUserByEmailWithPassword'
      );
    }
  }

  public async getUserByRefreshToken(refreshToken: string) {
    try {
      return User.findOne({ refreshToken }).exec();
    } catch (err) {
      throw new BaseError('Failed to find user', err, 'getUserByRefreshToken');
    }
  }

  public async deleteById(userId: string) {
    try {
      return User.deleteOne({ _id: userId }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove user', err, 'deleteById');
    }
  }

  public async readById(userId: string) {
    try {
      return User.findOne({ _id: userId }).populate('User').exec();
    } catch (err) {
      throw new BaseError('Failed to find user', err, 'readById');
    }
  }

  public async list(limit = 25, page = 0) {
    return User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async patchById(userId: string, userFields: IPatchUserDto) {
    try {
      const existingUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: userFields },
        { new: true }
      ).exec();

      return existingUser;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update user', err, 'patchById');
    }
  }
}

export default new UsersDao();
