import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateStr={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

// 動的ルーティング対応(ルーティングを受け付けるページの[id]リストを生成)
export async function getStaticPaths() {
  // idとしてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// 静的データの生成
export async function getStaticProps({ params }) {
  // params.idを使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}