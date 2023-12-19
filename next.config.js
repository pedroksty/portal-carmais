/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'production.autoforce.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'autoforce-autocommerce.s3.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
