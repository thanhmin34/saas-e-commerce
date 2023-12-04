'use client'
import z from 'zod'
import { get, isEmpty } from 'lodash'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import useToastMessage from '@hooks/useToastMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { editCustomerInfo } from '@lib/service'
import {
  IUserInformationParams,
  IUserInformationValues,
  IUserName,
  IUserNameBirthDateAndGender,
  IUserNameContact,
} from '@interfaces/user'
import { RootState } from '@redux/reducers'
import { IUserInfo } from '@interfaces/redux/userInfo'
import { setUserInfo } from '@redux/actions/userInfoAction'

const userNameSchema = z.object({
  firstname: z.string().trim().min(2, { message: 'Required' }),
  lastname: z.string().trim().min(2, { message: 'Required' }),
})

const userContactSchema = z.object({
  email: z.string().email(),
  phone_number: z.string().trim().min(8, { message: 'Invalid format phone' }),
})

const userBirthDateAndGenderSchema = z.object({
  day: z.string(),
  month: z.string(),
  year: z.string(),
  gender: z.string(),
})

const useUpdateAccount = () => {
  const dispatch = useDispatch()
  const { mutate: updateUserMutation, isLoading } = useMutation({
    mutationKey: 'loginByEmail',
    mutationFn: (user: IUserInformationParams) => editCustomerInfo(user),
  })
  const { showToast, typeToast } = useToastMessage()

  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { country_code } = useSelector((state: RootState) => state.configApp)

  const {
    firstname = '',
    email = '',
    lastname = '',
    phone_number,
    gender,
    birth_date,
    id: userId,
  } = userInfo as IUserInfo

  const initialDataBirthDateAndGender = () => {
    const birthDate = {
      day: '',
      month: '',
      year: '',
    }
    const newBirthDate = birth_date ? birth_date.split('/') : []
    if (birth_date && !isEmpty(newBirthDate) && newBirthDate.length > 2) {
      return {
        day: newBirthDate[0],
        month: newBirthDate[1],
        year: newBirthDate[2],
      }
    }
    return birthDate
  }

  const initialDataUserName = {
    firstname,
    lastname,
  }

  const initialDataContactUser = {
    email: email || '',
    phone_number: phone_number ? phone_number.replace(country_code, '') : '',
  }

  type UserNameSchema = z.infer<typeof userNameSchema>
  type UserContactSchema = z.infer<typeof userContactSchema>
  type UserBirthDateAndGenderSchema = z.infer<typeof userBirthDateAndGenderSchema>

  const {
    register: registerUserName,
    handleSubmit: handleSubmitUserName,
    reset: resetUserName,
    formState: { errors: errorsUserName, isSubmitSuccessful: isSubmitSuccessfulUserName },
  } = useForm<UserNameSchema>({
    resolver: zodResolver(userNameSchema),
    defaultValues: initialDataUserName,
  })

  const {
    register: registerContact,
    handleSubmit: handleSubmitUserContact,
    reset: resetUserContact,
    formState: { errors: errorsUserContact, isSubmitSuccessful: isSubmitSuccessfulContact },
    watch: watchContact,
  } = useForm<UserContactSchema>({
    resolver: zodResolver(userContactSchema),
    defaultValues: initialDataContactUser,
  })

  const {
    register: registerBirthDate,
    handleSubmit: handleSubmitUserBirthDateAndGender,
    reset: resetUserBirthDateAndGender,
    formState: { errors: errorsUserBirthDateAndGender, isSubmitSuccessful: isSubmitSuccessfulBirthDateAndGender },
    watch: watchBirthDateAndGender,
  } = useForm<UserBirthDateAndGenderSchema>({
    resolver: zodResolver(userBirthDateAndGenderSchema),
    defaultValues: {
      ...initialDataBirthDateAndGender(),
      gender: !!gender ? gender : '2',
    },
  })

  const onSubmit: SubmitHandler<IUserName | IUserNameContact | IUserNameBirthDateAndGender> = (data) => {
    console.log('data', data)

    let newParams = {
      lastname,
      firstname,
      email: email || '',
      phone_number: phone_number || '',
      gender,
      birth_date: birth_date || '',
      id: userId,
    }

    if ('day' in data) {
      const { gender, day, month, year } = data
      newParams = { ...newParams, gender, birth_date: `${day}/${month}/${year}` }
    } else if ('phone_number' in data) {
      const { phone_number } = data
      const newPhone = `${country_code || ''}${phone_number ? phone_number.replaceAll('-', '') : ''}`
      newParams = { ...newParams, ...data, phone_number: newPhone }
    } else {
      newParams = { ...newParams, ...data }
    }
    updateUserMutation(newParams, {
      onSuccess: (data) => {
        if (data && 'status' in data && data.status) {
          showToast(data?.message, typeToast.success)
          dispatch(setUserInfo(data?.user))
          return
        }
        showToast(get(data, 'response.data.message'), typeToast.error)
      },
    })
  }

  return {
    onSubmit,
    resetUserContact,
    resetUserName,
    resetUserBirthDateAndGender,
    email: registerContact('email'),
    phone_number: registerContact('phone_number'),
    firstname: registerUserName('firstname'),
    lastname: registerUserName('lastname'),
    day: registerBirthDate('day'),
    month: registerBirthDate('month'),
    year: registerBirthDate('year'),
    gender: registerBirthDate('gender'),
    errorsUserName,
    errorsUserContact,
    errorsUserBirthDateAndGender,
    isLoading: !!isLoading,
    handleSubmitUserName,
    handleSubmitUserContact,
    handleSubmitUserBirthDateAndGender,
    isSubmitSuccessfulUserName,
    watchBirthDateAndGender,
    watchContact,
    isSubmitSuccessfulContact,
    isSubmitSuccessfulBirthDateAndGender,
  }
}

export default useUpdateAccount
