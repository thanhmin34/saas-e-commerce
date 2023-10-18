import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { sku: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { sku } = params
  const { data } = await getData(sku)

  const previousImages = (await parent).openGraph?.images || []

  return {
    keywords: data.title,
    description: data.description,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export async function getData(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  return {
    data,
  }
}

export default async function Blog({ params }: Props) {
  const { sku } = params
  const { data } = await getData(sku)

  return (
    <div style={{ marginTop: 90 }}>
      <span>{data?.id}</span>
      <span>{data?.title}</span>
    </div>
  )
}
