import '../styles/globals.css'
import 'highlight.js/styles/default.css'  // <pre>タグのbackgroundを装飾
import 'highlight.js/styles/vs2015.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
