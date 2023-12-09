import { APIS } from '@constants/apis'
import { IMergeCartParams } from '@interfaces/cart'
import { IMyAddressItem, IMyAddressList, IUserInformationParams, TCreateAddressParams } from '@interfaces/user'
import { IAddProductInWishListParams } from '@interfaces/wishlist'
import apiClient from '@network/apiClient'
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

export const getMyOrderList = async () => {
  const { get } = apiClient()
  try {
    const url = `${APIS.SUBMIT_ORDER}`
    const responsive = await get(url)
    return responsive
  } catch (error) {
    return error
  }
}
