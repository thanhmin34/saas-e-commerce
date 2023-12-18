import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setProductsList } from '@redux/actions/productsListAction'
import { IProductsListSortAndFilter } from '@interfaces/product/productList'
import { getSortProductsInCategory } from '@lib/service'

const useSortProductsInCategory = (params: IProductsListSortAndFilter) => {
  const dispatch = useDispatch()
  const { page_size, order_name, order_value, isSubmit, id } = params || {}

  const { isLoading, error, data } = useQuery({
    queryKey: ['sort-product', order_name, order_value, page_size, isSubmit, id],
    queryFn: () => getSortProductsInCategory(params),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
        if ('products' in data) {
          dispatch(
            setProductsList({
              products: data.products,
              total_count: data.total_count,
              category: data?.category?.children_category,
            })
          )
        }
      }
    },
    enabled: !!params.id,
  })

  return { isLoading, error, data }
}

export default useSortProductsInCategory
