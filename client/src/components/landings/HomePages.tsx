import { SliderBlock, Banner, ProductSliders } from './HTMLBlock'

import styles from './styles.module.scss'

const HomePages = ({}) => {
  return (
    <div className={styles.homePages}>
      <SliderBlock />
      <Banner />
      <ProductSliders />
      <div style={{ height: 1000 }}></div>
    </div>
  )
}

export default HomePages
