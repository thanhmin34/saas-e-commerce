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

export interface PropsPages {
  params: {
    lang: string
    product: string
  }
}

export interface ISeoPages {
  seo: {
    title: string
    keywords: string
    description: string
    url: string
    image_url: string
    authors: {
      name: string
      url: string
    }[]
  }
}

export interface ITamaraProductWidget {
  init(config: { lang: string; currency: string; price: number }): void
  render(): void
}

export interface ITabbyPromo {
  new (options: { selector: string; currency: string; price: number }): any
}