'use client'
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
const { post, remove, put } = apiClient()

export const addToCartCart = async (params: IAddProductToCart) => {
  try {
    let url = `${APIS.ADD_TO_CART}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
export const removeToCartCart = async ({ cart_id, product_id }: { cart_id: string; product_id: number }) => {
  try {
    let url = `${APIS.REMOVE_PRODUCT_TO_CART}?cart_id=${cart_id}&&product_id=${product_id}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const updateProductToCart = async (params: {
  cart_id: string
  product: {
    product_id: number
    quantity: number
  }
}) => {
  try {
    let url = `${APIS.ADD_TO_CART}`
    const responsive = await put(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useUpdateCart = () => {
  const { refetch } = useCart()
  const cart = useSelector((state: RootState) => state.cartData)

  const { handleAddCartToModal } = useCartContext()
  const { showToast, typeToast } = useToastMessage()
  const { mutate: addToCartMutation, isLoading: isLoadingAddToCart } = useMutation('addProductToCart', {
    mutationFn: addToCartCart,
  })

  const { mutate: removeToCartMutation, isLoading: isLoadingRemoveToCart } = useMutation('removeProductToCart', {
    mutationFn: removeToCartCart,
  })

  const { mutate: updateQtyMutation, isLoading: isLoadingUpdateQty } = useMutation('updateQtyCart', {
    mutationFn: updateProductToCart,
  })

  const handleAddToCart = (params: IAddProductItem) => {
    const { product } = params || {}
    const { id, quantity, sku } = product || {}

    const newParams: IAddProductToCart = {
      product: {
        id,
        quantity,
        sku,
      },
      cart_id: cart?.cart_id,
    }

    addToCartMutation(newParams, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          // reset cart
          handleAddCartToModal(params)
          showToast(data?.message, typeToast.success)
          refetch()
        } else if ('response' in data) {
          showToast(data?.response?.data?.message, typeToast.error)
        }
      },
    })
  }
  const handleRemoveToCart = async (params: { product_id: number }) => {
    if (!cart.cart_id) {
      showToast('cart_id not exist', typeToast.error)
      return
    }

    const newParams = {
      ...params,
      cart_id: cart?.cart_id,
    }

    removeToCartMutation(newParams, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          showToast(data?.message, typeToast.success)
          refetch()
        } else if ('response' in data) {
          showToast(data?.response?.data?.message, typeToast.error)
        }
      },
    })
  }

  const handleUpdateQty = async (params: { product_id: number; quantity: number }) => {
    if (!cart.cart_id) {
      showToast('cart_id not exist', typeToast.error)
      return
    }

    const newParams = {
      product: params,
      cart_id: cart?.cart_id,
    }

    updateQtyMutation(newParams, {
      onSuccess(data, variables, context) {
        if ('status' in data) {
          showToast(data?.message, typeToast.success)
          refetch()
        } else if ('response' in data) {
          showToast(data?.response?.data?.message, typeToast.error)
        }
      },
    })
  }

  return {
    handleAddToCart,
    handleRemoveToCart,
    handleUpdateQty,
    isLoading: !!isLoadingAddToCart || !!isLoadingRemoveToCart || !!isLoadingUpdateQty,
  }
}

export default useUpdateCart
