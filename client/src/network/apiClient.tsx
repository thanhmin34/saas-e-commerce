import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { BACKEND_URL } from '@utils/runtimeEnvironment'
import STORAGE_KEYS from '@constants/storageKeys'

const apiClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null

  const reqInstance = axios.create({
    baseURL: BACKEND_URL || 'http://localhost:5000/',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  const get = async (uri: string, config: AxiosRequestConfig<any> | undefined = {}) => {
    try {
      const response = await reqInstance.get(uri, config)
      return response?.data
    } catch (error) {
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

  const put = async (uri: string, params?: unknown, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      const response = await reqInstance.put(uri, params, config)
      return response?.data
    } catch (error) {
      console.error(error)
      return error as AxiosError
    }
  }

  const remove = async (uri: string, config?: AxiosRequestConfig<any> | undefined) => {
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
