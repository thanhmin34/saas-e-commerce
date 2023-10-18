import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import apiClient from '@network/apiClient'

const getData = async (sku: string) => {
  const { get } = apiClient()
  try {
    const responsive: AxiosResponse<any, any> | AxiosError<unknown, any> = await get(
      `https://dummyjson.com/products/${1}`
    )
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

const useProduct = (sku: string) => {
  const { isLoading, error, data } = useQuery(
    'homePages',
    async () => {
      return getData(sku)
    },
    {
      cacheTime: 50000,
      refetchOnWindowFocus: false,
    }
  )

  return { isLoading, error, data }
}

export default useProduct
