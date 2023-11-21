import { Types } from "mongoose"
import { IUser } from "./user.interfaces"


export interface IForm {
  id: any,
  name?: string,
  createdBy: IUser | Types.ObjectId | string
  pin?: number,
  fields: IFormField[]
}

export type FormFieldType = "text" | "multiple" | "image"

export interface IFormFieldOption {
  order?: number,
  isChecked?: boolean,
  name?: string
}
export interface IFormField {
  type: FormFieldType
  fieldTitle?: string
  order?: number
  options?: IFormFieldOption[],
  answer?: {
    text?: string
    multiple?: any[]
    image?: any
  }
}

export interface IFormFieldComponent extends IFormField {
  onTitleChange: (title: string) => void,
  onTextAnswerChange?: (answer: string) => void,
  onMultipleAnswerChange?: () => void,
  onAddOption?: () => void,
  onOptionChange?: (path: string, value: any, order: number) => void,
  onImageChange?: () => void,
  isAnswering?: boolean
}