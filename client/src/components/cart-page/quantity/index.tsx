import { ChangeEvent, useCallback, useState } from 'react'
import styles from './styles.module.scss'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { imageUrls } from '@constants/imageUrls'

interface Props {
  currentQuantity: number
}
const QuantityContainer = ({ currentQuantity }: Props) => {
  const [editingQuantity, setEditingQuantity] = useState(currentQuantity)
  const [isDisabledIncrementDecrement, setIsDisabledIncrementDecrement] = useState(false)

  const validateInput = useCallback((input: string) => {
    if (input.match(/^[1-9]\d*$/g) || input === '') {
      return true
    }
    return false
  }, [])

  const handleIncreaseQuantity = () => {
    // increaseQuantity()
  }

  const handleDecreaseQuantity = () => {
    // decreaseQuantity()
  }

  const handleOnChangeInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value
    if (newQuantity === '') {
      setIsDisabledIncrementDecrement(true)
    } else {
      setIsDisabledIncrementDecrement(false)
    }
    const isValid = validateInput(newQuantity)
    isValid && setEditingQuantity(+newQuantity)
  }

  const handleOnFocus = () => {
    // setIsQuantityEditing(true)
  }

  const handleOnBlur = async () => {
    try {
      if (editingQuantity <= 0) {
        // handleRemoveItem()
      }
      const editingQuantityNumber = Number(editingQuantity)
      //   editingQuantityNumber !== currentQuantity && (await adjustQuantity(editingQuantityNumber))
      //   setIsQuantityEditing(false)
    } catch (error) {
      // TO DO:
    }
  }

  function renderIncrementButton() {
    return (
      <button onClick={handleIncreaseQuantity} disabled={isDisabledIncrementDecrement}>
        <AddIcon />
      </button>
    )
  }

  function renderDecrementButton() {
    return (
      <button disabled={currentQuantity === 1 || isDisabledIncrementDecrement} onClick={handleDecreaseQuantity}>
        <RemoveIcon />
      </button>
    )
  }

  function renderQuantityInput() {
    return (
      <input
        value={editingQuantity}
        onChange={handleOnChangeInputQuantity}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    )
  }

  return (
    <div className={styles.quantityContainer}>
      {renderDecrementButton()}
      {renderQuantityInput()}
      {renderIncrementButton()}
    </div>
  )
}

export default QuantityContainer
