import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'

const getData = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get(APIS.LANDING_PAGE)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

const useLandingPage = () => {
  const { isLoading, error, data, refetch } = useQuery('homePages', getData, {
    cacheTime: 50000,
    refetchOnWindowFocus: false,
  })

  return { isLoading, error, data, refetch }
}

export default useLandingPage
