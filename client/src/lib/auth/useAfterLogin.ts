import { get } from 'lodash'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { RootState } from '@redux/reducers'
import useCart from '@lib/cart/useCartDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSignIn, setUserInfo } from '@redux/actions/userInfoAction'
import { getCustomerInfo, mergeCart } from '@lib/service'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'

export const useAfterLogin = () => {
  const dispatch = useDispatch()
  const { getCartDetails } = useCart()
  const storage = new LocalStorageManager()
  const cart = useSelector((state: RootState) => state.cartData)

  const {
    mutate: mergeCartsMutation,
    isLoading,
    data: newCartIdData,
  } = useMutation({
    mutationKey: 'mergerCart',
    mutationFn: mergeCart,
  })

  const mergeCarts = async (params: { sourceCartId: string; destinationCartId: string }) => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const { sourceCartId, destinationCartId } = params || {}
        mergeCartsMutation(
          {
            source_cart_id: sourceCartId,
            destination_cart_id: destinationCartId,
          },
          {
            onSuccess: (data) => {
              const { newCartId } = data || {}
              if (newCartId) {
                storage.setItem(STORAGE_KEYS.CART_ID, newCartId)
                getCartDetails(newCartId)
                dispatch(setIsSignIn(true))
                resolve(true)
                return
              }
              resolve(false)
            },
          }
        )
      } catch (error) {
        return error
      }
    })
  }

  const handleCartAfterLogin = useCallback(async () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const oldCartId = get(cart, 'cart_id')
        const customer = await getCustomerInfo()
        const { cart_id, user } = customer || {}
        user && dispatch(setUserInfo(user))
        const value = await mergeCarts({
          sourceCartId: oldCartId,
          destinationCartId: cart_id,
        })
        resolve(value)
        // return customer
      } catch (error) {}
    })
  }, [cart])

  return {
    handleCartAfterLogin,
  }
}
