import express from "express";
import { login, me, register } from "../services/api/user.services";

const userRouter = express.Router()

userRouter.get('/me', me)

userRouter.post('/login', login)
userRouter.post('/register', register)

export default userRouter