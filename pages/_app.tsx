import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'highlight.js/styles/default.css'  // <pre>タグのbackgroundを装飾
import 'highlight.js/styles/vs2015.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
