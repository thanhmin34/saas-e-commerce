'use client'
import React from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import { BUTTON_TYPES } from '@constants/colors'
import InputPhone from '@components/input-phone'
import InputPrimary from '@components/input/InputPrimary'
import { FormControlLabel } from '@mui/material'
import { MaterialUISwitch } from '@utils/customStyledInput'
import { IMyAddressContact, TCreateAddressParams } from '@interfaces/user'
import CheckoutAWSMap from '@components/pages-components/checkout/aws-map/AWSMaps'
import { DEFAULT_VALUE } from '@constants/map'
import { IPlace } from '@interfaces/checkout'
import { VIEW_CONTENT_ADDRESS } from '@constants/account'

type Props = {
  onCreateAddress: (address: TCreateAddressParams) => Promise<boolean>
  onChangeView: (view: string) => void
}

const addressSchema = z.object({
  email: z.string().email(),
  phone: z.string().trim().min(6),
  first_name: z.string().trim().min(1, { message: 'First name is required' }),
  last_name: z.string().trim().min(1, { message: 'Last name is required' }),
  is_default_address: z.boolean(),
  address: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    post_code: z.string(),
    region: z.string(),
    address_number: z.string(),
    label: z.string(),
    tempLatLng: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
})

const CreateAddress = (props: Props) => {
  const { onCreateAddress, onChangeView } = props || {}
  const { localizeMessage } = useIntl()
  type AddressSchema = z.infer<typeof addressSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
  })

  const email = register('email')
  const phone = register('phone')
  const first_name = register('first_name')
  const last_name = register('last_name')
  const is_default_address = register('is_default_address')

  const onSubmit: SubmitHandler<IMyAddressContact> = (data) => {
    const { first_name, last_name, phone, email, is_default_address, address } = data
    const newParams = {
      first_name,
      last_name,
      phone,
      email,
      is_default_address,
      ...address,
    }

    const results = onCreateAddress(newParams)
    results.then((data) => {
      if (data) {
        onChangeView(VIEW_CONTENT_ADDRESS.ADDRESS_LIST)
      }
    })
  }

  const onChangeAddress = (data: IPlace) => {
    setValue('address', data)
  }
  const renderButtonWrapper = () => {
    return (
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => onChangeView(VIEW_CONTENT_ADDRESS.ADDRESS_LIST)}
          type="button"
          className={styles.buttonOutline}
          buttonType={BUTTON_TYPES.OUTLINE}
        >
          {localizeMessage('Cancel')}
        </Button>
        <Button type="submit" className={styles.buttonSubmit}>
          {localizeMessage('Add')}
        </Button>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div className={styles.contact}>
          <InputPrimary
            name="first_name"
            ref={first_name.ref}
            onChange={first_name.onChange}
            onBlur={first_name.onBlur}
            message={errors?.first_name?.message}
            placeholder={localizeMessage('First Name')}
            className={styles.inputElement}
          />
          <InputPrimary
            name="last_name"
            ref={last_name.ref}
            onChange={last_name.onChange}
            onBlur={last_name.onBlur}
            message={errors?.last_name?.message}
            placeholder={localizeMessage('Last Name')}
            className={styles.inputElement}
          />
          <InputPhone message={errors?.phone?.message} name="phone" paramsRef={phone} className={styles.phoneInput} />
          <InputPrimary
            name="email"
            ref={email.ref}
            onChange={email.onChange}
            onBlur={email.onBlur}
            message={errors?.email?.message}
            placeholder={localizeMessage('Email')}
            className={styles.inputElement}
          />
        </div>
        <div className={styles.map}>
          <h1 className={styles.title}> {localizeMessage('Address')}</h1>
          <CheckoutAWSMap
            styleCss={{
              height: 400,
            }}
            onChangeAddress={onChangeAddress}
            currentAddress={{ tempLatLng: DEFAULT_VALUE }}
          />
        </div>
        <FormControlLabel
          className={styles.checked}
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              ref={is_default_address.ref}
              name="is_default_address"
              onBlur={is_default_address.onBlur}
              onChange={is_default_address.onChange}
            />
          }
          label="Set Default address"
        />
        {renderButtonWrapper()}
      </form>
    )
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{localizeMessage('Contact Information')}</h1>
      {renderContent()}
    </div>
  )
}

export default CreateAddress
