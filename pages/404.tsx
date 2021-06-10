import { FunctionComponent } from 'react'
import Head from 'next/head'
import { ErrorPageLayout, TitleWithSiteTitle } from '../components/layout'

const NotFound: FunctionComponent = () => {
  return (
    <ErrorPageLayout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <TitleWithSiteTitle>Not Found</TitleWithSiteTitle>
      <h1>Not Found</h1>
    </ErrorPageLayout>
  )
}

export default NotFound
