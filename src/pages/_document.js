import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="transition-colors bg-white dark:bg-neutral-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
