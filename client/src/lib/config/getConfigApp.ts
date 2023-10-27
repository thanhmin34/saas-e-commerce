import { useQuery } from 'react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { useDispatch } from 'react-redux'
import { setConfig } from '@redux/actions/configAction'

export const getConfigApp = async () => {
  try {
    const res = await axios.get('http://localhost:5000/config')
    return res.data
  } catch (error) {
    return error as AxiosError
  }
}

const useConfigApp = () => {
  const dispatch = useDispatch()
  const { isLoading, error, data } = useQuery('config', getConfigApp, {
    cacheTime: 50000,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data && data.config_app) {
        dispatch(setConfig(data.config_app))
      }
    },
  })
  return { isLoading, error, data: data?.config_app }
}

export default useConfigApp
