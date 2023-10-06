import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig() || {}

export const { BACKEND_URL, BE_IMAGE_DOMAIN } = publicRuntimeConfig || {}
