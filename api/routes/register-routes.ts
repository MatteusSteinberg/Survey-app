import { Application } from "express"
import formRouter from "./form.route"
import submissionRouter from "./submission.route"
import userRouter from "./user.route"

export default function registerRoutes(app: Application) {
  app.use("/api/user", userRouter)
  app.use("/api/form", formRouter)
  app.use("/api/submission", submissionRouter)
}
