import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setMegaMenu } from '@redux/actions/megaMenuAction'
import { getMegaMenu } from '@lib/service'
import { CACHE_TIME } from '@constants/variables'

const useMegaMenu = () => {
  const dispatch = useDispatch()
  const { isLoading, error, data } = useQuery('megamenu', getMegaMenu, {
    staleTime: CACHE_TIME,
    cacheTime: CACHE_TIME + 1000,
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
