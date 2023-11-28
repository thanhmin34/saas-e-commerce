import { AxiosError } from 'axios'
import { APIS } from '@constants/apis'
import apiClient from '@network/apiClient'
import {
  IParamsAddPaymentMethods,
  IParamsAddShippingMethods,
  IPaymentMethods,
  IShippingMethods,
} from '@interfaces/checkout'

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
    const responsive: IPaymentMethods = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

export const addPaymentMethods = async (params: IParamsAddPaymentMethods) => {
  const { post } = apiClient()
  try {
    let url = `${APIS.PAYMENT_METHOD}`
    const responsive: IPaymentMethods = await post(url, params)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

// export const addNote = async (params) => {
//   const { post } = apiClient()
//   try {
//     let url = `${APIS.PAYMENT_METHOD}`
//     const responsive: IPaymentMethods = await post(url)
//     return responsive
//   } catch (error) {
//     return error as AxiosError
//   }
// }
