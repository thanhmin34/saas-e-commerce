'use client'
import { useMutation, useQuery } from 'react-query'
import {
  IParamsAddShippingMethods,
  IPaymentMethodsItem,
  IShippingMethods,
  IShippingMethodsItem,
} from '@interfaces/checkout'
import { useCallback, useState } from 'react'
import { addPaymentMethods, addShippingMethods, getPaymentMethods, getShippingMethods } from './checkoutLib'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useToastMessage from '@hooks/useToastMessage'
import useCart from '@lib/cart/useCartDetails'

const useCheckout = () => {
  const cart = useSelector((state: RootState) => state.cartData)
  const { cart_id } = cart || {}
  // const { refetch } = useCart()
  const { showToast, typeToast } = useToastMessage()

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

  const { mutate: addShippingMethodsMutation, isLoading: isShippingMethods } = useMutation(
    'addShippingMethodsMutation',
    {
      mutationFn: addShippingMethods,
    }
  )

  const { mutate: addPaymentMethodsMutation, isLoading: isPaymentMethods } = useMutation('addPaymentMethodsMutation', {
    mutationFn: addPaymentMethods,
  })

  const [shippingMethodSelected, setShippingMethodSelected] = useState<IShippingMethodsItem | null>(null)
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<IPaymentMethodsItem | null>(null)

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
          // refetch cart
          return
        }
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
          // refetch cart
          return
        }
      },
    })
  }

  return {
    shippingMethodList,
    paymentMethodList,
    isLoading: !!isLoadingShippingMethod || !!isLoadingPaymentMethod || !!isShippingMethods || !!isPaymentMethods,
    shippingMethodSelected,
    paymentMethodSelected,
    onChangeShippingMethod,
    onChangePaymentMethod,
  }
}

export default useCheckout
