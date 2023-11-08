'use client'
import useLandingPage from '@lib/landings/useLandingPage'
import { SliderBlock, Banner, ProductSliders } from './HTMLBlock'

import styles from './styles.module.scss'
import Loading from '@components/loading'
import { Fragment, useMemo } from 'react'
import { get, map } from 'lodash'

const HomePages = ({}) => {
  const { data, isLoading } = useLandingPage()

  const content = useMemo(() => {
    let content: JSX.Element[] = map([], (key) => <Fragment key={key} />)
    const landingPage = get(data, 'home_page')

    if (landingPage) {
      content = map(landingPage, (item, index) => {
        const { type } = item || {}

        switch (type) {
          case 'imageSlider':
            return (
              <Fragment key={index}>
                <SliderBlock images={get(item, 'image_slider.images', [])} />
              </Fragment>
            )
          case 'sliderBrand':
            return (
              <Fragment key={index}>
                <Banner banner={get(item, 'brand_slider.images', [])} />
              </Fragment>
            )
          case 'productList':
            return (
              <Fragment key={index}>
                <ProductSliders />
              </Fragment>
            )
          default:
            return <Fragment key={index} />
        }
      })
    }
    return content
  }, [data])

  return (
    <div className={styles.homePages}>
      {/* <SliderBlock />
      <Banner />
      <ProductSliders /> */}
      {content}
      <div style={{ height: 1000 }}></div>
      {isLoading && <Loading />}
    </div>
  )
}

export default HomePages
