import { Document, model, PassportLocalSchema, PassportLocalModel, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
  //   email: string;
  username: string;
}

const userSchema = new Schema({
  //   email: String,
  username: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
});

export const User: PassportLocalModel<IUser> = model('User', userSchema as PassportLocalSchema);
