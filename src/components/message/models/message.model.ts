import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateMessageDto } from '../dto/create.message.dto';

const Schema = MongooseService.getMongoose().Schema;

export const messageSchema = new Schema<ICreateMessageDto>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    text: { type: String, require: true },
    type: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

messageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Message = MongooseService.getMongoose().model<ICreateMessageDto>(
  'Message',
  messageSchema
);
