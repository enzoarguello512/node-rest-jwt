const removeMessage = {
  delete: {
    tags: ['Messages'],
    description:
      'Deletes an existing message, only available for logged in admin user.',
    operationId: 'removeMessage',
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
        description: 'Message deleted successfully.',
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
        description: 'The message to delete does not exist.',
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

export default removeMessage;
