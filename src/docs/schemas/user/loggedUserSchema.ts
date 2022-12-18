const loggedUserSchema = {
  title: 'Logged User',
  properties: {
    id: {
      type: 'string',
      description: 'User id',
    },
    email: {
      type: 'string',
      description: 'User email',
    },
    firstName: {
      type: 'string',
      description: 'User first name',
    },
    permissionLevel: {
      type: 'number',
      description: 'User permission level',
    },
    cart: {
      type: 'string',
      required: false,
      description: "User's cart id (if any)",
    },
    messages: {
      type: 'string',
      required: false,
      description: "User's cart id (if any)",
    },
  },
};

export default loggedUserSchema;
