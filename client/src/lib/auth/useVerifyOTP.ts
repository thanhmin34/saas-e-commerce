import { get, isEmpty } from 'lodash'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { IVerifyByPhone } from '@interfaces/user'
import useToastMessage from '@hooks/useToastMessage'
import { verifyOTP } from '@lib/service'
import { useRouter, useSearchParams } from 'next/navigation'
import { AUTH_PHONE_TYPES, DEFAULT_RESEND_OTP } from '@constants/login'
import useLoginByPhone from './useLoginByPhone'
import useRegisterByPhone from './useRegisterByPhone'
import { ROUTER_PATHS } from '@constants/routerPaths'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
import { TTL } from '@constants/variables'
import { useAfterLogin } from './useAfterLogin'

interface IKeyOfTypeFuc {
  [key: string]: () => void
}

const useVerifyOTP = () => {
  const { push } = useRouter()
  const search = useSearchParams()
  const { mutate, error, isLoading } = useMutation('verifyOTP', {
    mutationFn: (body: IVerifyByPhone) => verifyOTP(body),
  })
  const { onSubmit: onResendLogin } = useLoginByPhone()
  const localStorageManager = new LocalStorageManager()

  const { onSubmit: onResendRegister } = useRegisterByPhone()
  const { handleCartAfterLogin } = useAfterLogin()

  const phone = search.get('phone') || ''
  const type = search.get('type') || ''
  const firstName = search.get('firstName') || ''
  const lastName = search.get('lastName') || ''

  const { showToast, typeToast } = useToastMessage()
  const [resendCount, setResendCount] = useState(0)

  const onResend = () => {
    if (!type) return Promise.resolve(false)

    if (resendCount <= DEFAULT_RESEND_OTP) {
      const typeResend: IKeyOfTypeFuc = {
        [AUTH_PHONE_TYPES.REGISTER]: () => {
          onResendRegister({ phone, firstName, lastName })
        },
        [AUTH_PHONE_TYPES.LOGIN]: () => {
          onResendLogin({ phone })
        },
      }

      if (type && typeResend[type as keyof IKeyOfTypeFuc]) {
        typeResend[type as keyof IKeyOfTypeFuc]()
      }
      setResendCount((prev) => prev + 1)
      return Promise.resolve(true)
    }
    showToast('has exceeded the allowed number of times', typeToast.error)
    return Promise.resolve(false)
  }

  const onSubmit = (otp: string) => {
    if (!type || !phone) return
    let params: IVerifyByPhone = {
      otp,
      phone: `+${phone}`,
      type: 'login',
    }

    if (type === AUTH_PHONE_TYPES.REGISTER) {
      params = {
        ...params,
        type: AUTH_PHONE_TYPES.REGISTER as 'register',
        firstName: firstName,
        lastName: lastName,
      }
    }

    mutate(params, {
      onSuccess: (data) => {
        if (data && 'status' in data) {
          const { message = '', status = true, token } = data || {}
          if (status) {
            showToast(message, typeToast.success)
            const typeResend = {
              [AUTH_PHONE_TYPES.REGISTER]: () => {
                push(ROUTER_PATHS.LOGIN)
              },
              [AUTH_PHONE_TYPES.LOGIN]: async () => {
                if (!isEmpty(token)) {
                  localStorageManager.setItem(STORAGE_KEYS.TOKEN, token, TTL)
                  const results = await handleCartAfterLogin()
                  if (results) {
                    push(ROUTER_PATHS.ACCOUNT_INFORMATION)
                  }
                }
              },
            }
            if (type && typeResend[type as keyof IKeyOfTypeFuc]) {
              typeResend[type as keyof IKeyOfTypeFuc]()
            }
          }
          return
        }
        showToast(get(data, 'response.data.message'), typeToast.error)
      },
    })
  }

  return { onSubmit, error, isLoading, phone, onResend }
}

export default useVerifyOTP
