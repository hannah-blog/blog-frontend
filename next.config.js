/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
});

const nextConfig = (phase, { defaultConfig }) => {
  return removeImports({
    reactStrictMode: true,
    trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
    output: 'standalone',
    compiler: {
      styledComponents: true,
    }
  });
};

// const nextConfig = {
//   compiler: {
//     styledComponents: true,
//   },
// };

module.exports = nextConfig
