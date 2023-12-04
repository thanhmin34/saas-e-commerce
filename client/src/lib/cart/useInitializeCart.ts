'use client'
import { get } from 'lodash'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import useCreateCart from './useCreateCart'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'
import useCart from './useCartDetails'

export const checkCartIsAuth = async (params: { cart_id: string }) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.CHECK_CART_IS_AUTH}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

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
