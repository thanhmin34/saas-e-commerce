import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

import apiClient from '@network/apiClient'
import { APIS } from '@constants/apis'

import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRegister } from '@interfaces/user'
import useToastMessage from '@hooks/useToastMessage'
import { get } from 'lodash'

interface User {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const registerByEmail = async (body: User) => {
  const { post } = apiClient()
  try {
    const responsive = await post(APIS.REGISTER_BY_EMAIL, body)

    return responsive
  } catch (error) {
    console.log('error', error)

    return error as AxiosError
  }
}

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
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6)
    .max(20),
})
const useRegisterByEmail = () => {
  const { mutate, reset, error, isLoading } = useMutation('registerByEmail', {
    mutationFn: (body: User) => registerByEmail(body),
  })
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

  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    mutate(data, {
      onError(error) {
        console.log('error', error)
      },
      onSuccess: (data) => {
        if (data && 'status' in data) {
          showToast(data?.message, typeToast.success)
        }
        if (data && 'response' in data) {
          showToast(get(data, 'response.data.message'), typeToast.error)
        }
      },
    })
  }

  const firstName = register('firstName', {
    required: 'Firstname is required',
  })
  const lastName = register('lastName', {
    required: 'Lastname is required',
  })
  const email = register('email', {
    required: 'Email is required',
  })
  const password = register('password', {
    required: 'Password is required',
  })

  return { onSubmit, handleSubmit, error, isLoading, firstName, lastName, email, password, errors }
}

export default useRegisterByEmail
