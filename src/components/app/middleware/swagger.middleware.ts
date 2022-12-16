// Docs
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../../package.json';

// Paths
import productsPaths from '../../../docs/paths/products/paths';

import CommonRoutesConfig from '../../../common/common.routes.config';
import express from 'express';
import schemas from '../../../docs/schemas/schemas';
import config from 'config';
import authPaths from '../../../docs/paths/authentication/paths';
import cartPaths from '../../../docs/paths/cart/paths';
import usersPaths from '../../../docs/paths/user/paths';

const port = config.get<number>('server.port');
const domain = config.get<string>('server.domain');

const options: swaggerUi.JsonObject = {
  openapi: '3.0.3',
  components: {
    schemas,
    securitySchemes: {
      jwtCookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'jwt',
      },
    },
  },
  info: {
    title: 'The Morfi REST API Docs - OpenAPI 3.0',
    version,
    description:
      'RESTful API using NodeJs, Express, Mongoose, Typescript and JSON Web Tokens',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Enzo Argüello',
      email: 'arguelar@gmail.com',
      url: 'https://github.com/enzoarguello512',
    },
  },
  externalDocs: {
    description: 'Find more information about the project (The Morfi)',
    url: 'https://github.com/enzoarguello512/morfi-react',
  },
  servers: [
    {
      description: 'Local deploy',
      url: `http://${domain}:${port}`,
    },
    {
      description: 'Remote deploy',
      url: 'https://node-rest-jwt.onrender.com',
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'Group of routes related to authentication',
    },
    { name: 'Users', description: 'Operations about users' },
    {
      name: 'Products',
      description: 'Access the main component for the other routes (Products)',
    },
    {
      name: 'Cart',
      description: 'Routes linked to a cart and a user (or not!)',
    },
    { name: 'Orders', description: 'Access to The Morfi orders' },
    {
      name: 'Chat',
      description:
        'The chat system that operates on the server (similar to a chatbot)',
    },
  ],
  security: [{ jwtCookieAuth: [] }],
  paths: {
    ...authPaths,
    ...cartPaths,
    ...productsPaths,
    ...usersPaths,
  },
};

export default class DocsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DocsRoutes');
  }

  public configureRoutes(): express.Application {
    /**
     * MIDDLEWARE - Swagger UI page
     */
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(options));

    /**
     * GET - Docs in JSON format
     */
    this.app.get(
      '/docs.json',
      (req: express.Request, res: express.Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(options);
      }
    );

    return this.app;
  }
}
