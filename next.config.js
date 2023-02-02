/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://HongChaeMin.github.io"
      : "",
  trailingSlash: true // 빌드 시 폴더 구조 그대로 생성하도록
}

module.exports = nextConfig
