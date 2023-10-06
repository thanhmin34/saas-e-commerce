import ReduceProvider from '@utils/ReduceProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@scss/global.scss'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SAAS - natural',
  description: 'natural',
}

interface Params {
  lang: string
}
const RootLayout = ({ params, children }: { params: Params; children: React.ReactNode }) => {
  const { lang } = params

  return (
    <html lang={`${lang?.includes('en') ? 'en' : 'nl'}`}>
      <body className={inter.className}>
        <ReduceProvider>{children}</ReduceProvider>
      </body>
    </html>
  )
}

export default RootLayout
