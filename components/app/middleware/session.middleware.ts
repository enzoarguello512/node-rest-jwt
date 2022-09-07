import session from 'express-session';
import MongoStore from 'connect-mongo';
import MongooseService from '../../../services/mongoose/mongoose.service';
import config from 'config';

const secret = config.get<string>('server.session.secret');
const cookieTimeout = config.get<number>('server.session.cookietimeout');

const sessionMiddleware = session({
  secret,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    clientPromise: MongooseService.connectWithRetry(),
    stringify: false,
    autoRemove: 'interval',
    autoRemoveInterval: 1,
  }),
  cookie: {
    maxAge: cookieTimeout * 1000 * 60,
    httpOnly: false,
  },
});

export default sessionMiddleware;
