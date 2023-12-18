'use client'
import { RootState } from '@redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, usePathname, useRouter } from 'next/navigation'

import useCreateCart from '@lib/cart/useCreateCart'
import { ROUTER_PATHS } from '@constants/routerPaths'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'
import { setIsSignIn, setUserInfo } from '@redux/actions/userInfoAction'
import { removeWishlist } from '@redux/actions/wishlistActions'
import { get } from 'lodash'
import useCart from '@lib/cart/useCartDetails'

const useLoginExpired = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { push } = useRouter()
  const pathName = usePathname()
  const storage = new LocalStorageManager()
  const { handleCreateNewCart } = useCreateCart()
  const { getCartDetails } = useCart()
  const lang = params?.lang as string
  const newPathname = pathName ? pathName.replace(`/${lang}`, '') : ''

  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)

  const handleRedirect = () => {
    if (!isSignedIn && newPathname === ROUTER_PATHS.CHECKOUT) {
      push(ROUTER_PATHS.LOGIN)
      return
    }
    if (newPathname !== ROUTER_PATHS.ACCOUNT_INFORMATION && !isSignedIn) {
      push(ROUTER_PATHS.LOGIN)
      return
    }
  }

  async function handleLoginExpired(navigate = true) {
    try {
      if (navigate) {
        handleRedirect()
      }
      dispatch(setUserInfo({}))
      dispatch(setIsSignIn(false))
      dispatch(removeWishlist([]))
      storage.removeItem(STORAGE_KEYS.TOKEN)
      const cart = handleCreateNewCart()

      cart.then((data) => {
        const cartId = get(data, 'cart_id')
        if (!cartId) return
        getCartDetails(cartId)
      })
      push(ROUTER_PATHS.LOGIN)
    } catch (error) {
      //TODO:
    }
  }

  return {
    handleLoginExpired,
  }
}

export default useLoginExpired
