import baseHandler from '../helpers/base-handler'
import { badRequestError, unauthorizedError } from '../helpers/errors'
import getAuthToken from '../helpers/auth-token-generation'
import userModel from '../../models/user.model'

import bcrypt from 'bcrypt'
import * as EmailValidator from "email-validator"

export const login = baseHandler(async ({ body }) => {
  const { email, password } = body

  const user = await userModel.findOne({ email }).select('email password')

  if (user && await bcrypt.compare(password, user.password)) {

    const token = getAuthToken(user)

    return { data: token, status: 200 }
  } else {
    return unauthorizedError()
  }
})

export const register = baseHandler(async ({ body }) => {
  const { username, email, password } = body as { email: string, username?: string, password?: string, repeatPassword?: string }

  const user = await userModel.findOne({
    $or: [
      {
        username: { $eq: username }
      },
      {
        email: { $eq: email }
      }
    ]
  })

  if (user) {
    if (user.email === email) {
      return badRequestError("email_occupied")
    }
    if (user.username === username) {
      return badRequestError("username_occuped")
    }
  }

  if (EmailValidator.validate(email) === false) {
    return badRequestError("email_invalid")
  }

  const newUser = await userModel.create({
    email,
    username,
    password,
  })

  return { data: { id: newUser.id }, status: 200 }
})

export const me = baseHandler(async ({ user }) => {

  return { data: user, status: 200 }
})