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

export interface IDataCheckCartIsAuth {
  status: string
  message: string
  cart_id: string
}
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

  const { mutate, reset, error, isLoading } = useMutation('cartIsAuth', {
    mutationFn: checkCartIsAuth,
  })

  const handleCheckCartIsAuth = async (cart_id: any, callback: (data: IDataCheckCartIsAuth) => void) => {
    mutate(
      {
        cart_id,
      },
      {
        onSuccess: (data) => {
          callback(data)
        },
      }
    )
    // return data
  }

  const handleAfterCheckCart = async (data: IDataCheckCartIsAuth) => {
    const cartId = get(data, 'cart_id')

    if (cartId) {
      // if there was cart id from storage, refetch cart
      await getCartDetails(cartId)
    } else {
      // error
    }
  }

  const initializeCart = async () => {
    try {
      const cartIdFromStorage = await storage.getItem(STORAGE_KEYS.CART_ID)
      if (!cartIdFromStorage) {
        handleCreateNewCart(handleAfterCheckCart)
      } else {
        await handleCheckCartIsAuth(cartIdFromStorage?.value, handleAfterCheckCart)
      }
    } catch (error) {
      return
      //TODO
    }
  }

  return { initializeCart }
}

export default useInitializeCart
