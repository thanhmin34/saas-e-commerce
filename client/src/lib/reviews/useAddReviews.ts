'use client'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import { IProductReviewsItem, IProductReviewsParams } from '@interfaces/product/productDetails'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useToastMessage from '@hooks/useToastMessage'

const addReviews = async (params: IProductReviewsItem) => {
  const { post } = apiClient()
  try {
    const url = `${APIS.REVIEWS}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

const useAddReviews = ({ productId }: { productId: number }) => {
  const { showToast, typeToast } = useToastMessage()

  const { mutate: addRatingMutation, isLoading } = useMutation('addReviews', {
    mutationFn: addReviews,
  })

  const handleSubmit = async (params: IProductReviewsParams, callback?: (status: boolean) => void) => {
    addRatingMutation(
      { ...params, product_id: productId },
      {
        onSuccess(data, variables, context) {
          if ('status' in data) {
            callback && callback(data?.status)
            showToast(data?.message, typeToast.success)
            return
          }
          showToast(data?.response?.data?.message, typeToast.error)
        },
      }
    )
  }

  return {
    isLoading,
    handleSubmit,
  }
}

export default useAddReviews
