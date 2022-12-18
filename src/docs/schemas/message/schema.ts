const messageSchema = {
  title: 'Message',
  properties: {
    user: {
      type: 'string',
      description: 'User id',
    },
    text: {
      type: 'string',
      description: 'Message text',
    },
    type: {
      type: 'string',
      enum: ['user', 'server'],
      description: 'Message type (user | server)',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export default messageSchema;
