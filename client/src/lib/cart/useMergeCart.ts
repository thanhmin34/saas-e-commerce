import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'

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
  const { isLoading, error, data } = useQuery({
    queryKey: 'create-cart',
    queryFn: createCart,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
      }
    },
  })

  return { isLoading, error, data }
}

export default useCreateCart
