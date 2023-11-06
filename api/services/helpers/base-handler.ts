import { NextFunction, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../interfaces/user.interfaces"

export type HandlerResponse =
  | {
    /** `res.status(status)` */
    status: number
    /** `res.json(data)` */
    data: any
    redirect?: string
  }
  | {
    /** `res.status(status).redirect(redirect)` */
    status: number
    redirect: string
    data?: any
  }
  | {
    /** `res.status(status).pipe(stream)` */
    status: number
    data?: any
    redirect?: string
  }

export type HandlerRequest = {
  body: any
  params: any
  query: any
  user: HydratedDocument<IUser> | undefined
}

const baseHandler = (cb: (request: HandlerRequest) => Promise<HandlerResponse>, requiresAuth?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (requiresAuth && !req.user) {
      res.status(401).json({ message: "Method not allowed without being logged in." })
      next()
      return
    }

    try {
      const { data, status, redirect } = await cb({ body: req.body, params: req.params, query: req.query, user: req.user as any })

      if (redirect) {
        res.redirect(status, redirect)
        return redirect
      }

      res.status(status).json(data)
      return data
    } catch (err) {
      res.status(500).json({ message: "Internal server error" })

      next(err)
    }
  }
}

export default baseHandler
