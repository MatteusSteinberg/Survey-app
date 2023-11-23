import { IForm } from "../../interfaces/form.interfaces"
import formModel from "../../models/form.model"
import baseHandler from "../helpers/base-handler"
import Form from "../utils/form.utils"

export const create = baseHandler(async ({ body, user }) => {
  const form = body as IForm

  const result = await Form.create(form, user!!)

  return { data: result, status: 201 }
}, true)

export const update = baseHandler(async ({ params, body, user }) => {
  const form = body as IForm
  const { id } = params as { id: string }

  console.log("hvad sker der?", form, id)

  const result = await Form.update(id, form, user)

  return { data: result, status: 201 }
})

export const mine = baseHandler(async ({ user, query }) => {

  const forms = await Form.index(user!!, query?.search)

  return { data: forms, status: 200 }
}, true)

export const get = baseHandler(async ({ params }) => {
  const { id } = params

  const form = await formModel.findById(id)

  return { data: form, status: 200 }
})

export const pinGet = baseHandler(async ({ params }) => {
  const { pin }: { pin: string } = params

  const form = await Form.findByPin(pin)

  return { data: form, status: 200 }
})