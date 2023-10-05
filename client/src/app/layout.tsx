import ReduceProvider from '@utils/ReduceProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@scss/global.scss'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SAAS - natural',
  description: 'natural',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduceProvider>{children}</ReduceProvider>
      </body>
    </html>
  )
}
