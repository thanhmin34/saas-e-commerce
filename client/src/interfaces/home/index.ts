export interface IBannerItem {
  id: number
  name: string
  slug: string
  image: {
    alt: string
    image: string
  }
}

export type IBannerData = IBannerItem[]
