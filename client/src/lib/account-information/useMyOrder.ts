import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import useToastMessage from '@hooks/useToastMessage'
import { CACHE_TIME, STALE_TIME } from '@constants/variables'

import { getMyOrderList } from '@lib/service'
import { setOrders } from '@redux/actions/ordersActions'
import { useState } from 'react'
import { PAGE_SIZE } from '@constants/account'

const useMyOrders = ({ enabled }: { enabled?: boolean }) => {
  const dispatch = useDispatch()
  const { showToast, typeToast } = useToastMessage()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE.DESKTOP)
  const {
    isLoading: isLoadingOrders,
    error,
    data,
  } = useQuery(
    ['myOrders', currentPage, pageSize],
    () =>
      getMyOrderList({
        currentPage,
        pageSize,
      }),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data && 'orders' in data) {
          const { orders, total_count } = data || {}
          dispatch(
            setOrders({
              orders,
              total_count,
            })
          )
        }
      },
    }
  )

  return {
    isLoading: !!isLoadingOrders,
    error,
    data,
    setCurrentPage,
    currentPage,
  }
}

export default useMyOrders
