/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
});

const nextConfig = (phase, { defaultConfig }) => {
  return removeImports({
    reactStrictMode: true,
    assetPrefix:
      process.env.NODE_ENV === "production"
        ? "https://HongChaeMin.github.io"
        : "",
    trailingSlash: true // 빌드 시 폴더 구조 그대로 생성하도록
  });
};

module.exports = nextConfig
