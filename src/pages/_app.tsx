import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>LiveSyntax</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="LiveSyntax: A live code editor for pair programming" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
}
