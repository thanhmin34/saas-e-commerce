import { AxiosError } from 'axios'
import { APIS } from '@constants/apis'
import apiServer from '@network/apiServer'

const getSeoPagesData = async () => {
  const { get } = apiServer()
  try {
    let url = `${APIS.SEO_PAGES}`
    const responsive = await get(`${url}`)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export { getSeoPagesData }
