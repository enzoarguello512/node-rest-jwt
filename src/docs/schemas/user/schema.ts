const userSchema = {
  title: 'User',
  required: [
    'email',
    'password',
    'firstName',
    'age',
    'phoneNumber',
    'permissionLevel',
  ],
  properties: {
    email: {
      type: 'string',
      description: 'User email',
    },
    password: {
      type: 'string',
      description: 'User password',
    },
    firstName: {
      type: 'string',
      description: 'User first name',
    },
    lastName: {
      type: 'string',
      required: false,
      description: 'User last name',
    },
    address: {
      type: 'string',
      required: false,
      description: 'User shipping address',
    },
    age: {
      type: 'number',
      description: 'User age',
    },
    phoneNumber: {
      type: 'string',
      description: 'User phone number',
    },
    imageId: {
      type: 'string',
      required: false,
      description: 'User image id when saved to cloudinary',
    },
    imageUrl: {
      type: 'string',
      required: false,
      description: 'User image url',
    },
    permissionLevel: {
      type: 'number',
      description: 'User permission level',
    },
    refreshToken: {
      type: 'array',
      required: false,
      description: 'Array of the 10 most recent refresh tokens of the user',
      items: {
        type: 'string',
      },
    },
    cart: {
      type: 'string',
      required: false,
      description: "User's cart id (if any)",
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

export default userSchema;
