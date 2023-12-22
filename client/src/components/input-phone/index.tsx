import React, { ChangeEventHandler, Fragment, LegacyRef, useRef, useState } from 'react'
import InputMask, { BeforeMaskedStateChangeStates, ReactInputMask } from 'react-input-mask'
import styles from './styles.module.scss'
import { imageUrls } from '@constants/imageUrls'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { DEFAULT_COUNTRY_CODE, DEFAULT_PLACE_HOLDER_INPUT, PHONE_INPUT_MASK_DEFAULT } from '@constants/login'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  phone?: number | string
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  disabled?: boolean
  name?: string
  isRequired?: boolean
  onBlur?: ChangeEventHandler<HTMLInputElement>
  paramsRef?: UseFormRegisterReturn<'phone_number' | 'phone'>
  message?: string
}
const InputPhone = (props: InputProps) => {
  const { paramsRef, phone, onChange, className, disabled, name = 'phone', isRequired = false, message } = props

  const { country_code, mask_input_phone, place_holder_country, image_country_input } = useSelector(
    (state: RootState) => state.configApp
  )
  const countryCode = country_code || DEFAULT_COUNTRY_CODE
  const phoneInputMaskCountry = mask_input_phone || PHONE_INPUT_MASK_DEFAULT
  const placeholderCountry = place_holder_country || DEFAULT_PLACE_HOLDER_INPUT

  const [mask, updateMask] = useState(phoneInputMaskCountry)
  const url = image_country_input || imageUrls.iconVnPhone

  function beforeMaskedValueChange(beforeMask: BeforeMaskedStateChangeStates) {
    let { previousState, currentState, nextState } = beforeMask || {}
    const { value, selection } = previousState || {}

    let newValue = value
    if (nextState && nextState.value) {
      const prefix = countryCode?.startsWith('+') ? countryCode?.slice(1) : countryCode

      if (prefix && (nextState.value.startsWith(`+${prefix}`) || nextState.value.startsWith(prefix))) {
        newValue = nextState.value.replace(prefix, '').replace('+', '').replace(/\s/g, '')
      }
    }

    if (newValue.startsWith('0')) newValue = newValue.slice(1)

    return {
      value: newValue,
      selection,
    }
  }

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    if (value.length > 3) {
      updateMask(phoneInputMaskCountry)
    } else updateMask(PHONE_INPUT_MASK_DEFAULT)

    onChange && onChange(e)
  }

  const valuePhone = () => {
    if (phone) {
      return { value: phone }
    }
    return { defaultValue: '' }
  }

  const renderParamsRef = () => {
    if (paramsRef) {
      return paramsRef
    }
    return {}
  }

  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <div className={`${styles.inputPhone} ${styles.element} `}>
        <div className={disabled ? styles.disabledInput : styles.enableInput}>
          <div>
            <div className={styles.img}>
              <img src={url} alt="icon-country" width={30} height={20} />
            </div>
          </div>
          <span className={styles.placeholder}>{countryCode}</span>
        </div>
        <InputMask
          mask={mask}
          className={styles.inputMask}
          placeholder={placeholderCountry}
          type="tel"
          {...valuePhone()}
          name={name}
          onChange={onChangePhone}
          maskChar={null}
          disabled={disabled ?? false}
          // beforeMaskedStateChange={beforeMaskedValueChange}
          {...renderParamsRef()}
        />
        {isRequired && <div className={styles.iconRequired}>*</div>}
      </div>
      {message ? <div className={styles.messageError}>{message}</div> : ''}
    </div>
  )
}

export default InputPhone
