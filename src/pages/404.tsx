import { FunctionComponent } from 'react'
import Head from 'next/head'
import { ErrorPageLayout } from '../components/layouts/Template'

const NotFound: FunctionComponent = () => {
  return (
    <ErrorPageLayout title={`Not Found`}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Not Found</h1>
    </ErrorPageLayout>
  )
}

export default NotFound
