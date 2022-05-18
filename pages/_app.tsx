import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
