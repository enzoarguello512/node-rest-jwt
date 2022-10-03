import { allowedOrigins } from '../app.config';
import express from 'express';

export const credentials = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
