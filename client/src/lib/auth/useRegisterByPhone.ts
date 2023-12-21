import { z } from 'zod'
import { get } from 'lodash'
import { useMutation } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerByPhone } from '@lib/service'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { useRouter } from 'next/navigation'
import { ROUTER_PATHS } from '@constants/routerPaths'
import { AUTH_PHONE_TYPES } from '@constants/login'
import useToastMessage from '@hooks/useToastMessage'
import { IUserLoginByPhone, IUserRegisterByPhone } from '@interfaces/user'

const registerSchema = z.object({
  firstName: z
    .string({
      required_error: 'FirstName is required',
      invalid_type_error: 'FirstName must be a string',
    })
    .trim()
    .min(3),
  lastName: z
    .string({
      required_error: 'LastName is required',
      invalid_type_error: 'LastName must be a string',
    })
    .trim()
    .min(3),
  phone: z.string({
    required_error: 'Phone is required',
  }),
})
const useRegisterByPhone = () => {
  const { mutate, reset, error, isLoading } = useMutation('registerByPhone', {
    mutationFn: (body: IUserLoginByPhone) => registerByPhone(body),
  })
  const { push } = useRouter()
  const { country_code = '' } = useSelector((state: RootState) => state.configApp)
  const { showToast, typeToast } = useToastMessage()

  type RegisterSchema = z.infer<typeof registerSchema>
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<IUserRegisterByPhone> = (data) => {
    const { phone, firstName, lastName } = data || {}
    const _phone = `${country_code}${phone ? phone.replaceAll('-', '') : phone}`
    mutate(
      {
        phone: _phone,
      },
      {
        onSuccess: (data) => {
          if (data && 'status' in data) {
            const { message = '', status = true } = data || {}
            if (status) {
              showToast(message, typeToast.success)
              push(
                `${ROUTER_PATHS.VERIFY_OTP}?phone=${_phone}firstName=${firstName}&&lastName=${lastName}&&type=${AUTH_PHONE_TYPES.REGISTER}`
              )
            }
            return
          }
          showToast(get(data, 'response.data.message'), typeToast.error)
        },
      }
    )
  }

  const firstName = register('firstName', {
    required: 'Firstname is required',
  })
  const lastName = register('lastName', {
    required: 'Lastname is required',
  })
  const phone = register('phone', {
    required: 'Phone is required',
  })

  return { onSubmit, handleSubmit, error, isLoading, firstName, lastName, phone, errors }
}

export default useRegisterByPhone
