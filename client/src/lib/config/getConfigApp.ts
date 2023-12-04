import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { getConfigApp } from '@lib/service'
import { setConfig } from '@redux/actions/configAction'

const useConfigApp = () => {
  const dispatch = useDispatch()
  const { isLoading, error, data } = useQuery('config', getConfigApp, {
    cacheTime: 50000,
    staleTime: 55000,
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
