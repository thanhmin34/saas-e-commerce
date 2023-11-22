import Loading from '@components/loading'
import dynamic from 'next/dynamic'

const HomePages = dynamic(() => import('@components/landings/HomePages'), {
  loading: () => <Loading />,
})
export default function Page() {
  return <HomePages />
}
