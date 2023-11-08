import { map } from 'lodash'
import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

interface ISliderItem {
  src: string
  link: string
  alt: string
  label: string
}

const SliderBlock = (props: { images: ISliderItem[] }) => {
  const { images } = props
  const renderUi = map(images.slice(0, 1), (item, index) => (
    <Link href={item.link} key={index} className={styles.sliderItem}>
      <img src={item.src} alt={item.alt} />
    </Link>
  ))

  return <div className={styles.slider}>{renderUi}</div>
}

export default SliderBlock
