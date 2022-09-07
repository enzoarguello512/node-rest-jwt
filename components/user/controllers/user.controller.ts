import express from 'express';
import usersService from '../services/user.service';
import debug from 'debug';
import { IPatchUserDto } from '../dto/patch.user.dto';
import { User } from '../models/user.model';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  public async listUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const users = await usersService.list(100, 0);
      res.status(200).send(users);
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
      const user = await usersService.readById(req.params.userId);
      res.status(200).send(user);
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
      req.body.password = await User.encryptPassword(req.body.password);
      const userId = await usersService.create(req.body);
      res.status(201).send({ id: userId });
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
      if (req.body.password) {
        req.body.password = await User.encryptPassword(req.body.password);
      }
      log(await usersService.patchById(req.params.userId, req.body));
      res.status(204).send();
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
      log(await usersService.deleteById(req.params.userId));
      res.status(204).send();
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
      const patchUserDto: IPatchUserDto = {
        permissionLevel: parseInt(req.params.permissionLevel),
      };
      log(await usersService.patchById(req.params.userId, patchUserDto));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
