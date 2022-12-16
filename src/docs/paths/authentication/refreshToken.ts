const refreshToken = {
  get: {
    tags: ['Authentication'],
    description:
      'It allows you to obtain a new access and refresh token, you must include your refresh token as a request cookie',
    operationId: 'refreshToken',
    parameters: [
      {
        name: 'JWT Cookie',
        in: 'cookie',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'refreshToken in cookie format',
        example:
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuem9AdGhlbW9yZmkuY29tIiwiaWF0IjoxNjYyNDEwODc1LCJleHAiOjE2NjI0OTcyNzV9.8b5E2--f7Sl1-gFqqN10xO4t-yU3iEIuT9UXTeeImkM; Max-Age=86400; Path=/; Expires=Tue, 06 Sep 2022 20:47:55 GMT; HttpOnly; Secure; SameSite=None',
      },
    ],
    responses: {
      200: {
        description: 'Successful Refresh.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AccessToken',
            },
          },
        },
      },
      400: {
        description: 'Invalid cookie',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};

export default refreshToken;
