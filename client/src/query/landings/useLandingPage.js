'use client'
import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
const getData = async () => {
  const responsive = await axios.get('http://localhost:5000/home-page')
  return responsive?.data
}

const useLandingPage = () => {
  const { isLoading, error, data, refetch } = useQuery('homePages', getData, {
    cacheTime: 50000,
    refetchOnWindowFocus: false,
  })

  return { isLoading, error, data, refetch }
}

export default useLandingPage
