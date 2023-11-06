import { Types } from "mongoose"
import { IForm } from "./form.interfaces"
import { IUser } from "./user.interfaces"

export interface ISubmissionFilter {
  form?: string | Types.ObjectId,
  user?: string | Types.ObjectId,
  deviceId?: string,
  formCreatedBy?: string | Types.ObjectId
}

export interface ISubmission {
  id: any,
  submittedBy?: IUser | Types.ObjectId | string,
  deviceId: string,
  form: IForm | Types.ObjectId | string
}