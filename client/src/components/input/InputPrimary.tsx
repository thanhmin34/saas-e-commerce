import styles from './styles.module.scss'
import React, { ChangeEventHandler } from 'react'

interface InputPrimary {
  value: string | number
  placeholder?: string | undefined
  type?: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  name?: string | undefined
  className?: string | undefined
  message?: string | undefined
}

const InputPrimary = ({
  value = '',
  onChange,
  type = 'text',
  placeholder = 'Enter the input',
  name,
  className,
  message,
}: InputPrimary) => {
  return (
    <div className={`${styles.inputElement} ${className}`}>
      <div className={styles.inputWrapper}>
        <input onChange={onChange} value={value} name={name} type={type} placeholder=" " className={styles.input} />
        <span className={styles.label}>{placeholder}</span>
      </div>
      {message ? <div className={styles.messageError}>{message}</div> : ''}
    </div>
  )
}

export default InputPrimary
