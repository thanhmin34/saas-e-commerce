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

export const addToCartCart = async (params: IAddProductToCart) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.ADD_TO_CART}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
export const removeToCartCart = async ({}) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.CART}`
    const responsive = await post(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useUpdateCart = () => {
  const { getCartDetails } = useCart()
  const cart = useSelector((state: RootState) => state.cartData)

  const { handleAddCartToModal } = useCartContext()
  const { showToast, typeToast } = useToastMessage()
  const { mutate: addToCartMutation, isLoading: isLoadingAddToCart } = useMutation('add-to-cart', {
    mutationFn: addToCartCart,
  })

  const { mutate: removeToCartMutation, isLoading: isLoadingRemoveToCart } = useMutation('add-to-cart', {
    mutationFn: removeToCartCart,
  })

  const handleAddToCart = (params: IAddProductItem) => {
    if (!cart.cart_id) {
      showToast('cart_id not exist', typeToast.error)
      return
    }

    const { product } = params || {}
    const { id, quantity, sku } = product || {}

    const newParams: IAddProductToCart = {
      product: {
        id,
        quantity,
        sku,
      },
      cart_id: cart.cart_id,
    }

    addToCartMutation(newParams, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          // reset cart
          handleAddCartToModal(params)
          showToast(data?.message, typeToast.success)
          getCartDetails(cart.cart_id)
        } else if ('response' in data) {
          showToast(data?.response?.data?.message, typeToast.error)
        }
      },
    })
  }
  const handleRemoveToCart = () => {}

  return { handleAddToCart, handleRemoveToCart, isLoading: isLoadingAddToCart || isLoadingRemoveToCart }
}

export default useUpdateCart
