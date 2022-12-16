const getMessageById = {
  get: {
    tags: ['Messages'],
    description: 'Get a specific message.',
    operationId: 'getMessageById',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/MessageId',
        },
        required: true,
        description: 'A single message id',
      },
    ],
    responses: {
      200: {
        description: 'Message was obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
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

export default getMessageById;
