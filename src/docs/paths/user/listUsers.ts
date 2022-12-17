const listUsers = {
  get: {
    tags: ['Users'],
    description: 'Get all users.',
    operationId: 'listUsers',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [],
    responses: {
      200: {
        description: 'List of obtained users',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of users.',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
      401: {
        description: 'Unauthorized route, login first and try again',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
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

export default listUsers;
