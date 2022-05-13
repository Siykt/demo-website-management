// import '../styles/bootstrap.min.css'
// import '../styles/globals.scss'
import 'antd/dist/antd.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '../layout/default'

type NextPageWithLayout = NextPage & {
  hideLayout?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      {Component.hideLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}
