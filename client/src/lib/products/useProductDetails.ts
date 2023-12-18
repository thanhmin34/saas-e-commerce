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

export { getProductDetails }
