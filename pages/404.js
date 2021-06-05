import Head from 'next/head'
import Layout from '../components/layout'
import DefaultErrorPage from 'next/error'

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </Layout>
  )
}