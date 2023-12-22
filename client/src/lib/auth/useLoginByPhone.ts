import { z } from 'zod'
import { useMutation } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IUserLoginByPhone } from '@interfaces/user'
import useToastMessage from '@hooks/useToastMessage'
import { loginByPhone } from '@lib/service'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { cloneDeep, get } from 'lodash'
import { ROUTER_PATHS } from '@constants/routerPaths'
import { AUTH_PHONE_TYPES } from '@constants/login'

const loginPhoneSchema = z.object({
  phone: z.string({
    required_error: 'Phone is required',
  }),
})
const useLoginByPhone = () => {
  const { mutate, reset, error, isLoading } = useMutation('loginByPhone', {
    mutationFn: (body: IUserLoginByPhone) => loginByPhone(body),
  })

  const { push } = useRouter()
  const { country_code = '' } = useSelector((state: RootState) => state.configApp)
  const { showToast, typeToast } = useToastMessage()

  type RegisterSchema = z.infer<typeof loginPhoneSchema>
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(loginPhoneSchema),
  })

  const onSubmit: SubmitHandler<IUserLoginByPhone> = (data) => {
    const newData = cloneDeep(data)
    const { phone } = data || {}
    const _phone = `${country_code}${phone ? phone.replaceAll('-', '') : phone}`
    newData.phone = _phone
    mutate(newData, {
      onSuccess: (data) => {
        if (data && 'status' in data) {
          const { message = '', status = true } = data || {}
          if (status) {
            showToast(message, typeToast.success)
            push(`${ROUTER_PATHS.VERIFY_OTP}?phone=${_phone?.slice(1)}&&type=${AUTH_PHONE_TYPES.LOGIN}`)
          }
          return
        }
        showToast(get(data, 'response.data.message'), typeToast.error)
      },
    })
  }

  const phone = register('phone', {
    required: 'Phone is required',
  })

  return { onSubmit, handleSubmit, error, isLoading, phone, errors }
}

export default useLoginByPhone
