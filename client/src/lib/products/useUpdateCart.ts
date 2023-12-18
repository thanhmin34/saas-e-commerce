'use client'
import { useMutation } from 'react-query'
import { IAddProductItem, IAddProductToCart } from '@interfaces/cart'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useToastMessage from '@hooks/useToastMessage'
import { useCartContext } from '@context/cartContextProvider'
import useCart from '@lib/cart/useCartDetails'
import { addToCartCart, removeToCartCart, updateProductToCart } from '@lib/service'

const useUpdateCart = () => {
  const { refetchCart } = useCart()
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

  const handleAddToCart = (params: IAddProductItem, isDisabledAction?: boolean) => {
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

    return new Promise<boolean>((resolve, reject) => {
      addToCartMutation(newParams, {
        onSuccess(data, variables, context) {
          if ('status' in data) {
            resolve(true)
            if (!isDisabledAction) {
              handleAddCartToModal(params)
              showToast(data?.message, typeToast.success)
              refetchCart()
            }
          } else if ('response' in data) {
            showToast(data?.response?.data?.message, typeToast.error)
            resolve(false)
          }
        },
      })
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
          refetchCart()
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
          refetchCart()
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
