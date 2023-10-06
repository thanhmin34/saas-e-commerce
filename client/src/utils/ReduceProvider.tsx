'use client'
import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//
import store from '@redux/store'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'

const queryClient = new QueryClient()

const ReduceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
        <Header />
        {children}
        <Footer />
      </QueryClientProvider>
    </Provider>
  )
}

export default ReduceProvider
