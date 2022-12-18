const listMessages = {
  get: {
    tags: ['Messages'],
    description: 'Get all messages.',
    operationId: 'listMessages',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [],
    responses: {
      200: {
        description: 'List of obtained messages',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of messages.',
              items: {
                $ref: '#/components/schemas/Message',
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

export default listMessages;
