import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import { IAddProductItem, IAddProductToCart } from '@interfaces/cart'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useToastMessage from '@hooks/useToastMessage'
import { useCartContext } from '@context/cartContextProvider'
import useCart from '@lib/cart/useCartDetails'
const { post, remove } = apiClient()

export const addCoupon = async (params: { code: string; cart_id: string }) => {
  try {
    let url = `${APIS.ADD_COUPON}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
export const removeCoupon = async ({ cart_id }: { cart_id: string }) => {
  try {
    let url = `${APIS.REMOVE_COUPON}?cart_id=${cart_id}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useCoupon = () => {
  const { refetch } = useCart()
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
          refetch()
          return
        }
        // showToast(data?.message, typeToast.error)
      },
      onError(error, variables, context) {
        console.log('error', error)
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
          refetch()
          showToast(data?.message, typeToast.success)
          return
        }
      },
      onError(error, variables, context) {
        console.log('error', error)
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
