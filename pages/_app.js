import Head from 'next/head'
import '../src/index.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>A Young Lady's Illustrated Primer</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}