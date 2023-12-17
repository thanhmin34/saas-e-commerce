export interface ICategoryItem {
  description: string
  image: {
    image: string
    alt: string
  }
  id: number
  name: string
  parent_id: number
  slug: string
  title: string | undefined
  children_category: ICategoryItem[] | []
}

export type IMegaMenu = ICategoryItem[]

export interface IMegaMenuAction {
  type: string
  payload: IMegaMenu
}
