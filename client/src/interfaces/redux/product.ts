import { ProductItemInterface } from '@interfaces/product'

export interface IProduct {
  name: string
}

export interface ICategoryInProductsList {
  id: number
  name: string
  parent_id: number
  title: string
}

export interface IProductsList {
  products: ProductItemInterface[]
  total_count: number
  category: ICategoryInProductsList[] | []
}

export interface IProductsListAction {
  type: string
  data: IProductsList
}
