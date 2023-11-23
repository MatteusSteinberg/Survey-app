import { Types } from "mongoose"
import { IForm } from "../../interfaces/form.interfaces"
import { IUser } from "../../interfaces/user.interfaces"
import formModel from "../../models/form.model"


namespace Form {
  export const create = async (form: IForm, user: IUser) => {
    const result = await formModel.create({
      ...form,
      pin: await uniquePincode(),
      createdBy: user
    })

    return result
  }

  export const update = async (id: string, form: IForm, user: IUser) => {
    const result = await formModel.findOneAndUpdate({ _id: new Types.ObjectId(id), createdBy: new Types.ObjectId(user.id) }, {
      $set: {
        name: form.name,
        fields: form.fields
      }
    })

    return result
  }

  const generatePincode = () => {
    const max = 999999

    const randomPin = Math.floor(Math.random() * (max + 1));

    const paddedPin = randomPin.toString().padStart(6, '0');

    return paddedPin
  }

  const uniquePincode = async () => {
    let pincode = ""
    let isUnique = false
    while (!isUnique) {
      pincode = generatePincode()

      const occupied = await formModel.exists({ pin: pincode })
      isUnique = !occupied
    }

    return pincode
  }

  export const findByPin = async (pin: string) => {
    return await formModel.findOne({ pin })
  }

  export const index = async (user: IUser, search?: string) => {
    const forms = await formModel.
      find({ createdBy: user.id, ...(!!search ? { name: { $regex: search } } : {}) })
      .sort({ _id: -1 })

    return forms
  }
}

export default Form