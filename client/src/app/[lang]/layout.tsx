import ReduceProvider from '@utils/ReduceProvider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@scss/global.scss'
const inter = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Natural touch',
  keywords: 'Natural touch',
  authors: [{ name: 'Hoang', url: 'https://nextjs.org' }],
  description: '',
}

interface Params {
  lang: string
}
const RootLayout = ({ params, children }: { params: Params; children: React.ReactNode }) => {
  const { lang } = params
  return (
    <html lang={`${lang?.includes('en') ? 'en' : 'vn'}`}>
      <body className={inter.className}>
        <ReduceProvider>{children}</ReduceProvider>
      </body>
    </html>
  )
}

export default RootLayout
