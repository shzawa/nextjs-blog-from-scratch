import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'highlight.js/styles/default.css' // <pre>タグのbackgroundを装飾
import 'highlight.js/styles/vs2015.css'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
