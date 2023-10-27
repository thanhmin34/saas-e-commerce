/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['release.thenineten.co', 'media.9ten.cloud', 'media-mid-prod.9ten.cloud'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
