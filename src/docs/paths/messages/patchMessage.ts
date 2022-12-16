const patchMessage = {
  patch: {
    tags: ['Messages'],
    description:
      'Update an existing message, only available for logged in admin user.',
    operationId: 'patchMessage',
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
    requestBody: {
      required: 'true',
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/Message',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Message updated successfully.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
            },
          },
        },
      },
      400: {
        description:
          'One or more of the message properties do not meet the proper conditions.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
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
        description: 'The message to update does not exist.',
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

export default patchMessage;
