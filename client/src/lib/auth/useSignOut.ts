import { useMutation } from 'react-query'
import { signOut } from '@lib/service'
import useToastMessage from '@hooks/useToastMessage'
import { useDispatch } from 'react-redux'
import { setIsSignIn, setUserInfo } from '@redux/actions/userInfoAction'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
import { removeWishlist } from '@redux/actions/wishlistActions'
import useCreateCart from '@lib/cart/useCreateCart'
import { get } from 'lodash'
import useCart from '@lib/cart/useCartDetails'
import useIntl from '@hooks/useIntl'
import { useRouter } from 'next/navigation'
import { ROUTER_PATHS } from '@constants/routerPaths'

const useSignOut = () => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const localStorageManager = new LocalStorageManager()
  const { handleCreateNewCart } = useCreateCart()
  const { getCartDetails } = useCart()
  const { localizeMessage } = useIntl()

  const { mutate, isLoading } = useMutation({
    mutationKey: 'signout',
    mutationFn: signOut,
  })
  const { showToast, typeToast } = useToastMessage()

  const onSignOut = () => {
    mutate(
      {},
      {
        async onSuccess(data, variables, context) {
          if (data && 'status' in data) {
            // remove user / wishlist
            dispatch(removeWishlist([]))
            dispatch(setUserInfo({}))
            // handle token
            dispatch(setIsSignIn(false))
            localStorageManager.removeItem(STORAGE_KEYS.TOKEN)
            // create new cart
            const cart = handleCreateNewCart()
            cart.then((data) => {
              const cartId = get(data, 'cart_id')
              if (!cartId) {
                return showToast(localizeMessage('error cart'), typeToast.error)
              }
              getCartDetails(cartId)
            })
            push(ROUTER_PATHS.LOGIN)
          }
        },
      }
    )
  }

  return {
    onSignOut,
    isLoading,
  }
}

export default useSignOut
