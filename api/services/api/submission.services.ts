import { ISubmission } from "../../interfaces/submission.interfaces"
import baseHandler from "../helpers/base-handler"
import Submission from "../utils/submission.utils"

export const submit = baseHandler(async ({ body, user }) => {
  const submission = body as ISubmission

  const result = await Submission.submit(submission, user!!)

  return { data: result, status: 201 }
}, true)

export const mine = baseHandler(async ({ user }) => {
  const forms = await Submission.index({ user: user!!._id })

  return { data: forms, status: 200 }
}, true)