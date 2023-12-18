import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useToastMessage from '@hooks/useToastMessage'
import useCart from '@lib/cart/useCartDetails'
import { addCoupon, removeCoupon } from '@lib/service'

const useCoupon = () => {
  const { refetchCart } = useCart()
  const { showToast, typeToast } = useToastMessage()
  const cart = useSelector((state: RootState) => state.cartData)

  const {
    mutate: addCouponMutation,
    isLoading: isLoadingAddCoupon,
    error: errorAddCoupon,
  } = useMutation('addCoupon', {
    mutationFn: addCoupon,
  })

  const {
    error: errorRemoveCoupon,
    mutate: removeToCartMutation,
    isLoading: isLoadingRemoveCoupon,
  } = useMutation('removeCoupon', {
    mutationFn: removeCoupon,
  })

  const handleAddCoupon = async ({ code }: { code: string }) => {
    if (!cart.cart_id) {
      showToast('cart_id not exist', typeToast.error)
      return
    }
    const params = {
      code,
      cart_id: cart.cart_id,
    }
    addCouponMutation(params, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          showToast(data?.message, typeToast.success)
          refetchCart()
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }
  const handleRemoveCoupon = async () => {
    if (!cart.cart_id) {
      showToast('cart_id not exist', typeToast.error)
      return
    }
    const params = {
      cart_id: cart.cart_id,
    }
    removeToCartMutation(params, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          refetchCart()
          showToast(data?.message, typeToast.success)
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  return {
    handleAddCoupon,
    handleRemoveCoupon,
    isLoading: !!isLoadingAddCoupon || !!isLoadingRemoveCoupon,
    error: errorAddCoupon || errorRemoveCoupon,
  }
}

export default useCoupon
