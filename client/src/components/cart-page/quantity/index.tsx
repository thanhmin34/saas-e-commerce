import { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { imageUrls } from '@constants/imageUrls'
import useUpdateCart from '@lib/products/useUpdateCart'
import Loading from '@components/loading'

interface Props {
  currentQuantity: number
  productId: number
}
const QuantityContainer = ({ currentQuantity, productId }: Props) => {
  const [editingQuantity, setEditingQuantity] = useState(currentQuantity)
  const [isDisabledIncrementDecrement, setIsDisabledIncrementDecrement] = useState(false)
  const { handleUpdateQty, handleRemoveToCart, isLoading } = useUpdateCart()

  const validateInput = (input: string) => {
    if (input.match(/^[1-9]\d*$/g) || input === '') {
      return true
    }
    return false
  }

  const handleIncreaseQuantity = () => {
    handleUpdateQty({
      quantity: editingQuantity + 1,
      product_id: productId,
    })
  }

  const handleDecreaseQuantity = () => {
    handleUpdateQty({
      quantity: editingQuantity - 1,
      product_id: productId,
    })
  }

  const handleOnChangeInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value
    setIsDisabledIncrementDecrement(!!newQuantity)
    const isValid = validateInput(newQuantity)
    isValid && setEditingQuantity(+newQuantity)
  }

  const handleOnFocus = () => {
    // setIsQuantityEditing(true)
  }

  const handleOnBlur = async () => {
    try {
      if (editingQuantity <= 0) {
        handleRemoveToCart({ product_id: productId })
      }
      const editingQuantityNumber = Number(editingQuantity)
      editingQuantityNumber !== currentQuantity &&
        handleUpdateQty({
          quantity: editingQuantityNumber,
          product_id: productId,
        })
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

  useEffect(() => {
    if (currentQuantity) {
      setEditingQuantity(currentQuantity)
    }
  }, [currentQuantity])

  return (
    <div className={styles.quantityContainer}>
      {renderDecrementButton()}
      {renderQuantityInput()}
      {renderIncrementButton()}
      {isLoading && <Loading />}
    </div>
  )
}

export default QuantityContainer
