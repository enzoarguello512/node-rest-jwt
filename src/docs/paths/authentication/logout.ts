const logout = {
  get: {
    tags: ['Authentication'],
    description: 'Log out of the server.',
    operationId: 'logout',
    parameters: [
      {
        name: 'JWT Cookie',
        in: 'cookie',
        schema: {
          type: 'string',
        },
        required: false,
        description: 'refreshToken in cookie format',
        example:
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuem9AdGhlbW9yZmkuY29tIiwiaWF0IjoxNjYyNDEwODc1LCJleHAiOjE2NjI0OTcyNzV9.8b5E2--f7Sl1-gFqqN10xO4t-yU3iEIuT9UXTeeImkM; Max-Age=86400; Path=/; Expires=Tue, 06 Sep 2022 20:47:55 GMT; HttpOnly; Secure; SameSite=None',
      },
    ],
    responses: {
      204: {
        description: 'Successful Logout.',
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

export default logout;
