import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'
import { setCart } from '@redux/actions/cartActions'
import { useRef } from 'react'

export const getCart = async ({ cartId }: { cartId: string }) => {
  const { get } = apiClient()

  try {
    let url = `${APIS.CART}`
    const responsive = await get(`${url}?cart_id=${cartId}`)
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
    queryFn: () => getCart({ cartId: refCart.current }),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if ('cart' in data) {
        console.log('data', data)
        const { cart } = data || {}
        dispatch(setCart({ ...cart, total_quantity: cart?.products?.length || 0 }))
      }
    },
    enabled: !!refCart.current,
  })

  const getCartDetails = async (cart_id: string) => {
    refCart.current = cart_id
    setTimeout(() => {
      refCart.current = ''
    }, 500)
  }

  return {
    isLoading,
    data,
    refetch,
    getCartDetails,
  }
}

export default useCart
