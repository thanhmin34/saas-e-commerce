import { APIS } from '@constants/apis'
import { IMergeCartParams } from '@interfaces/cart'
import { IUserInformationParams } from '@interfaces/user'
import apiClient from '@network/apiClient'

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
