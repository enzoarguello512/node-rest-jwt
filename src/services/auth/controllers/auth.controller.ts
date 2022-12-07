import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import config from 'config';
import usersService from '../../../components/user/services/user.service';
import { Error as MongoError } from 'mongoose';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { ICreateUserDto } from '../../../components/user/dto/create.user.dto';
import { IJwt } from '../../../common/types/jwt.interface';

const log: debug.IDebugger = debug('app:auth-controller');

const accessTokenSecret = config.get<string>('jwt.accesstoken');
const refreshTokenSecret = config.get<string>('jwt.refreshtoken');
const accessTokenDuration = config.get<string>('jwt.accesstokenduration');
const refreshTokenDuration = config.get<string>('jwt.refreshtokenduration');

const jwtOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
} as const;

const jwtOptionsMaxAge = {
  ...jwtOptions,
  maxAge: 24 * 60 * 60 * 1000, // hours - min - sec - milsec
} as const;

// Function in charge of generating our tokens that will later be included in the user's profile to keep it authenticated for a certain time
function signToken(
  user: ICreateUserDto,
  secretToken: string,
  expiresIn: string
): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      permissionLevel: user.permissionLevel,
      cart: {
        id: user?.cart || '', // user.cart is the reference to the cart (an id)
        products: [],
      },
      messages: [],
    } as IJwt,
    secretToken,
    { expiresIn }
  );
}

class AuthController {
  public async auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cookies = req.cookies;
    try {
      const foundUser = await usersService.getUserByEmailWithPassword(
        req.body.email
      );
      if (foundUser && (await foundUser.comparePassword(req.body.password))) {
        //TODO: replace this part of the cart in the frontend, otherwise the set-cookies limit is exceeded.
        const accessToken = signToken(
          foundUser,
          accessTokenSecret,
          accessTokenDuration
        );
        const newRefreshToken = signToken(
          foundUser,
          refreshTokenSecret,
          refreshTokenDuration
        );

        // We invalidate the previous token of this device (we delete the token from the array) to assign a new one below
        // This is for a security issue
        let newRefreshTokenArray = !cookies?.jwt
          ? foundUser.refreshToken
          : foundUser.refreshToken.filter((rt: string) => rt !== cookies.jwt);

        if (cookies?.jwt) {
          /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
          const refreshToken = cookies.jwt;
          const foundToken = await usersService.getUserByRefreshToken(
            refreshToken
          );

          // Detected refresh token reuse!
          if (!foundToken) {
            log('Attempted refresh token reuse at login!');
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
          }

          // We delete the cookie from the response
          res.clearCookie('jwt', jwtOptions);
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, jwtOptionsMaxAge);

        // Send authorization access token to user
        return res.json({ accessToken });
      }
      throw new BadRequestError(
        'Invalid user email/password',
        'validateUserExists'
      );
    } catch (err) {
      next(err);
    }
  }

  public async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // TODO: On client, also delete the accessToken

    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204); //No content
      const refreshToken = cookies.jwt;

      // Is refreshToken in db?
      const foundUser = await usersService.getUserByRefreshToken(refreshToken);

      if (!foundUser) {
        res.clearCookie('jwt', jwtOptions);
        return res.sendStatus(204);
      }

      // Delete refreshToken in db
      foundUser.refreshToken = foundUser.refreshToken.filter(
        (rt: string) => rt !== refreshToken
      );
      await foundUser.save();

      // We delete the cookie from the response
      res.clearCookie('jwt', jwtOptions);
      res.sendStatus(204);
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        return next(new BadRequestError('Invalid refreshToken', 'logout'));
      }
      next(err);
    }
  }

  public async refreshToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', jwtOptions);

    try {
      const foundUser = await usersService.getUserByRefreshToken(refreshToken);

      // Detected refresh token reuse!
      if (!foundUser) {
        // @ts-ignore
        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
          if (err) return res.sendStatus(403); //Forbidden
          log('Attempted refresh token reuse!');
          const hackedUser = await usersService.getUserByEmail(decoded.email);
          hackedUser.refreshToken = [];
          await hackedUser.save();
        });
        return res.sendStatus(403); //Forbidden
      }

      // We invalidate the previous token of this device (we delete the token from the array) to assign a new one below
      // This is for a security issue
      const newRefreshTokenArray = foundUser.refreshToken.filter(
        (rt: string) => rt !== refreshToken
      );

      // evaluate jwt
      // @ts-ignore
      // TODO: Convert to async/await
      jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
        if (err) {
          log('Expired refresh token');
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();
        }
        if (err || foundUser.email !== decoded.email)
          return res.sendStatus(403);

        // Refresh token was still valid
        const accessToken = signToken(
          foundUser,
          accessTokenSecret,
          accessTokenDuration
        );
        const newRefreshToken = signToken(
          foundUser,
          refreshTokenSecret,
          refreshTokenDuration
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, jwtOptionsMaxAge);

        res.json({ accessToken });
      });
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        return next(
          new BadRequestError('Invalid refreshToken', 'refreshToken')
        );
      }
      next(err);
    }
  }
}

export default new AuthController();
