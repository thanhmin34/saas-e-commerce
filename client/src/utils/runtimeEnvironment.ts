import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig() || {}
const { BACKEND_URL, BE_IMAGE_DOMAIN, HOST } = serverRuntimeConfig || {}

export { BACKEND_URL, BE_IMAGE_DOMAIN, HOST }
