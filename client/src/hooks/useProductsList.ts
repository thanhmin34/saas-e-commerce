import useResolverUrl from '@lib/url-resolver/urlResolver'
import useSortProductsInCategory from '@lib/category/useSortProductsInCategory'
import { IFilterProduct, ISortProduct } from './../interfaces/product/productList'

type Props = {
  url: string
  pageSize: number
  currentPage: number
  sortByProducts: ISortProduct
  filterByProducts: [] | IFilterProduct[]
  isSubmit: boolean
}

const useProductsList = async (props: Props) => {
  const { url, pageSize, currentPage, sortByProducts, filterByProducts, isSubmit } = props
  const { id, isLoading: isLoadingResolveUrl } = useResolverUrl({
    url: url,
    type: 'category',
  })

  const { isLoading: isLoadingSortCategory } = useSortProductsInCategory({
    id,
    page_size: pageSize,
    current_page: currentPage,
    ...sortByProducts,
    filter: filterByProducts,
    isSubmit,
  })

  return {
    loading: isLoadingSortCategory || isLoadingResolveUrl,
  }
}

export default useProductsList
