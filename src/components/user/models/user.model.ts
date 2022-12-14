import { EPermissionLevel } from '../../../common/types/common.permissionlevel.enum';
import MongooseService from '../../../services/mongoose/mongoose.service';
import bcryptjs from 'bcryptjs';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IUserModel } from '../../../common/types/user.model.interface';

const Schema = MongooseService.getMongoose().Schema;

export const userSchema = new Schema<ICreateUserDto, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      description: 'User email',
    },
    password: {
      type: String,
      required: true,
      select: false,
      description: 'User password',
    },
    firstName: { type: String, required: true, description: 'User first name' },
    lastName: { type: String, required: false, description: 'User last name' },
    address: {
      type: String,
      required: false,
      description: 'User shipping address',
    },
    age: { type: Number, required: true, description: 'User age' },
    phoneNumber: {
      type: String,
      required: true,
      description: 'User phone number',
    },
    imageId: {
      type: String,
      required: false,
      default: 'Users/avatar.jpg',
      description: 'User image id when saved to cloudinary or file to upload',
    },
    imageUrl: {
      type: String,
      required: false,
      default:
        'https://res.cloudinary.com/enzoarguello512/image/upload/v1667251875/Users/avatar.svg',
      description: 'User image url',
    },
    permissionLevel: {
      type: Number,
      required: true,
      default: EPermissionLevel.FREE_PERMISSION,
      description: 'User permission level',
    },
    refreshToken: {
      type: [String],
      required: false,
      description: 'Array of the 10 most recent refresh tokens of the user',
    },
    cart: {
      type: 'ObjectId',
      ref: 'Cart',
      required: false,
      description: "User's cart id (if any)",
    },
  },
  {
    timestamps: true,
  }
);

// Used on the user model
// e.g req.body.password = await User.encryptPassword(req.body.password);
userSchema.statics.encryptPassword = async function (
  password: string
): Promise<string> {
  return await bcryptjs.hash(password, 10);
};

// Used on top of mongoose's answer
/*
  e.g
  const foundUser = await usersService.getUserByEmailWithPassword(
    req.body.email
  );
  await foundUser.comparePassword(req.body.password)
*/
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = MongooseService.getMongoose().model<
  ICreateUserDto,
  IUserModel
>('User', userSchema);
