const auth = {
  post: {
    tags: ['Authentication'],
    description: 'Log in to the system.',
    operationId: 'auth',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test@example.com',
              },
              password: {
                type: 'string',
                description: 'User password.',
                example: 'secret1',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AccessToken',
            },
          },
        },
      },
      400: {
        description: 'Bad request, email and/or password missing.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized, wrong email and/or password.',
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

export default auth;
