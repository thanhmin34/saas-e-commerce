import { useMutation } from 'react-query'
import STORAGE_KEYS from '@constants/storageKeys'
import { createCart } from '@lib/service'
import LocalStorageManager from '@utils/simplePersistence'

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
