import { NextFunction, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../interfaces/user.interfaces"
import readFile from "./read-file"
import { IFile } from "../../interfaces/file.interfaces"

export type HandlerResponse =
  | {
    /** `res.status(status)` */
    status: number
    /** `res.json(data)` */
    data: any
    redirect?: string
    file?: File
  }
  | {
    /** `res.status(status).redirect(redirect)` */
    status: number
    redirect: string
    data?: any
    file?: File
  }
  | {
    /** `res.status(status).pipe(stream)` */
    status: number
    data?: any
    redirect?: string
    file?: File
  }
  | {
    status: number
    data?: any
    redirect?: string
    file: File
  }

export type HandlerRequest = {
  body: any
  params: any
  query: any
  user: HydratedDocument<IUser> | undefined
  file?: Express.MulterS3.File
}

export type File = Partial<IFile>

const baseHandler = (cb: (request: HandlerRequest) => Promise<HandlerResponse>, requiresAuth?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (requiresAuth && !req.user) {
      res.status(401).json({ message: "Method not allowed without being logged in." })
      next()
      return
    }

    try {
      const { data, status, redirect, file } = await cb({ file: req.file as any, body: req.body, params: req.params, query: req.query, user: req.user as any})

      if (redirect) {
        res.redirect(status, redirect)
        return redirect
      }


      if (file) {
        const stream = await readFile(file.key)
        res.setHeader("Content-Type", file.contentType)
        stream.pipe(res)
        res.status(200)
        return file // For testing
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
