import { Html, Head, Main, NextScript } from 'next/document'
import StyledComponentsRegistry from "../lib/registry";

export default function Document() {
  return (
    <Html lang="en" data-color-mode="light">
      <Head />
      <body>
      <StyledComponentsRegistry>
        <Main />
      </StyledComponentsRegistry>
      <NextScript />
      </body>
    </Html>
  )
}
