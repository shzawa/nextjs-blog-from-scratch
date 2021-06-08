import { FunctionComponent } from 'react';
import Head from 'next/head'
import { ErrorLayout, TitleWithSiteTitle } from '../../components/layout'

const NotFound: FunctionComponent = () => {
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
