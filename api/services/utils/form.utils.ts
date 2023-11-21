import { IForm } from "../../interfaces/form.interfaces"
import { IUser } from "../../interfaces/user.interfaces"
import formModel from "../../models/form.model"


namespace Form {
  export const create = async (form: IForm, user: IUser) => {
    const result = await formModel.create({
      ...form,
      createdBy: user
    })

    return result
  }

  export const index = async (user: IUser) => {
    const forms = await formModel.
      find({ createdBy: user.id })
      .sort({ _id: -1 })

    return forms
  }
}

export default Form