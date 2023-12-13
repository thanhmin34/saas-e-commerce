// import React from 'react'
// // hooks
// import useStyles from '@hooks/useStyles'
// import { useOrderDetailsContext } from '@contexts/OrderDetailsContext'
// // styles
// import styles from './styles.module.scss'
// //
// import { LocalizeMessage } from '@lang/helper'
// import { TITLE_INFORMATION } from '@constants/order'
// import useRtl from '@hooks/useRtl'
// import { useIntl } from '@hooks/useIntl'

// const OrderInformation = () => {
//   const { titleStyle, textStyle } = useStyles()
//   const { infoOrder } = useOrderDetailsContext()
//   const { address, phone, paymentMethod, shippingMethod } = infoOrder
//   const { rtl } = useRtl()
//   const { t, localizeMessage } = useIntl()
//   const phoneStyle = {
//     direction: 'ltr',
//     textAlign: rtl ? 'right' : 'left',
//     ...textStyle,
//   }
//   const data = [
//     {
//       title: address,
//       subTitle: phone,
//     },
//     {
//       title: shippingMethod,
//       subTitle: '',
//     },
//     {
//       title: address,
//       subTitle: phone,
//     },
//     {
//       title: paymentMethod,
//       subTitle: '',
//     },
//   ]

//   const blockInformation = (
//     <div className={styles.orderInformationRow}>
//       {data.map((item, index) => (
//         <div key={index} className={styles.orderInformationColumn}>
//           <span className={styles.oderInformationTitle}>{item?.title}</span>
//           <span style={phoneStyle}>{item?.subTitle}</span>
//         </div>
//       ))}
//     </div>
//   )
//   return (
//     <div className={styles.orderInformation}>
//       <h2 className={styles.titleOrderInformation} style={titleStyle}>
//         <LocalizeMessage id="Order Information" />
//       </h2>
//       <div className={styles.wrapperTitle}>
//         {TITLE_INFORMATION.map((item) => (
//           <div style={textStyle} className={styles.titleRow} key={item}>
//             {localizeMessage(item)}
//           </div>
//         ))}
//       </div>
//       {blockInformation}
//     </div>
//   )
// }

// export default OrderInformation
