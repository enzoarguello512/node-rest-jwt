import { EPermissionLevel } from '../../../common/types/common.permissionlevel.enum';
import MongooseService from '../../../services/mongoose/mongoose.service';
import bcryptjs from 'bcryptjs';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IUserModel } from '../../../common/types/user.model.interface';

const Schema = MongooseService.getMongoose().Schema;

export const userSchema = new Schema<ICreateUserDto, IUserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: String,
    permissionLevel: {
      type: Number,
      required: true,
      default: EPermissionLevel.FREE_PERMISSION,
    },
    age: { type: Number, required: true },
    address: String,
    country: { type: String, required: true },
    city: String,
    zipCode: { type: String, required: true },
    state: String,
    phoneNumber: { type: String, required: true },
    avatar: { type: String, required: true },
    avatarId: { type: String, required: true },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.encryptPassword = async function (
  password: string
): Promise<string> {
  return await bcryptjs.hash(password, 10);
};

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
