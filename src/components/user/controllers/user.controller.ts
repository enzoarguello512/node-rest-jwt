import express from 'express';
import usersService from '../services/user.service';
import debug from 'debug';
import { IPatchUserDto } from '../dto/patch.user.dto';
import { User } from '../models/user.model';
import { ICreateUserDto } from '../dto/create.user.dto';
import httpStatus from 'http-status';
import { UploadedFile } from 'express-fileupload';

const log: debug.IDebugger = debug('app:users-controller');

async function transformRequestBody(
  req: express.Request
): Promise<ICreateUserDto> {
  const { email, password, firstName, address, age, phoneNumber } =
    req.body as ICreateUserDto;

  const user = {
    email,
    //password,
    firstName,
    lastName: req.body?.lastName,
    address,
    age,
    phoneNumber,
    imageId: req.files?.image as UploadedFile, // non-optional (when creating)
    permissionLevel: req.body?.permissionLevel, // non-optional (it will always be of type "free" until a request is made to update the user)
  } as ICreateUserDto;

  if (req.body?.password) {
    user.password = await User.encryptPassword(password);
  }

  return user;
}

class UsersController {
  public async listUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const users = await usersService.list(100, 0);
      res.status(httpStatus.OK).send(users);
    } catch (err) {
      next(err);
    }
  }

  public async getUserById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId: string = req.body.id;
      const user = await usersService.readById(userId);
      res.status(httpStatus.OK).send(user);
    } catch (err) {
      next(err);
    }
  }

  public async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const newFields: ICreateUserDto = await transformRequestBody(req);
      const userId = await usersService.create(newFields);
      res.status(httpStatus.CREATED).send({ id: userId });
    } catch (err) {
      next(err);
    }
  }

  public async patch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId: string = req.body.id;
      const newFields: ICreateUserDto = await transformRequestBody(req);
      log(await usersService.patchById(userId, newFields));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedUser: ICreateUserDto = req.body.user;
      log(await usersService.deleteById(fetchedUser));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async updatePermissionLevel(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId: string = req.body.id;
      const patchUserDto: IPatchUserDto = {
        permissionLevel: parseInt(req.params.permissionLevel),
      };
      log(await usersService.patchById(userId, patchUserDto));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
