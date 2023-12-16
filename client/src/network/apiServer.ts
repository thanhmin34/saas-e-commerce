import { BACKEND_URL } from '@constants/variables'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const apiServer = () => {
  const reqInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
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

  return {
    get,
  }
}

export default apiServer
