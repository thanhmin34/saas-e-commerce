import Loading from '@components/loading'
import dynamic from 'next/dynamic'

const HomePages = dynamic(() => import('@components/landings/HomePages'), {
  loading: () => <Loading />,
  ssr: false,
})
export default function Page() {
  return <HomePages />
}
