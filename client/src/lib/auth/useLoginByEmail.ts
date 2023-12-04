import z from 'zod'
import { get } from 'lodash'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { APIS } from '@constants/apis'
import { TTL } from '@constants/variables'
import { ROUTER_PATHS } from '@constants/routerPaths'
import STORAGE_KEYS from '@constants/storageKeys'
import { zodResolver } from '@hookform/resolvers/zod'
import useToastMessage from '@hooks/useToastMessage'
import apiClient from '@network/apiClient'
import LocalStorageManager from '@utils/simplePersistence'
import { useAfterLogin } from './useAfterLogin'

type IUser = {
  email: string
  password: string
}

const loginByEmail = async <T extends IUser>(user: T) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.LOGIN_BY_EMAIL, user)
    return responsive
  } catch (error) {
    return error as AxiosError
  }
}

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
    mutationFn: (user: IUser) => loginByEmail(user),
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

  const onSubmit: SubmitHandler<IUser> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data && 'status' in data) {
          showToast(data?.message, typeToast.success)
          localStorageManager.setItem(STORAGE_KEYS.TOKEN, data.token, TTL)
          replace(ROUTER_PATHS.ACCOUNT_INFORMATION)
          handleCartAfterLogin()
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
