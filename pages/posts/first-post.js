import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/layout"

export default function FirstPost() {
  const $title = 'First Post'

  return (
    <Layout>
      <Head>
        <title>{$title}</title>
      </Head>
      <h1>{$title}</h1>
      <h2>
        <Link href="/">
          Back to home
        </Link>
      </h2>
    </Layout>
  )
}