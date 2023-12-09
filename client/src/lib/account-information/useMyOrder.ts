import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import useToastMessage from '@hooks/useToastMessage'
import { CACHE_TIME, STALE_TIME } from '@constants/variables'

import { getMyOrderList } from '@lib/service'
import { setOrders } from '@redux/actions/ordersActions'

const useMyOrders = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch()
  const { showToast, typeToast } = useToastMessage()

  const {
    isLoading: isLoadingOrders,
    error,
    data,
    refetch,
  } = useQuery('myOrders', getMyOrderList, {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      console.log('data', data)

      if (data && 'orders' in data) {
        dispatch(setOrders(data?.orders))
      }
    },
    enabled,
  })

  return {
    isLoading: !!isLoadingOrders,
    error,
    data,
  }
}

export default useMyOrders
