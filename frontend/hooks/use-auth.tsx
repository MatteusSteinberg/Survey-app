import axios from "axios"
import _ from "lodash"
import React, { memo, useContext, useState } from "react"
import { IUser } from "../../api/interfaces/user.interfaces"
import useAPI, { IRequestData } from "./use-api"

interface IAuth {
  authenticate: (email: string, password: string) => Promise<{ error?: any }>
  unauthenticate: () => void
  setSession: () => void
  /** Partial update of user - does not need to be awaited */
  updateMe: (user: Partial<IUser>) => Promise<IRequestData<IUser>>
  loading: boolean,
  refresh: () => Promise<void>,
  user?: IUser
  username?: string
  token?: string,
  profilePicture: string,
  profileCover: string,
}

interface IAuthToken {
  /** ISO string Date */
  expires: string
  token: string
}

const AuthContext = React.createContext<IAuth>({} as any)

export const useAuth = () => {
  return useContext<IAuth>(AuthContext)
}

const api = (process.env.EXPO_PUBLIC_API_URL || '') + "/api"

export const AuthProvider = memo(({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined)

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }

  const { data, loading, mutate, update, setData } = useAPI<IUser>({ url: "/user" })

  const authenticate = async (email: string, password: string) => {
    try {
      const { data }: { data: IAuthToken } = await axios.post(`${api}/user/login`, {
        email,
        password,
      })

      setToken(data.token)

      await mutate()

      return {}
    } catch (error: any) {
      return { error: error }
    }
  }

  const unauthenticate = () => {
    setToken(undefined)
    setData(undefined)
    delete axios.defaults.headers.common.Authorization
  }

  const updateMe = async (user: Partial<IUser>) => {
    setData(_.cloneDeep(user))
    return await update({ body: user })
  }

  const context = {
    authenticate,
    unauthenticate,
    loading: !!loading,
    user: data,
    updateMe,
    refresh: mutate,
    username: data?.username,
    token
  } as IAuth

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
})
