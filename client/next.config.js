/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
    BE_IMAGE_DOMAIN: process.env.BE_IMAGE_DOMAIN,
  },
}

module.exports = nextConfig
