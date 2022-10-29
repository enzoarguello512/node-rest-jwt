// Server
import express from 'express';
import http from 'http';
import debug from 'debug';
import path from 'path';

// To fix the environment variable (config module)
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config');

// Middleware and options
import cors from 'cors';
import helmet from 'helmet';
import { corsOptions } from './components/app/middleware/cors.middleware';
import { credentials } from './components/app/middleware/credentials.middleware';
import logsMiddleware from './components/app/middleware/logs.middleware';
import ErrorMiddleware from './components/app/middleware/error.middleware';
import ErrorHandler from './common/error.handler.config';

// Routes
import CommonRoutesConfig from './common/common.routes.config';
import ProductsRoutes from './components/product/product.routes.config';
import CartRoutes from './components/cart/cart.routes.config';
import UsersRoutes from './components/user/user.routes.config';
import MessagesRoutes from './components/message/message.routes.config';
import AuthRoutes from './services/auth/auth.routes.config';

// Jwt
import cookieParser from 'cookie-parser';

// Socket-io (chat)
import SocketServer from './services/socket/socket.service';
import socketio from 'socket.io';
import OrdersRoutes from './components/order/order.routes.config';

// App
//////////////////////
const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

// Middlewares
//////////////////////
// custom middleware logger
app.use(logsMiddleware);

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// cross Origin Resource Sharing
app.use(cors(corsOptions));

// helmet helps you secure your express apps
app.use(helmet());

//middleware for cookies
app.use(cookieParser());

// Routes config
//////////////////////
routes.push(new ProductsRoutes(app));
routes.push(new CartRoutes(app));
routes.push(new UsersRoutes(app));
routes.push(new MessagesRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new OrdersRoutes(app));
routes.forEach((route: CommonRoutesConfig): void => {
  debugLog(`Routes configured for ${route.getName()}`);
});

// Errors
//////////////////////
// manage errors
app.use(ErrorMiddleware.handle);

// manage non-existent routes
app.use(ErrorMiddleware.routeNotFound);

// unhandled errors
process.on('uncaughtException', async (error: Error): Promise<void> => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) process.exit(1);
});
process.on('unhandledRejection', (reason: Error): never => {
  throw reason;
});

// Server
//////////////////////
const httpServer: http.Server = http.createServer(app);

// Chat server
//////////////////////
const ioServer: socketio.Server = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
ioServer.on('connection', (socket) => {
  new SocketServer(ioServer, socket);
});

export default httpServer;
