import { IForm } from "../../interfaces/form.interfaces"
import formModel from "../../models/form.model"
import baseHandler from "../helpers/base-handler"
import Form from "../utils/form.utils"

export const create = baseHandler(async ({ body, user }) => {
  const form = body as IForm

  console.log("form", form)

  const result = await Form.create(form, user!!)

  return { data: result, status: 201 }
}, true)

export const mine = baseHandler(async ({ body, user }) => {

  const forms = await Form.index(user!!)

  return { data: forms, status: 200 }
}, true)

export const get = baseHandler(async ({ params }) => {
  const { id } = params

  const form = await formModel.findById(id)

  return { data: form, status: 200 }
})