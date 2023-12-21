import { APIS } from '@constants/apis'
import { IAddProductToCart, IMergeCartParams } from '@interfaces/cart'
import { IResolveData, IResolverUrl } from '@interfaces/global'
import { IProductReviewsItem } from '@interfaces/product/productDetails'
import { IProductsListSortAndFilter } from '@interfaces/product/productList'
import {
  IMyAddressItem,
  IMyAddressList,
  IUserInformationParams,
  IUserLoginByEmail,
  IUserLoginByPhone,
  IUserRegisterByEmail,
  IUserRegisterByPhone,
  IVerifyByPhone,
  TCreateAddressParams,
} from '@interfaces/user'
import {
  IParamsAddNotes,
  IParamsAddPaymentMethods,
  IParamsAddShippingAddress,
  IParamsAddShippingMethods,
  IPaymentMethods,
  IShippingMethods,
} from '@interfaces/checkout'
import { IAddProductInWishListParams } from '@interfaces/wishlist'
import apiClient from '@network/apiClient'
import apiServer from '@network/apiServer'
import { getFilterCriteria, getPageCriteria, getSortCriteria } from '@utils/helper'
import { AxiosError } from 'axios'

export const getCustomerInfo = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get(APIS.CUSTOMER_INFO)
    return responsive
  } catch (error) {
    return error
  }
}

export const editCustomerInfo = async (params: IUserInformationParams) => {
  const { put } = apiClient()
  try {
    const responsive = await put(APIS.CUSTOMER_INFO, params)
    return responsive
  } catch (error) {
    return error
  }
}

export const mergeCart = async (params: IMergeCartParams) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.MERGE_CART, params)
    return responsive
  } catch (error) {
    return error
  }
}

export const getAccountInformation = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get(APIS.ACCOUNT_INFORMATION)
    return responsive
  } catch (error) {
    return error
  }
}

export const getConfigApp = async () => {
  const { get } = apiClient()
  try {
    const res = await get(APIS.CONFIG)
    return res
  } catch (error) {
    return error
  }
}

export const getMyAddress = async () => {
  const { get } = apiClient()
  try {
    const responsive: IMyAddressList = await get(APIS.MY_ADDRESS)
    return responsive
  } catch (error) {
    return error
  }
}

export const createMyAddress = async (params: TCreateAddressParams) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.MY_ADDRESS, { address: params })
    return responsive
  } catch (error) {
    return error
  }
}

export const deleteMyAddress = async (id: number) => {
  const { remove } = apiClient()
  try {
    const url = `${APIS.MY_ADDRESS}/${id}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error
  }
}

export const getMyWishlist = async () => {
  const { get } = apiClient()
  try {
    const url = `${APIS.MY_WISHLIST}`
    const responsive = await get(url)
    return responsive
  } catch (error) {
    return error
  }
}

export const addProductWishlist = async (params: IAddProductInWishListParams) => {
  const { post } = apiClient()
  try {
    const url = `${APIS.MY_WISHLIST}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error
  }
}

export const deleteProductWishlist = async (productId: number) => {
  const { remove } = apiClient()
  try {
    const url = `${APIS.MY_WISHLIST}?productId=${productId}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error
  }
}

export const createCart = async (customerId?: number) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.CART}`
    const responsive = await post(url, { customer_id: customerId ? customerId : null })
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const getMyOrderList = async ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  const { get } = apiClient()
  try {
    const url = `${APIS.SUBMIT_ORDER}?current_page=${currentPage}&&page_size=${pageSize}`
    const responsive = await get(url)
    return responsive
  } catch (error) {
    return error
  }
}

export const searchTerm = async ({ searchInput }: { searchInput: string }) => {
  const { get } = apiClient()
  try {
    const url = `${APIS.SEARCH}?params=${searchInput}`
    const responsive: unknown = await get(url)
    return responsive
  } catch (error) {
    return error
  }
}

export const getMegaMenu = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get('megamenu')
    return responsive?.categoryList
  } catch (error) {
    return error as AxiosError
  }
}

export const getHomePages = async () => {
  const { get } = apiClient()
  try {
    const responsive = await get(APIS.LANDING_PAGE)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError
    return axiosError
  }
}

export const signOut = async ({}) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.SIGN_OUT)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const loginByEmail = async (user: IUserLoginByEmail) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.LOGIN_BY_EMAIL, user)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const registerByEmail = async (body: IUserRegisterByEmail) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.REGISTER_BY_EMAIL, body)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const registerByPhone = async (body: IUserLoginByPhone) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.REGISTER_BY_PHONE, body)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const loginByPhone = async (body: IUserLoginByPhone) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.LOGIN_BY_PHONE, body)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const verifyOTP = async (body: IVerifyByPhone) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.VERIFY_OTP, body)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const checkCartIsAuth = async (params: { cart_id: string }) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.CHECK_CART_IS_AUTH}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

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

export const addCoupon = async (params: { code: string; cart_id: string }) => {
  const { post } = apiClient()

  try {
    let url = `${APIS.ADD_COUPON}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
export const removeCoupon = async ({ cart_id }: { cart_id: string }) => {
  const { remove } = apiClient()

  try {
    let url = `${APIS.REMOVE_COUPON}?cart_id=${cart_id}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addToCartCart = async (params: IAddProductToCart) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.ADD_TO_CART}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
export const removeToCartCart = async ({ cart_id, product_id }: { cart_id: string; product_id: number }) => {
  const { remove } = apiClient()

  try {
    let url = `${APIS.REMOVE_PRODUCT_TO_CART}?cart_id=${cart_id}&&product_id=${product_id}`
    const responsive = await remove(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const updateProductToCart = async (params: {
  cart_id: string
  product: {
    product_id: number
    quantity: number
  }
}) => {
  const { put } = apiClient()

  try {
    let url = `${APIS.ADD_TO_CART}`
    const responsive = await put(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addReviews = async (params: IProductReviewsItem) => {
  const { post } = apiClient()
  try {
    const url = `${APIS.REVIEWS}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

export const fetchResolveUrl = async ({ url, type }: IResolverUrl) => {
  const { get } = apiClient()
  try {
    const responsive: IResolveData = await get(`${APIS.RESOLVE_URL}?type_url=${type}&url=${url}`)

    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const getSeoPagesData = async () => {
  const { get } = apiServer()
  try {
    let url = `${APIS.SEO_PAGES}`
    const responsive = await get(`${url}`)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const getReviews = async ({ productId }: { productId: number }) => {
  const { get } = apiClient()
  try {
    const url = `${APIS.REVIEWS}/${productId}`
    const responsive = await get(url)
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

export const getShippingMethods = async () => {
  const { get } = apiClient()
  try {
    let url = `${APIS.SHIPPING_METHOD}`
    const responsive: IShippingMethods = await get(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const getPaymentMethods = async () => {
  const { get } = apiClient()
  try {
    let url = `${APIS.PAYMENT_METHOD}`
    const responsive: IPaymentMethods = await get(url)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addShippingMethods = async (params: IParamsAddShippingMethods) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.SHIPPING_METHOD}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addPaymentMethods = async (params: IParamsAddPaymentMethods) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.PAYMENT_METHOD}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addShippingAddress = async (params: IParamsAddShippingAddress) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.SHIPPING_ADDRESS}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const submitOrder = async (params: { cart_id: string }) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.SUBMIT_ORDER}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addNote = async (params: IParamsAddNotes) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.NOTES}`
    const responsive = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}
