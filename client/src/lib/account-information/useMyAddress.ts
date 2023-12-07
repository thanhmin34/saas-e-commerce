import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { CACHE_TIME, STALE_TIME } from '@constants/variables'
import { IMyAddressItem, IMyAddressList, TCreateAddressParams } from '@interfaces/user'
import { createMyAddress, deleteMyAddress, getMyAddress } from '@lib/service'
import useToastMessage from '@hooks/useToastMessage'
import { setAddress } from '@redux/actions/addressActions'

const useMyAddress = () => {
  const dispatch = useDispatch()
  const { showToast, typeToast } = useToastMessage()

  const {
    isLoading: isLoadingAddress,
    error,
    data,
    refetch,
  } = useQuery('myAddress', getMyAddress, {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      const { address } = data as IMyAddressList
      if (address) {
        dispatch(setAddress(address))
      }
    },
  })

  const { mutate: createAddressMutation, isLoading: isLoadingAddAddress } = useMutation({
    mutationKey: 'createAddressMutation',
    mutationFn: (address: TCreateAddressParams) => createMyAddress(address),
  })

  const { mutate: deleteAddressMutation, isLoading: isLoadingDeleteAddress } = useMutation({
    mutationKey: 'deleteAddressMutation',
    mutationFn: (id: number) => deleteMyAddress(id),
  })

  const onCreateAddress = (address: TCreateAddressParams) => {
    return new Promise<boolean>((resolve, reject) => {
      createAddressMutation(address, {
        onSuccess(data, variables, context) {
          if (data && 'status' in data) {
            showToast(data?.message, typeToast.success)
            refetch()
            setTimeout(() => {
              resolve(true)
            }, 400)
            return
          }
          resolve(false)
          showToast(get(data, 'response.data.message'), typeToast.error)
        },
      })
    })
  }

  const onDeleteAddress = (id: number) => {
    deleteAddressMutation(id, {
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
    isLoading: !!isLoadingAddAddress || !!isLoadingAddress || !!isLoadingDeleteAddress,
    error,
    addressData: data as IMyAddressList,
    onCreateAddress,
    onDeleteAddress,
  }
}

export default useMyAddress
