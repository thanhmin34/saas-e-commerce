import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import apiClient from '@network/apiClient'
import { setMegaMenu } from '@redux/actions/megaMenuAction'
import { APIS } from '@constants/apis'
import { setProductsList } from '@redux/actions/productsListAction'
import { getFilterCriteria, getPageCriteria, getSortCriteria } from '@utils/common'
import { IProductsListSortAndFilter } from '@interfaces/product/productList'

export const getSortProductsInCategory = async ({
  id,
  page_size,
  current_page,
  order_name,
  order_value,
  filter,
}: IProductsListSortAndFilter) => {
  const { get } = apiClient()

  try {
    console.log('order_value', order_value)
    let url = `${APIS.PRODUCTS_IN_CATEGORY}?id=${id}`
    url += getPageCriteria(page_size, current_page)
    url += getSortCriteria(order_name, order_value)
    url += getFilterCriteria(filter)
    const responsive = await get(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

const useSortProductsInCategory = (params: IProductsListSortAndFilter) => {
  const dispatch = useDispatch()
  const { page_size, order_name, order_value, isSubmit } = params || {}

  const { isLoading, error, data } = useQuery({
    queryKey: ['sort-product', order_name, order_value, page_size, isSubmit],
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
