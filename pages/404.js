import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { ErrorLayout } from '../components/layout'

export default function NotFound() {
  return (
    <ErrorLayout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </ErrorLayout>
  )
}