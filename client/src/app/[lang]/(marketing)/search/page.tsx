import dynamic from 'next/dynamic'
import Loading from '@components/loading'

const SearchComponent = dynamic(() => import('@components/pages-components/search'), {
  loading: () => <Loading />,
  ssr: false,
})

const SearchPages = () => {
  return <SearchComponent />
}

export default SearchPages
