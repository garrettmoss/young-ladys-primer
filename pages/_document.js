import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="description" content="An interactive educational primer inspired by Neal Stephenson's Diamond Age" />
        <meta name="theme-color" content="#f9f6f0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}