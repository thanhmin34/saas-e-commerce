import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { APIS } from '../../constants/apis'
import apiClient from '../../network/apiClient'
interface IResolverUrl {
  url: string
  type: string
}
interface IResolveData {
  resolve_url: {
    id: number
    url: string
  }
  status: boolean
}
export const fetchResolveUrl = async ({ url, type }: IResolverUrl) => {
  const { get } = apiClient()
  try {
    const responsive: IResolveData = await get(`${APIS.RESOLVE_URL}?type_url=${type}&url=${url}`)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useResolverUrl = (params: IResolverUrl) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['resolve-url'],
    queryFn: () => fetchResolveUrl(params),
    refetchOnWindowFocus: false,
  })

  if (data && 'resolve_url' in data) {
    return {
      isLoading,
      id: data.resolve_url.id,
    }
  }
  return { isLoading, error, data }
}

export default useResolverUrl
