import React from 'react'
import styles from './styles.module.scss'
import Button from '@components/button'
import { BUTTON_TYPES } from '@constants/colors'
import useIntl from '@hooks/useIntl'

type Props = {
  disabled: boolean
  onCancel: () => void
  onSubmit: () => void
}

const ButtonContainer = (props: Props) => {
  const { disabled, onCancel, onSubmit } = props
  const { localizeMessage } = useIntl()
  return (
    <div className={styles.buttonContainer}>
      <Button
        className={`${styles.button} ${styles.cancelButton}`}
        onClick={onCancel}
        buttonType={BUTTON_TYPES.OUTLINE}
        type="button"
      >
        {localizeMessage('Cancel')}
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        className={`${styles.button} ${styles.savingButton}`}
        disabled={disabled}
      >
        {localizeMessage('Update')}
      </Button>
    </div>
  )
}

export default ButtonContainer
