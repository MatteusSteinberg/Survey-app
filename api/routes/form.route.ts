import express from "express"
import { create, get, mine } from "../services/api/form.services"

const formRouter = express.Router()

formRouter.get('/', mine)

formRouter.get('/:id', get)

formRouter.post('/', create)

export default formRouter