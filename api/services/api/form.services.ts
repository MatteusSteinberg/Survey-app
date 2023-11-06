import { IForm } from "../../interfaces/form.interfaces"
import { ISubmissionFilter } from "../../interfaces/submission.interfaces"
import baseHandler from "../helpers/base-handler"
import Form from "../utils/form.utils"
import Submission from "../utils/submission.utils"

export const create = baseHandler(async ({ body, user }) => {
  const form = body as IForm

  const result = await Form.create(form, user!!)

  return { data: result, status: 201 }
}, true)

export const mine = baseHandler(async ({ body, user }) => {

  const forms = await Form.index(user!!)

  return { data: forms, status: 200 }
}, true)

export const submissions = baseHandler(async ({ user, query }) => {
  const { form } = query as ISubmissionFilter

  const result = await Submission.index({ form, formCreatedBy: user._id })

  return { data: [], status: 200 }
}, true)