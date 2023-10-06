/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
    BE_IMAGE_DOMAIN: process.env.BE_IMAGE_DOMAIN,
  },
  images: {
    domains: ['release.thenineten.co'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
