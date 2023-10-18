/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
    BE_IMAGE_DOMAIN: process.env.BE_IMAGE_DOMAIN,
    HOST: process.env.HOST,
  },
  images: {
    domains: ['release.thenineten.co', 'media.9ten.cloud', 'media-mid-prod.9ten.cloud'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
