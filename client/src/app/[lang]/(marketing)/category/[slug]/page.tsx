import dynamic from 'next/dynamic'
import Loading from '@components/loading'

type Props = {
  params: {
    slug: string
  }
}
// metadata

const ProductsListPage = dynamic(() => import('@components/product-list'), {
  loading: () => <Loading />,
  ssr: false,
})

const CategoryPage = (props: Props) => {
  return <ProductsListPage />
}

export default CategoryPage
