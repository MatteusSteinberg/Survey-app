import jwt from "jsonwebtoken"
import moment from "moment"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../interfaces/user.interfaces"

export interface IAuthToken {
  id: string
  exp: number
  iat: number
}

const getAuthToken = (user: HydratedDocument<IUser>) => {
  let expires = moment().utc().add({ days: 7 }).unix()
  let token = jwt.sign({
    id: user.id,
    iat: moment().utc().unix()
  } as IAuthToken, process.env.SECRET as string, { expiresIn: "7d" })

  return {
    token: token,
    expires: moment.unix(expires).format()
  }
}

export default getAuthToken