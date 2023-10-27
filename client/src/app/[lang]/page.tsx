import Loading from '@components/loading'
import STORAGE_KEYS from '@constants/storageKeys'
import useAuth from '@hooks/useAuth'
import LocalStorageManager from '@utils/simplePersistence'
import dynamic from 'next/dynamic'

const HomePages = dynamic(() => import('@components/landings/HomePages'), {
  loading: () => <Loading />,
  ssr: false,
})
export default function Page() {
  return <HomePages />
}
