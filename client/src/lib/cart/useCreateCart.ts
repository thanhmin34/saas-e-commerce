import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
import { createCart } from '@lib/service'

const useCreateCart = () => {
  const storage = new LocalStorageManager()
  const { mutate, isLoading } = useMutation('create-cart', {
    mutationFn: createCart,
  })
  const handleCreateNewCart = (customerId?: number) => {
    return new Promise<void>((resolve, reject) => {
      mutate(customerId, {
        onSuccess: (data) => {
          if ('cart_id' in data) {
            storage.setItem(STORAGE_KEYS.CART_ID, data.cart_id)
            return resolve(data)
          }
          reject(data)
        },
      })
    })
  }

  return { handleCreateNewCart, isLoading: !!isLoading }
}

export default useCreateCart
