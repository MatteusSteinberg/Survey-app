import express from "express";
import { mine, submit } from "../services/api/submission.services";

const submissionRouter = express.Router()

submissionRouter.get("/mine", mine)

submissionRouter.post("/", submit)

export default submissionRouter