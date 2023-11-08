import { map } from 'lodash'
import styles from './styles.module.scss'
import BannerItem from './BannerItem'

export interface IPropsBanner {
  src: string
  link: string
  alt: string
  label: string
}

const Banner = ({ banner }: { banner: IPropsBanner[] }) => {
  const content = map(banner, (item, index) => <BannerItem item={item} key={index} />)

  return <div className={styles.banner}>{content}</div>
}

export default Banner
