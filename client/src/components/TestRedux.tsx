'use client'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import axios from 'axios'
import { RootState } from '@redux/reducers'
import { removeCart, setCart } from '@redux/actions/cartActions'
import { useQuery } from 'react-query'
import useToastMessage from '@hooks/useToastMessage'

function MyComponent() {
  const dispatch = useDispatch()
  const { showToast, typeToast } = useToastMessage()
  const cartData = useSelector((state: RootState) => state.cartData)
  const handleFetchData = () => {
    setCart({ test: '123' })
  }

  const handleRemoveFetchData = () => {
    // dispatch(removeCart())
  }

  const { isLoading, error, data, refetch } = useQuery(
    'repoData',
    () => fetch('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.json()),
    { cacheTime: 5000, refetchOnWindowFocus: false }
  )

  const handleButtonClick = () => {
    refetch()
  }

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error

  const closeAfter15 = () => showToast('test', typeToast.success)

  const closeAfter7 = () => showToast('test', typeToast.error)

  return (
    <div>
      <button onClick={closeAfter15}>Close after 15 seconds</button>
      <button onClick={closeAfter7}>Close after 7 seconds</button>
    </div>
  )
}

export default MyComponent
