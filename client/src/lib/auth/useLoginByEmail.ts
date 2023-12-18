import z from 'zod'
import { get } from 'lodash'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TTL } from '@constants/variables'
import { ROUTER_PATHS } from '@constants/routerPaths'
import STORAGE_KEYS from '@constants/storageKeys'
import { zodResolver } from '@hookform/resolvers/zod'
import useToastMessage from '@hooks/useToastMessage'
import LocalStorageManager from '@utils/simplePersistence'
import { useAfterLogin } from './useAfterLogin'
import { IUserLoginByEmail } from '@interfaces/user'
import { loginByEmail } from '@lib/service'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(6),
})

const useLoginByEmail = () => {
  const { replace } = useRouter()
  const { handleCartAfterLogin } = useAfterLogin()
  const localStorageManager = new LocalStorageManager()
  const { mutate, isLoading } = useMutation({
    mutationKey: 'loginByEmail',
    mutationFn: (user: IUserLoginByEmail) => loginByEmail(user),
  })
  const { showToast, typeToast } = useToastMessage()
  type LoginSchema = z.infer<typeof loginSchema>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<IUserLoginByEmail> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data && 'status' in data) {
          showToast(data?.message, typeToast.success)
          localStorageManager.setItem(STORAGE_KEYS.TOKEN, data.token, TTL)
          const results = handleCartAfterLogin()
          results.then((data) => {
            if (data) {
              replace(ROUTER_PATHS.ACCOUNT_INFORMATION)
            }
          })
        }
        if (data && 'response' in data) {
          showToast(get(data, 'response.data.message'), typeToast.error)
        }
      },
    })
  }

  const email = register('email', {
    required: 'Email is required',
  })
  const password = register('password', {
    required: 'Password is required',
  })

  return {
    onSubmit,
    handleSubmit,
    email,
    password,
    errors,
    isLoading,
  }
}

export default useLoginByEmail
