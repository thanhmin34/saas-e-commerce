import { find, get } from 'lodash'
import { useMemo } from 'react'
import useDetectDevice from './useDetectDevice'
import { DEVICE } from '@constants/device'

const data = {
  CmsBlockList: [
    {
      content:
        '<div class="footer-links">\r\n<div class="section"><button id="collapse_1_footer_dropdown" class="title-container"><span class="title-content-wrapper"><span class="title-content">NATURAL TOUCH</span><img class="title-icon" src="/assets/images/icon/dropdown.png" width="20" height="18"></span></button>\r\n<div class="content-container">\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/about-us">About Us</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/stores">Stores</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/career">Career</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/contact-us">Contact Us</a></div>\r\n</div>\r\n</div>\r\n<div class="section"><button id="collapse_2_footer_dropdown" class="title-container"><span class="title-content-wrapper"><span class="title-content">MY ACCOUNT</span><img class="title-icon" src="/assets/images/icon/dropdown.png" width="20" height="18"></span></button>\r\n<div class="content-container">\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/account-information">Customer Account</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/account-information#my-wishlist">Wishlist</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/privacy-policy">Return of Products</a></div>\r\n</div>\r\n</div>\r\n<div class="section"><button id="collapse_3_footer_dropdown" class="title-container"><span class="title-content-wrapper"><span class="title-content">CUSTOMER SERVICES</span><img class="title-icon" src="/assets/images/icon/dropdown.png" width="20" height="18"></span></button>\r\n<div class="content-container">\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/customer-service">Customer Service</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/common-question">FAQs</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/privacy-policy">Privacy Policy</a></div>\r\n</div>\r\n</div>\r\n<div class="section"><button id="collapse_4_footer_dropdown" class="title-container"><span class="title-content-wrapper"><span class="title-content">PAYMENT &amp; DELIVERY</span><img class="title-icon" src="/assets/images/icon/dropdown.png" width="20" height="18"></span></button>\r\n<div class="content-container">\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/delivery-time">Delivery Time</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/cost-of-delivery">Cost of Delivery</a></div>\r\n<div class="link-item--mobile"><a class="footer-link" href="/en/order-information">Shipment Tracking</a></div>\r\n</div>\r\n</div>\r\n<ul class="callout">\r\n<ul class="callout">\r\n<li class="heading">SIGN UP FOR UPDATES</li>\r\n</ul>\r\n</ul>\r\n<p class="contact">By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. More details on this are provided in our Privacy Policy.</p>\r\n<div class="subcribePageBodySubFour"><input id="subscribeEmailInput_bot" class="inputSubcribeFooter" type="text" placeholder="Enter email address"> <button id="buttonSubcribe_bot" class="buttonSubcribeFooter" style="background-color: #02150a; color: #ffffff;">Subscribe</button><a>&nbsp;</a></div>\r\n<div class="subcribePageBodySubFour">\r\n<p><span class="copyright-detail">2023 AL Safa Group All Rights Reserved. Commercial Registry Number:&nbsp;<span style="font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">1010412384</span> - Tax Number: <span style="font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">300664965200003</span></span></p>\r\n</div>\r\n</div>',
      identifier: 'footer_links_mobile',
      title: 'Main footer Mobile EN',
      background_image: 'https://media.9ten.cloud/media/',
      __typename: 'CmsBlockListOutput',
    },
    {
      content:
        '<div class="subcribe-block">\r\n<div class="subcribePageContainerLeft ">\r\n<div class="subcribePageContainerContent">\r\n<div class="subcribePageTitle" style="color: rgb(2, 21, 10); text-align: center;"><strong>Follow us on&nbsp;</strong></div>\r\n<div class="subcribePageListSocial" style="text-align: left;">\r\n<div class="listSocialIcon"><a href="https://www.facebook.com/NaturalTouchme/"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276253.png" width="30" height="30"> </a> <a href="https://www.instagram.com/naturaltouchme/"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276432.png" width="30" height="30"> </a> <a href="https://twitter.com/naturaltouchme"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690340199.png" width="30" height="30"> </a> <a href="https://www.snapchat.com/add/naturaltouchsa"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276492.png" width="30" height="30"> </a><a href="https://api.whatsapp.com/send?phone=966503111601"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276598.png" width="30" height="30"> </a><a href="https://www.tiktok.com/@naturaltouchme"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1692159280.png" width="30" height="30"> </a><a href="https://www.threads.net/@naturaltouchme"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276521.png" width="30" height="30"> </a><a href="https://www.linkedin.com/company/naturaltouchme"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276465.png" width="30" height="30"> </a><a href="mailto:Support@naturaltouchshop.com"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690276308.png" width="30" height="30"></a></div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>',
      identifier: 'subcribe_block',
      title: 'Subcribe Block',
      background_image: 'https://media.9ten.cloud/media/cmsblock/images/back_fround_image_6.png',
      __typename: 'CmsBlockListOutput',
    },
    {
      content:
        '<p style="text-align: left;"><a href="https://onelink.to/3rrgzj" target="_blank" rel="noopener"><strong> Download Our App</strong></a>&nbsp;And Have A great Shopping Experience ** Free shipping For Orders Over 299 SAR</p>',
      identifier: 'topbar_right_content',
      title: 'Top bar right content EN',
      background_image: 'https://media.9ten.cloud/media/',
      __typename: 'CmsBlockListOutput',
    },
    {
      content:
        '<div class="card-list"><span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302346.png" alt="image-checkout-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302357.png" alt="image-mastercard-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302608.png" alt="image-visa-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302185.png" alt="image-applepay-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302370.png" alt="image-tamara-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302363.png" alt="image-tabby-card" width="44" height="30"> </span> <span class="card-image-container"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689302205.png" alt="image-cash-on-delivery" width="44" height="30"> </span></span></div>',
      identifier: 'footer_cards',
      title: 'Footer Cards',
      background_image: 'https://media.9ten.cloud/media/',
      __typename: 'CmsBlockListOutput',
    },
    {
      content:
        '<p><span class="social-image-container"> <a href="https://www.facebook.com/NaturalTouchme/" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689325845.png" alt="image-fb-social" width="24" height="24"> </a> </span> <span class="social-image-container" style="\r\n    margin-inline-start: 11px;"> <a href="https://twitter.com/naturaltouchme" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690346407.png" alt="image-tw-social" width="24" height="24"> </a> </span> <span class="social-image-container" style="\r\n    margin-inline-start: 11px;"> <a href="https://www.instagram.com/naturaltouchme/" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689325953.png" alt="image-ins-social" width="24" height="24"> </a> </span> <span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="https://www.snapchat.com/add/naturaltouchsa" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1689325993.png" alt="image-snapchat-social" width="24" height="24"> </a> </span><span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="https://api.whatsapp.com/send?phone=966503111601" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1692155760.png" alt="image-whatsapp-social" width="24" height="24"> </a> </span><span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="https://www.tiktok.com/@naturaltouchme" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1692156812.png" alt="image-tiktok-social" width="24" height="24"> </a> </span><span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="https://www.threads.net/@naturaltouchme" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1692156836.png" alt="image-threads-social" width="24" height="24"> </a> </span><span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="https://www.linkedin.com/company/naturaltouchme" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1690358602.png" alt="image-linkedin-social" width="24" height="24"> </a> </span><span class="social-image-container" style="\r\n    margin-inline-start: 11px;\r\n"> <a href="mailto:Support@naturaltouchshop.com" target="_blank" rel="noopener"> <img src="https://media.9ten.cloud/media/SnaptecBanner/banner_image1692156139.png" alt="image-mail" width="24" height="24"> </a> </span></p>',
      identifier: 'footer_socials',
      title: 'Footer Socials',
      background_image: 'https://media.9ten.cloud/media/',
      __typename: 'CmsBlockListOutput',
    },
    {
      content:
        '<div class="footer-links">\r\n<ul class="link-group">\r\n<li class="link-item">NATURAL TOUCH</li>\r\n<li class="link-item"><a href="/en/about-us">About Us</a></li>\r\n<li class="link-item"><a href="/en/stores">Stores</a></li>\r\n<li class="link-item"><a href="/en/career">Career</a></li>\r\n<li class="link-item"><a href="/en/contact-us">Contact Us</a></li>\r\n</ul>\r\n<ul class="link-group">\r\n<li class="link-item">MY NATURAL TOUCH</li>\r\n<li class="link-item"><a href="/en/account-information">Customer Account</a></li>\r\n<li class="link-item"><a href="/en/account-information#my-wishlist">Wish List</a></li>\r\n<li class="link-item"><a href="/en/privacy-policy">Return of Products</a></li>\r\n</ul>\r\n<ul class="link-group">\r\n<li class="link-item">CUSTOMER SERVICES</li>\r\n<li class="link-item"><a href="/en/customer-service">Customer Service</a></li>\r\n<li class="link-item"><a href="/en/common-question">FAQs</a></li>\r\n<li class="link-item"><a href="/en/privacy-policy">Privacy Policy</a></li>\r\n</ul>\r\n<ul class="link-group">\r\n<li class="link-item">PAYMENT &amp; DELIVERY</li>\r\n<li class="link-item"><a class="footer-link" href="/en/delivery-time">Delivery Time</a></li>\r\n<li class="link-item"><a class="footer-link" href="/en/payment-methods">Payment Methods</a></li>\r\n<li class="link-item"><a class="footer-link" href="/en/order-information">Shipment Tracking</a></li>\r\n</ul>\r\n<ul class="callout">\r\n<li class="heading" style="text-align: left;"><strong>SIGN UP FOR UPDATES</strong></li>\r\n<li style="text-align: left;">\r\n<p class="contact">By entering your email address below, you consent to receive our newsletter with access to our latest collections, events, and initiatives. More details on this are provided in our Privacy Policy.</p>\r\n</li>\r\n<li style="text-align: left;">\r\n<div class="subcribePageBodySubFour"><input id="subscribeEmailInput_bot" class="inputSubcribeFooter" type="text" placeholder="Enter email address"> <button id="buttonSubcribe_bot" class="buttonSubcribeFooter" style="background-color: #02150a; color: #ffffff;">Subscribe</button></div>\r\n</li>\r\n<li style="font-weight: 400; padding-top: 5px; text-align: left;">\r\n<div class="row">\r\n<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 copyright"><address>2023 AL Safa Group All Rights Reserved. Commercial Registry Number:&nbsp;<span style="font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">1010412384</span> - Tax Number: <span style="font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">300664965200003</span></address></div>\r\n</div>\r\n</li>\r\n</ul>\r\n</div>',
      identifier: 'footer_links_desktop',
      title: 'Main footer EN',
      background_image: 'https://media.9ten.cloud/media/',
      __typename: 'CmsBlockListOutput',
    },
  ],
}

const handleFindItem = (data: any, key: any) => {
  const result = find(data, (item) => {
    if (item.identifier === key) {
      return item
    }
  })
  return get(result, 'content')
}

export const useFooter = () => {
  const { device } = useDetectDevice()
  const { CmsBlockList } = data

  const links = useMemo(() => {
    const result = find(CmsBlockList, (item) => {
      const isFooter = `footer_links_${device === DEVICE.MOBILE ? DEVICE.MOBILE : DEVICE.DESKTOP}`
      if (item.identifier === isFooter) {
        return item
      }
    })
    return get(result, 'content')
  }, [CmsBlockList, device])

  const socials = useMemo(() => {
    return handleFindItem(CmsBlockList, 'footer_socials')
  }, [CmsBlockList])

  const cards = useMemo(() => {
    return handleFindItem(CmsBlockList, 'footer_cards')
  }, [CmsBlockList])

  const subDetails = useMemo(() => {
    return handleFindItem(CmsBlockList, 'footer_subdetails')
  }, [CmsBlockList])

  return {
    links,
    socials,
    cards,
    subDetails,
  }
}
