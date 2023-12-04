'use client'
import { map } from 'lodash'
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'
import useIntl from '@hooks/useIntl'
import GroupTitle from '../GroupTitle'
import styles from './styles.module.scss'
import { GENDERS, MONTH_OPTIONS } from '@constants/account'
import ButtonContainer from '../ButtonContainer'
import useUpdateAccount from '@lib/account-information/useUpdateAccount'
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { IRenderInputBirthDate } from '@interfaces/user'
import { getDayByYearAndMonth, getFullYear } from '@utils/helper'

const GenderAndBirthdaySection = () => {
  const { localizeMessage } = useIntl()
  const [isEdit, setIsEdit] = useState(false)

  const {
    watchBirthDateAndGender,
    gender,
    year,
    day,
    month,
    isLoading,
    onSubmit,
    handleSubmitUserBirthDateAndGender,
    isSubmitSuccessfulBirthDateAndGender,
    resetUserBirthDateAndGender,
  } = useUpdateAccount()
  const selectedGender = watchBirthDateAndGender('gender')
  const currentDay = watchBirthDateAndGender('day')
  const currentMonth = watchBirthDateAndGender('month')
  const currentYear = watchBirthDateAndGender('year')

  const handleToggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev)
  }, [isEdit])

  const renderGenderRadio = useCallback(() => {
    return (
      <div className={styles.radioGender}>
        {GENDERS.map((item) => (
          <div key={item.id} className={styles.radioGenderItem}>
            <input
              type="radio"
              id={item.title}
              defaultChecked={selectedGender === item.id}
              value={item.id}
              {...gender}
              disabled={!isEdit}
            />
            <label className={styles.radioLabel} htmlFor={item?.title}>
              <style jsx global>{`
                .styles_radioGender__WCtOU
                  .styles_radioGenderItem__qcX44
                  input[type='radio']:checked
                  + .styles_radioLabel__NoJHm:before {
                  background-color: #149447 !important;
                }
              `}</style>
              {localizeMessage(item?.title)}
            </label>
          </div>
        ))}
      </div>
    )
  }, [selectedGender, isEdit])

  const renderInputBirthDate = ({ title, options, values, disabled, value }: IRenderInputBirthDate) => {
    return (
      <FormControl className={styles.sortDropdown} sx={{ m: 1 }} size="small">
        <InputLabel id={title}>{localizeMessage(title)}</InputLabel>
        <Select
          labelId={title}
          id={`demo-simple-select_${title}`}
          label={title}
          className={styles.sortDropdown}
          // ref={values.ref}
          // onChange={values.onChange}
          // onBlur={values.onBlur}
          {...values}
          disabled={disabled}
          value={value || ''}
        >
          {map(options, (item) => (
            <MenuItem className={styles.list} key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  useEffect(() => {
    if (isSubmitSuccessfulBirthDateAndGender) {
      setIsEdit(false)
    }
  }, [isSubmitSuccessfulBirthDateAndGender])

  return (
    <form onSubmit={handleSubmitUserBirthDateAndGender(onSubmit)}>
      <div>
        <GroupTitle isDisabled={false} title={localizeMessage('Birthday')} onClick={handleToggleEdit} />
        <div className={styles.editContainer}>
          {renderInputBirthDate({
            title: 'day',
            options: getDayByYearAndMonth(+currentYear, +currentMonth),
            values: day,
            disabled: !isEdit,
            value: currentDay || '',
          })}
          {renderInputBirthDate({
            title: 'month',
            options: MONTH_OPTIONS,
            values: month,
            disabled: !isEdit,
            value: currentMonth || '',
          })}
          {renderInputBirthDate({
            title: 'year',
            options: getFullYear(),
            values: year,
            disabled: !isEdit,
            value: currentYear || '',
          })}
        </div>
        <div className={styles.genderUser}>
          <span>{localizeMessage('Gender')}</span>
          {renderGenderRadio()}
        </div>
      </div>
      {isEdit && (
        <ButtonContainer
          onCancel={() => {
            handleToggleEdit()
            resetUserBirthDateAndGender()
          }}
          onSubmit={() => {}}
          disabled={!isEdit || isLoading}
        />
      )}
    </form>
  )
}

export default GenderAndBirthdaySection
