import Head from 'next/head'
import { ErrorLayout, TitleWithSiteTitle } from '../components/layout'

const NotFound = () => {
  return (
    <ErrorLayout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <TitleWithSiteTitle>Not Found</TitleWithSiteTitle>
      <h1>Not Found</h1>
    </ErrorLayout>
  )
}

export default NotFound