import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import STORAGE_KEYS from '@constants/storageKeys'
import { BACKEND_URL } from '@constants/variables'

const apiClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null
  const newToken = token ? JSON.parse(token) : null
  const reqInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      ...(newToken && 'value' in newToken && { Authorization: `Bearer ${newToken?.value}` }),
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
