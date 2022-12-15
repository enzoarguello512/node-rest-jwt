// Docs
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../../package.json';

// Paths
import productsPaths from '../../../docs/paths/products/paths';

import CommonRoutesConfig from '../../../common/common.routes.config';
import express from 'express';
import schemas from '../../../docs/schemas/schemas';

const options: swaggerUi.JsonObject = {
  openapi: '3.0.3',
  components: {
    securitySchemas: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas,
  },
  info: {
    title: 'REST API Docs',
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
  servers: [{ url: 'https://node-rest-jwt.onrender.com' }],
  tags: [
    { name: 'Server Info' },
    { name: 'Authentication' },
    { name: 'User' },
    { name: 'Products' },
    { name: 'Cart' },
    { name: 'Orders' },
    { name: 'Chat' },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...productsPaths,
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
