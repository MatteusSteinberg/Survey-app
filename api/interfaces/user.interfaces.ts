import { Document, Model, Types } from 'mongoose';

export interface IUser {
  id?: any
  username: string
  email: string
  password: string,
}

export interface IUserDoc extends IUser, Document {

}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
}