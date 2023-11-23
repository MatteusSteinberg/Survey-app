import express from "express"
import { create, get, mine, pinGet, update } from "../services/api/form.services"

const formRouter = express.Router()

formRouter.get('/', mine)
formRouter.get('/:id', get)
formRouter.get('/pin/:pin', pinGet)

formRouter.post('/', create)

formRouter.patch('/:id', update)

export default formRouter