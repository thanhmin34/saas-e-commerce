/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'release.thenineten.co',
      'media.9ten.cloud',
      'media-mid-prod.9ten.cloud',
      'snaptec-mid-prod.s3.me-south-1.amazonaws.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
