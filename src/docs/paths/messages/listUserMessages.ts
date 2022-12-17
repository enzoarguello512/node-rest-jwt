const listUserMessages = {
  get: {
    tags: ['Messages'],
    description: 'Get all messages from a specific user.',
    operationId: 'listUserMessages',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'userId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single user id',
      },
    ],
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
      404: {
        description: 'The message does not exist.',
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

export default listUserMessages;
