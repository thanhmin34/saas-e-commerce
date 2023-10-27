import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { BACKEND_URL } from '@utils/runtimeEnvironment'
import STORAGE_KEYS from '@constants/storageKeys'
import { ROUTER_PATHS } from '@constants/routerPaths'

const apiClient = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const reqInstance = axios.create({
    baseURL: BACKEND_URL || 'http://localhost:5000/',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  const unAuthorized = (status: number | undefined) => {
    return status === 401
  }

  const get = async (uri: string, config: AxiosRequestConfig<any> | undefined = {}) => {
    try {
      const response = await reqInstance.get(uri, config)
      return response?.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (unAuthorized(axiosError?.response?.status)) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        window.location.replace(ROUTER_PATHS.LOGIN)
      }
      return error as AxiosError
    }
  }

  const post = async (uri: string, params?: unknown, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      const response = await reqInstance.post(uri, params, config)
      return response?.data
    } catch (error) {
      return error as AxiosError
    }
  }

  const put = async (uri: string, params: any, config: AxiosRequestConfig<any> | undefined) => {
    try {
      const response = await reqInstance.patch(uri, params, config)
      return response?.data
    } catch (error) {
      console.error(error)
      return error as AxiosError
    }
  }

  const remove = async (uri: string, config: AxiosRequestConfig<any> | undefined) => {
    try {
      const response = await reqInstance.delete(uri, config)
      return response?.data
    } catch (error) {
      console.error(error)
      return error as AxiosError
    }
  }

  return {
    get,
    put,
    post,
    remove,
  }
}

export default apiClient
