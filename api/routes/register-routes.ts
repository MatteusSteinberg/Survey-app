import { Application } from "express"
import userRouter from "./user.route"

export default function registerRoutes(app: Application) {
  app.use("/api/user", userRouter)
}
