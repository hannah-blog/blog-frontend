/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'velog.velcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hannah-log.site',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig
