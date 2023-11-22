import dynamic from 'next/dynamic'
import Loading from '@components/loading'

const ProductsListPage = dynamic(() => import('@components/product-list'), {
  loading: () => <Loading />,
  ssr: false,
})

const CategoryPage = () => {
  return <ProductsListPage />
}

export default CategoryPage
