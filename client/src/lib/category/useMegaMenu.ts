import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import apiClient from '@network/apiClient'
import { setMegaMenu } from '@redux/actions/megaMenuAction'

export const getMegaMenu = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get('megamenu')
    return responsive?.categoryList
  } catch (error) {
    return error as AxiosError
  }
}

const useMegaMenu = ({ cacheTime }: { cacheTime: number }) => {
  const dispatch = useDispatch()
  const { isLoading, error, data } = useQuery('megamenu', getMegaMenu, {
    staleTime: cacheTime,
    cacheTime: cacheTime + 1000,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
        dispatch(setMegaMenu(data))
      }
    },
  })

  return { isLoading, error, data: data }
}

export default useMegaMenu
