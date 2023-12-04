import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { getAccountInformation } from '@lib/service'
import { CACHE_TIME, STALE_TIME } from '@constants/variables'
import { setUserInfo } from '@redux/actions/userInfoAction'

const useAccount = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch()
  const { isLoading, error, data, refetch } = useQuery('accountInformation', getAccountInformation, {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data && 'user' in data) {
        dispatch(setUserInfo(data.user))
      }
    },
    enabled,
  })
  return { isLoading, error, data, onRefetchAccountInfo: refetch }
}

export default useAccount
