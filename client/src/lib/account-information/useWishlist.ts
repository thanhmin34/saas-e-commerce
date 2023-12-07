import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import useToastMessage from '@hooks/useToastMessage'
import { CACHE_TIME, STALE_TIME } from '@constants/variables'

import { IAddProductInWishListParams } from '@interfaces/wishlist'
import { addProductWishlist, deleteProductWishlist, getMyWishlist } from '@lib/service'
import { setWishlist } from '@redux/actions/wishlistActions'

const useWishlist = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch()
  const { showToast, typeToast } = useToastMessage()

  const {
    isLoading: isLoadingWishList,
    error,
    data,
    refetch,
  } = useQuery('myWishlist', getMyWishlist, {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data && 'products' in data) {
        dispatch(setWishlist(data?.products))
      }
    },
    enabled,
  })

  const { mutate: addProductInWishlistMutation, isLoading: isLoadingAddProductInWishlist } = useMutation({
    mutationKey: 'addProductInWishlistMutation',
    mutationFn: (params: IAddProductInWishListParams) => addProductWishlist(params),
  })

  const { mutate: deleteProductWishlistMutation, isLoading: isLoadingDeleteProductInWishlist } = useMutation({
    mutationKey: 'deleteProductWishlistMutation',
    mutationFn: (id: number) => deleteProductWishlist(id),
  })

  const onAddProductInWishlist = (params: IAddProductInWishListParams) => {
    addProductInWishlistMutation(params, {
      onSuccess(data, variables, context) {
        if (data && 'status' in data) {
          showToast(data?.message, typeToast.success)
          refetch()
          return
        }
        showToast(get(data, 'response.data.message'), typeToast.error)
      },
    })
  }

  const onDeleteProductWishlist = (id: number) => {
    deleteProductWishlistMutation(id, {
      onSuccess(data, variables, context) {
        if (data && 'status' in data) {
          showToast(data?.message, typeToast.success)
          refetch()
          return
        }
        showToast(get(data, 'response.data.message'), typeToast.error)
      },
    })
  }

  return {
    isLoading: !!isLoadingWishList || !!isLoadingAddProductInWishlist || !!isLoadingDeleteProductInWishlist,
    error,
    data,
    onAddProductInWishlist,
    onDeleteProductWishlist,
  }
}

export default useWishlist
