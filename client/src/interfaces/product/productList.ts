export interface IPageProduct {
  page_size: number
  current_page: number
}

export interface ISortProduct {
  order_name: string
  order_value: string
}

export interface IFilterProduct {
  key: string
  value: number
  type: string
}

export interface IProductsListSortAndFilter {
  id: number | undefined
  filter: IFilterProduct[] | []
  page_size: number
  current_page: number
  order_name: string
  order_value: string
  isSubmit: boolean
}
