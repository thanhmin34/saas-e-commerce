'use client'
import { useCallback, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { useMutation, useQuery } from 'react-query'
import useToastMessage from '@hooks/useToastMessage'
import useCart from '@lib/cart/useCartDetails'
import {
  IParamsAddShippingMethods,
  IPaymentCheckout,
  IPaymentMethodsItem,
  IShippingAddress,
  IShippingMethodsItem,
} from '@interfaces/checkout'
import {
  addNote,
  addPaymentMethods,
  addShippingAddress,
  addShippingMethods,
  getPaymentMethods,
  getShippingMethods,
  submitOrderByCOD,
} from './checkoutLib'
import useIntl from '@hooks/useIntl'
import { useRouter } from 'next/navigation'
import { ROUTER_PATHS } from '@constants/routerPaths'
import useCreateCart from '@lib/cart/useCreateCart'

import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'

const useCheckout = () => {
  const { push } = useRouter()
  const { localizeMessage } = useIntl()
  const { showToast, typeToast } = useToastMessage()
  const { refetchCart } = useCart()
  const { handleCreateNewCart, isLoading: isLoadingCreateCart } = useCreateCart()

  const storage = new LocalStorageManager()
  const cart = useSelector((state: RootState) => state.cartData)
  const userData = useSelector((state: RootState) => state.userInfo)
  const { cart_id, shipping_methods, payment_methods, shipping_address, notes, products } = cart || {}

  const {
    isLoading: isLoadingShippingMethod,
    data: shippingMethodList,
    refetch: refetchShippingMethod,
  } = useQuery({
    queryKey: ['shippingMethods'],
    queryFn: getShippingMethods,
    refetchOnWindowFocus: false,
  })

  const { isLoading: isLoadingPaymentMethod, data: paymentMethodList } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: getPaymentMethods,
    refetchOnWindowFocus: false,
  })

  const { mutate: addShippingMethodsMutation, isLoading: isLoadingShippingMethods } = useMutation(
    'addShippingMethodsMutation',
    {
      mutationFn: addShippingMethods,
    }
  )
  const { mutate: addNotesMutation, isLoading: isLoadingNotes } = useMutation('addNotesMutation', {
    mutationFn: addNote,
  })

  const { mutate: addPaymentMethodsMutation, isLoading: isLoadingPaymentMethods } = useMutation(
    'addPaymentMethodsMutation',
    {
      mutationFn: addPaymentMethods,
    }
  )

  const { mutate: addShippingAddressMutation, isLoading: isLoadingShippingAddress } = useMutation(
    'addShippingAddressMutation',
    {
      mutationFn: addShippingAddress,
    }
  )

  const { mutate: submitOrderByCODMutation, isLoading: isLoadingSubmitOrderCOD } = useMutation('submitOrderByCOD', {
    mutationFn: submitOrderByCOD,
  })

  const shippingMethodSelected: IShippingMethodsItem | null = useMemo(() => {
    if (!isEmpty(shipping_methods)) return shipping_methods
    return null
  }, [shipping_methods])

  const paymentMethodSelected: IPaymentMethodsItem | null = useMemo(() => {
    if (!isEmpty(payment_methods)) return payment_methods
    return null
  }, [cart])

  const shippingAddress = useMemo(() => {
    if (!isEmpty(shipping_address)) return shipping_address
    return null
  }, [shipping_address, userData])

  const isDisabled = useMemo(() => {
    if (!cart_id || products?.length === 0) {
      return true
    }
    return false
  }, [cart_id, shipping_methods, payment_methods, shipping_address, products])

  const onChangeShippingMethod = (shipping: IShippingMethodsItem) => {
    const { id, name, code } = shipping || {}
    const newParams: IParamsAddShippingMethods = {
      cart_id,
      shipping_methods: {
        id,
        name,
        code,
      },
    }
    addShippingMethodsMutation(newParams, {
      onSuccess(data) {
        if (data && 'status' in data && data?.status) {
          const { status, message } = data || {}
          showToast(message, typeToast.success)
          refetchCart()
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  const onChangePaymentMethod = (paymentMethods: IPaymentMethodsItem) => {
    const { id } = paymentMethods || {}
    const newParams = {
      cart_id,
      payment_methods: {
        id,
      },
    }
    addPaymentMethodsMutation(newParams, {
      onSuccess(data) {
        if (data && 'status' in data && data?.status) {
          const { status, message } = data || {}
          showToast(message, typeToast.success)
          refetchCart()
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  const onAddNotes = (notes: string) => {
    const newParams = {
      cart_id,
      notes,
    }
    addNotesMutation(newParams, {
      onSuccess(data) {
        if (data && 'status' in data && data?.status) {
          const { status, message } = data || {}
          showToast(message, typeToast.success)
          refetchCart()
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  const onAddShippingAddress = (address: IShippingAddress) => {
    const newParams = {
      cart_id,
      address,
    }

    addShippingAddressMutation(newParams, {
      onSuccess(data) {
        if (data && 'status' in data && data?.status) {
          const { status, message } = data || {}
          showToast(message, typeToast.success)
          refetchCart()
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  const createCartAfterPlaceOrder = async () => {
    try {
      const responsive = handleCreateNewCart()
      responsive
        .then((data) => {
          // console.log('data', data)
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (error) {}
  }

  const onSubmitCOD = () => {
    const params = { cart_id }
    if (!cart_id) {
      return showToast(localizeMessage('cart id unavailable'), typeToast.error)
    }
    submitOrderByCODMutation(params, {
      onSuccess(data) {
        if (data && 'status' in data && data?.status) {
          const { message, order_id } = data || {}
          showToast(message, typeToast.success)
          createCartAfterPlaceOrder()
          if (order_id) {
            storage.setItem(STORAGE_KEYS.ORDER_NUMBER, order_id)
            push(`${ROUTER_PATHS.CHECKOUT_SUCCESS}`)
          }
          return
        }
        showToast(data?.response?.data?.message, typeToast.error)
      },
    })
  }

  const handleErrorMessage = useCallback(() => {
    let errorMessage = ''
    if (!shipping_methods) {
      errorMessage = localizeMessage('Shipping method is missing.')
    }
    if (!payment_methods) {
      errorMessage = localizeMessage('Payment method is missing.')
    }
    if (!shipping_address) {
      errorMessage = localizeMessage('Shipping address is missing.')
    }
    const { phone, post_code, country, city, region, street } = shipping_address || {}

    if (!phone) {
      errorMessage = localizeMessage('Please enter phone number')
    }

    if (!post_code || !country || !city || !region || !street) {
      errorMessage = localizeMessage('Invalid Shipping address')
    }
    return errorMessage
  }, [shipping_methods, payment_methods, shipping_address])

  const onSubmitOrder = useCallback(() => {
    const messageError = handleErrorMessage()
    if (messageError) {
      return showToast(messageError, typeToast.error)
    }

    const { code } = payment_methods || {}
    const paymentCheckout: IPaymentCheckout = {
      cod: onSubmitCOD,
      visa: () => {},
    }
    if (code && paymentCheckout[code as keyof IPaymentCheckout]) {
      paymentCheckout[code]()
      return
    }
    showToast(localizeMessage('Invalid payment method'), typeToast.error)
  }, [shipping_methods, payment_methods, shipping_address])

  return {
    shippingMethodList,
    paymentMethodList,
    notes,
    shippingAddress,
    userData,
    isLoading:
      !!isLoadingShippingMethod ||
      !!isLoadingPaymentMethod ||
      !!isLoadingShippingMethods ||
      !!isLoadingPaymentMethods ||
      !!isLoadingNotes ||
      !!isLoadingShippingAddress ||
      !!isLoadingSubmitOrderCOD ||
      !!isLoadingCreateCart,
    shippingMethodSelected,
    paymentMethodSelected,
    onChangeShippingMethod,
    onChangePaymentMethod,
    onAddNotes,
    onAddShippingAddress,
    onSubmitOrder,
    isDisabled,
  }
}

export default useCheckout
