import React from 'react'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'

type Props = {
  value: string
  onChange: string
  checked: string
  label: string
}

const RadioInput = (props: Props) => {
  const { label } = props || {}
  const { localizeMessage } = useIntl()
  return (
    <div className={styles.radioGenderItem}>
      <input
        // value={item.code}
        // onChange={() => setGender(item.code)}
        // checked={item.code === gender}
        className={styles.radioGenderInput}
        name="gender"
        type="radio"
        // id={item?.label}
      />
      <label className={styles.radioLabel} htmlFor={label}>
        <style jsx global>{`
          .styles_radioGender__WCtOU
            .styles_radioGenderItem__qcX44
            input[type='radio']:checked
            + .styles_radioLabel__NoJHm:before {
            background-color: #149447 !important;
          }
        `}</style>
        {localizeMessage(label)}
      </label>
    </div>
  )
}

export default RadioInput
