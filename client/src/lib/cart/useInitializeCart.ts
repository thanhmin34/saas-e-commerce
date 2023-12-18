'use client'
import { get } from 'lodash'
import { useMutation } from 'react-query'
import useCreateCart from './useCreateCart'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'
import useCart from './useCartDetails'
import { checkCartIsAuth } from '@lib/service'

const useInitializeCart = () => {
  const storage = new LocalStorageManager()
  const { handleCreateNewCart } = useCreateCart()
  const { getCartDetails } = useCart()

  const { mutate, isLoading } = useMutation('cartIsAuth', {
    mutationFn: checkCartIsAuth,
  })

  const handleCheckCartIsAuth = async (cart_id: string) => {
    mutate(
      {
        cart_id,
      },
      {
        onSuccess: (data) => {
          if (data && 'cart_id' in data) {
            const cartId = get(data, 'cart_id')
            if (cartId) {
              getCartDetails(cartId)
            }
          }
        },
      }
    )
  }

  const initializeCart = async () => {
    try {
      const cartIdFromStorage = await storage.getItem(STORAGE_KEYS.CART_ID)
      if (!cartIdFromStorage) {
        const responsive = handleCreateNewCart()
        responsive.then((data) => {
          const cartId = get(data, 'cart_id')
          if (!cartId) return
          getCartDetails(cartId)
        })
      } else {
        await handleCheckCartIsAuth(cartIdFromStorage?.value)
      }
    } catch (error) {
      return
      //TODO
    }
  }

  return { initializeCart }
}

export default useInitializeCart
