import { badRequestError } from '../helpers/errors'
import { ISubmission } from "../../interfaces/submission.interfaces"
import baseHandler from "../helpers/base-handler"
import Submission from "../utils/submission.utils"
import submissionModel from '../../models/submission.model'

export const submit = baseHandler(async ({ body, user }) => {
  const submission = body as ISubmission

  const alreadySubmitted = await submissionModel.findOne({ form: submission.form, deviceId: submission.deviceId })
  if (alreadySubmitted) {
    return badRequestError('You have already submitted this form')
  }

  const result = await Submission.submit(submission, user!!)

  return { data: {result}, status: 201 }
})

export const mine = baseHandler(async ({ user }) => {
  const forms = await Submission.index({ user: user!!._id })

  return { data: forms, status: 200 }
}, true)