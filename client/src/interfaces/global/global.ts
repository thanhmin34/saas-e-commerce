export interface IFilterByProducts {
  price: {
    key: string
    type: string
  }
  category: {
    key: string
    type: string
  }
}
export type IKeyofFilterByProducts = keyof IFilterByProducts
