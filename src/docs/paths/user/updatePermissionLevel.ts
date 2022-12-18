const updatePermissionLevel = {
  patch: {
    tags: ['Users'],
    description: 'Update the permission level of a specific user.',
    operationId: 'updatePermissionLevel',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single user id',
      },
      {
        name: 'permissionLevel',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single permission level',
      },
    ],
    responses: {
      204: {
        description: 'User updated successfully.',
      },
      400: {
        description:
          'One or more of the user properties do not meet the proper conditions.',
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
        description: 'The user to update does not exist.',
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

export default updatePermissionLevel;
