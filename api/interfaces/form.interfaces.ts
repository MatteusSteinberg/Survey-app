import { Types } from "mongoose"
import { IUser } from "./user.interfaces"


export interface IForm {
  id: any,
  name?: string,
  createdBy: IUser | Types.ObjectId | string
  pin?: string,
  fields: IFormField[]
}

export type FormFieldType = "text" | "multiple" | "image"

export interface IFormFieldOption {
  _id?: any,
  order?: number,
  name?: string
}
export interface IFormField {
  _id?: any,
  type: FormFieldType
  fieldTitle?: string
  order?: number
  options?: IFormFieldOption[],
}

export interface IFormFieldComponent extends IFormField {
  onTitleChange?: (title: string) => void,
  onTextAnswerChange?: (answer: string) => void,
  onMultipleAnswerChange?: (multiple: string[]) => void,
  onAddOption?: () => void,
  onOptionChange?: (path: string, value: any, order: number) => void,
  onImageChange?: () => void,
  isAnswering?: boolean
}