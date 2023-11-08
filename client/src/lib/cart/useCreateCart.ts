import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
import { useDispatch } from 'react-redux'
import { setCart } from '@redux/actions/cartActions'
import { IDataCheckCartIsAuth } from './useInitializeCart'

export const createCart = async ({}) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.CART}`
    const responsive = await post(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useCreateCart = () => {
  const storage = new LocalStorageManager()
  const { mutate, reset, error, isLoading } = useMutation('create-cart', {
    mutationFn: createCart,
  })
  const handleCreateNewCart = (callback?: (data: IDataCheckCartIsAuth) => Promise<void>) => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          if ('cart_id' in data) {
            storage.setItem(STORAGE_KEYS.CART_ID, data.cart_id)
            callback && callback(data)
          }
        },
      }
    )
  }

  return { handleCreateNewCart, isLoading }
}

export default useCreateCart
