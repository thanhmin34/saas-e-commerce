'use client'
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import apiClient from '@network/apiClient'

const getData = async () => {
  const { get } = apiClient()
  try {
    const responsive: AxiosResponse<any, any> | AxiosError<unknown, any> = await get('http://localhost:5000/home-page')
    return responsive
  } catch (error) {
    const axiosError = error as AxiosError<unknown, any>
    return axiosError
  }
}

const useLandingPage = () => {
  const { isLoading, error, data, refetch } = useQuery('homePages', getData, {
    cacheTime: 50000,
    refetchOnWindowFocus: false,
  })

  return { isLoading, error, data, refetch }
}

export default useLandingPage
