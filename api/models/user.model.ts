import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import { IUserDoc, IUserModel } from '../interfaces/user.interfaces';
import formatDocument from '../lib/plugins/format-document';

const userSchema = new Schema<IUserDoc, IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    select: false
  },
}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
userSchema.plugin(formatDocument);

userSchema.static('isEmailTaken', async function (email: string, excludeUserId: Types.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  user.username = user.username.replace(/ /g, "-");
  next();
});

const userModel = model<IUserDoc, IUserModel>('User', userSchema);

export default userModel;