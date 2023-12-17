import { ROUTER_PATHS } from '@constants/routerPaths'
import useDebounce from '@hooks/useDebounce'
import { searchTerm } from '@lib/service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useQuery } from 'react-query'

const useSearchParams = () => {
  const { push } = useRouter()
  const [searchInput, setSearchInput] = useState('')

  const debounceValue = useDebounce({
    value: searchInput,
    delay: 600,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
  }
  const onResetSearchInput = () => setSearchInput('')

  const onNavigate = () => {
    push(`${ROUTER_PATHS.SEARCH}?params=${searchInput}`)
    setSearchInput('')
  }

  const { isLoading, error, data } = useQuery(['search', debounceValue], () => searchTerm({ searchInput }), {
    refetchOnWindowFocus: false,
    onSuccess(data) {
      //   if (data) {
      //     dispatch(setMegaMenu(data))
      //   }
    },
    enabled: !!debounceValue && debounceValue?.length >= 3,
  })

  return { isLoading, error, data, searchInput, onChange, onNavigate, onResetSearchInput }
}

export default useSearchParams
