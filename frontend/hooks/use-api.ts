import axios, { AxiosRequestConfig } from "axios"
import _ from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"

export interface useAPIOptions {
  /** Will retrieve GET method data - default: true */
  autoGet?: boolean
  config?: AxiosRequestConfig
  array?: boolean
}

const defaultOptions: useAPIOptions = {
  autoGet: true,
  array: false
}

type RequestMethod = "post" | "patch" | "delete"

interface IBodyRequest<T = any> {
  method?: RequestMethod
  withQueryString?: boolean
  body?: Partial<T>,
  /** Avoid updating the useAPI requestData state, should generally be avoided to keep data trustworthy */
  noRequestUpdate?: boolean,
  id?: string
}

export interface IRequestData<T = any> {
  error?: any
  loading?: boolean
  data?: T
  statusCode?: number
}

const useAPI = <T>({ url, params, id }: { url: string; params?: any; id?: string }, opts: useAPIOptions = defaultOptions) => {
  opts = { ...defaultOptions, ...opts }

  url = `${process.env.EXPO_PUBLIC_API_URL || ''}/api${url}` + (id ? `/${id}` : "")

  const queryString = useMemo(() => {
    const qStr = new URLSearchParams(params || {}).toString().trim()
    return !!qStr && !!params ? `?${qStr}` : ""
  }, [params])

  const [requestData, setRequestData] = useState<IRequestData<T>>({})

  const fetcher = useCallback(async () => {

    try {
      const defaultUrl = url + queryString

      const { data, status } = await axios.get(defaultUrl, opts.config)

      const requestData: IRequestData<T> = { data, statusCode: status, loading: false, error: undefined }

      setRequestData(requestData)

    } catch (error: any) {
      console.error(error)
      setRequestData((r) => ({ ...r, error: error?.response?.data?.error || error, loading: false }))
    }
  }, [url, queryString, opts.config, setRequestData])

  const create = async <T>({ body, withQueryString, noRequestUpdate }: IBodyRequest<T>) => {
    if (!noRequestUpdate) {
      setRequestData(r => ({ ...r, loading: true }))
    }

    try {
      const { data, status } = await axios.post(`${url}${withQueryString ? queryString : ""}`, body, opts.config)

      if (!noRequestUpdate) {
        setRequestData({ data, statusCode: status, loading: false, error: data?.error })
      }

      return { data, statusCode: status, loading: false, error: data?.error }
    } catch (error: any) {
      console.error(error)
      setRequestData((r) => ({ ...r, error: error?.response?.data?.error || error, loading: false }))
      return { data: error.response?.data, statusCode: error.response?.status, error: error.response?.data.error }
    }
  }

  const update = async <T>({ body, withQueryString, id, noRequestUpdate }: IBodyRequest<T>) => {
    setRequestData(r => ({ ...r, loading: true }))

    try {
      const { data, status } = await axios.patch(`${url}${id ? `/${id}` : ""}${withQueryString ? queryString : ""}`, body, opts.config)

      if (!noRequestUpdate) {
        setRequestData({ data: data as any, statusCode: status, loading: false, error: undefined })
      }

      return { data, statusCode: status, loading: false, error: data?.error }
    } catch (error: any) {
      setRequestData((r) => ({ ...r, error: error?.response?.data?.error || error, loading: false }))
      return { data: error.response?.data, statusCode: error.response?.status, error: error.response?.data.error }
    }
  }

  const mutate = async () => {
    await fetcher()
  }

  /** Avoid using get here, get methods are meant to be used by autoGet and mutating */
  const request = async <T>({ method, path = "", body, withQueryString, noRequestUpdate }: IBodyRequest<T> & { method: RequestMethod, path?: string }) => {
    setRequestData(r => ({ ...r, loading: true }))

    try {
      const { data, status }: { data: T; status: number } = await axios[method](`${url}${path}${withQueryString ? queryString : ""}`, body, opts.config)

      if (!noRequestUpdate) {
        setRequestData({ data: data as any, statusCode: status, loading: false, error: undefined })
      }

      return { data, statusCode: status, loading: false, error: undefined }
    } catch (error: any) {
      console.error(error)
      setRequestData((r) => ({ ...r, error: error?.response?.data?.error || error, loading: false }))

      return { data: error.response?.data, statusCode: error.response?.status, error: error.response?.data.error }
    }
  }

  // ! Avoid using this for arrays
  const setData = useCallback((data: Partial<T> | undefined) => {
    setRequestData((r) => ({ ...r, data: !!data ? _.defaults(data, r.data) : undefined }))
  }, [])

  // Will render twice in development: https://stackoverflow.com/a/72238236
  useEffect(() => {
    if (opts.autoGet) {
      fetcher()
    }
  }, [url, opts.autoGet, fetcher])

  return {
    ...requestData,
    setData,
    create,
    update,
    mutate,
    request,
  }
}

export default useAPI
