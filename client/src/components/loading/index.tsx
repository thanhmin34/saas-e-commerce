'use client'
import ReactLoading, { LoadingType } from 'react-loading'
import styles from './styles.module.scss'
interface Loading {
  type?: LoadingType | undefined
  color?: string | undefined
  height?: string | number
  width?: string | number
}
const Loading = ({ type = 'spinningBubbles', color = '#000000', height = '40px', width = '60px' }: Loading) => {
  return (
    <div className={styles.loading}>
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  )
}

export default Loading
