import express from "express";
import { create, mine, submissions } from "../services/api/form.services";

const formRouter = express.Router()

formRouter.get('/', mine)
formRouter.get('/submissions', submissions)

formRouter.post('/', create)

export default formRouter