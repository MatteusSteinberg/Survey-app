import { HandlerResponse } from "./base-handler"

type APIError = (error?: string) => HandlerResponse

export const notFoundError: APIError = (error) => ({ status: 404, data: { error: error || "not_found" } })

export const badRequestError: APIError = (error) => ({ status: 400, data: { error: error || "bad_request" } })

export const unauthorizedError: APIError = (error) => ({ status: 401, data: { error: error || "unauthorized" } })
