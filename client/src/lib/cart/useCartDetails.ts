'use client'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import { setCart } from '@redux/actions/cartActions'
import { useRef } from 'react'
import { RootState } from '@redux/reducers'

import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'

export const getCart = async () => {
  const { get } = apiClient()
  const storage = new LocalStorageManager()
  const cartId = storage.getItem(STORAGE_KEYS.CART_ID)
  try {
    let url = `${APIS.CART}`
    const responsive = await get(`${url}?cart_id=${cartId?.value}`)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useCart = () => {
  const refCart = useRef<string>('')
  const dispatch = useDispatch()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if ('cart' in data) {
        const { cart } = data || {}
        dispatch(setCart({ ...cart, total_quantity: cart?.products?.length || 0 }))
      }
    },
    enabled: !!refCart.current,
  })

  const getCartDetails = async (cart_id: string) => {
    refCart.current = cart_id
  }

  return {
    isLoading,
    data,
    refetch,
    getCartDetails,
  }
}

export default useCart
