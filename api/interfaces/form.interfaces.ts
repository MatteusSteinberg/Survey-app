import { Types } from "mongoose"
import { IUser } from "./user.interfaces"


export interface IForm {
  id: any,
  createdBy: IUser | Types.ObjectId | string
  pin?: number
}