import { Poppins, Roboto } from 'next/font/google'
import type { Metadata, ResolvingMetadata } from 'next'
import '@scss/global.scss'

import { GOOGLE_APP_ID, HOST } from '@constants/variables'
import ReduceProvider from '@utils/ReduceProvider'
import { ISeoPages } from '@interfaces/global'
import { getSeoPagesData } from '@lib/service'

export const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '700'],
})

export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

interface Props {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { lang } = params || {}
  const responsive: ISeoPages = await getSeoPagesData()

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  if (responsive && 'seo' in responsive) {
    const { seo } = responsive || {}
    const { title, keywords, description, url, image_url, authors } = seo || {}

    return {
      // metadataBase: new URL(HOST),
      title,
      keywords,
      description,
      openGraph: {
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
      alternates: {
        canonical: `${HOST}/${lang}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        siteId: '',
        creatorId: '',
        images: image_url,
      },
      authors,
      // viewport: 'content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"',
      verification: { google: GOOGLE_APP_ID, yandex: GOOGLE_APP_ID, me: 'gg' },
      robots: {
        index: false,
        follow: true,
        nocache: true,
      },
    }
  }
  return {
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

interface Params {
  lang: string
}
const RootLayout = ({ params, children }: { params: Params; children: React.ReactNode }) => {
  const { lang } = params

  return (
    <html lang={`${lang?.includes('en') ? 'en' : 'vn'}`}>
      <body className={poppins.className}>
        <ReduceProvider>{children}</ReduceProvider>
      </body>
    </html>
  )
}

export default RootLayout
