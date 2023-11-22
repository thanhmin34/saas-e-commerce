import { AxiosError } from 'axios'
import { APIS } from '@constants/apis'
import apiServer from '@network/apiServer'

const getProductDetails = async ({ productSku }: { productSku: string }) => {
  const { get } = apiServer()

  try {
    let url = `${APIS.PRODUCTS}`
    const responsive = await get(`${url}/${productSku}`)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

// const useProductsDetails = ({ productSku }: { productSku: string }) => {
//   const dispatch = useDispatch()

//   const { isLoading, error, data, refetch } = useQuery({
//     queryKey: ['productDetails'],
//     queryFn: () => getProductDetails({ productSku }),
//     refetchOnWindowFocus: false,
//     onSuccess(data) {
//       console.log('data', data)
//       //   if ('cart' in data) {
//       //   }
//     },
//     enabled: !!productSku,
//   })

//   return {
//     isLoading,
//     data,
//     refetch,
//   }
// }

export { getProductDetails }
