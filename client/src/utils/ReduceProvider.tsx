'use client'
import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//
import store from '@redux/store'
const queryClient = new QueryClient()

const ReduceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default ReduceProvider
