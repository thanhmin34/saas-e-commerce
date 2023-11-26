'use client'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import React, { ReactNode, Suspense } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@components/loading'
//
import store from '@redux/store'
import { AppProvider } from '@context/appContextProvider'
import CartContextProvider from '@context/cartContextProvider'
import Wrapper from '@components/Wrapper'

const queryClient = new QueryClient()

const Header = dynamic(() => import('@components/header/Header'), {
  loading: () => <Loading />,
  ssr: false,
})

const Footer = dynamic(() => import('@components/footer/Footer'), {
  loading: () => <Loading />,
  ssr: false,
})

const ReduceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ToastContainer />
        <Wrapper>
          <CartContextProvider>
            <AppProvider>
              <Suspense fallback={<Loading />}>
                <Header />
              </Suspense>
              <main className="main main-container">{children}</main>
              <Suspense fallback={<Loading />}>{/* <Footer /> */}</Suspense>
            </AppProvider>
          </CartContextProvider>
        </Wrapper>
      </QueryClientProvider>
    </Provider>
  )
}

export default ReduceProvider
