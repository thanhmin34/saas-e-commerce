import { ProductItemInterface } from '@interfaces/product'

export interface IAddProductInWishListParams {
  product_id: number
  // customer_id: number
}

export interface IProductInWishlist extends Omit<ProductItemInterface, 'media_gallery'> {
  wishlist_id: number
}

export interface IActionsProductInWishlist {
  type: string
  payload: IProductInWishlist[] | []
}

export interface IProductInWishlistData {
  wishlist: IProductInWishlist[]
}
