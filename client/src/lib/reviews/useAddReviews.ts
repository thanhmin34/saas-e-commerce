'use client'
import { useMutation } from 'react-query'
import { IProductReviewsParams } from '@interfaces/product/productDetails'
import useToastMessage from '@hooks/useToastMessage'
import { addReviews } from '@lib/service'

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
