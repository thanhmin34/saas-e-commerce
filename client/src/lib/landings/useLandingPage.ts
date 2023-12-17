import { useQuery } from 'react-query'
import { CACHE_TIME } from '@constants/variables'
import { getHomePages } from '@lib/service'

const useLandingPage = () => {
  const { isLoading, error, data, refetch } = useQuery('homePages', getHomePages, {
    cacheTime: CACHE_TIME,
    refetchOnWindowFocus: false,
  })

  return { isLoading, error, data, refetch }
}

export default useLandingPage
