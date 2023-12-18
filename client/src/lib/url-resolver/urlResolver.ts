import { useQuery } from 'react-query'
import { IResolverUrl } from '@interfaces/global'
import { fetchResolveUrl } from '@lib/service'

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
