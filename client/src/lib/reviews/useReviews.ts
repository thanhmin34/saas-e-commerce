'use client'
import { AxiosError } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'

const getReviews = async ({ productId }: { productId: number }) => {
  const { get } = apiClient()
  try {
    const url = `${APIS.REVIEWS}/${productId}`
    const responsive = await get(url)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

const useReviews = ({ productId }: { productId: number }) => {
  const { isLoading, error, data, refetch } = useQuery(['reviews', productId], () => getReviews({ productId }), {
    refetchOnWindowFocus: false,
    enabled: !!productId,
  })

  const handleRefetchReviews = () => {
    // todo
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
