'use client'
import { useQuery } from 'react-query'
import { getReviews } from '@lib/service'

const useReviews = ({ productId }: { productId: number }) => {
  const { isLoading, error, data, refetch } = useQuery(['reviews', productId], () => getReviews({ productId }), {
    refetchOnWindowFocus: false,
    enabled: !!productId,
  })

  const handleRefetchReviews = () => {
    refetch()
  }

  return {
    isLoading,
    error,
    data,
    handleRefetchReviews,
  }
}

export default useReviews
