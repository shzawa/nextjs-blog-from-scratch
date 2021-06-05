import Head from 'next/head'
import { useRouter } from 'next/router'
import { PostLayout } from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Now Loading...</h1>
  }

  return (
    <PostLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateStr={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </PostLayout>
  )
}

// 動的ルーティング対応(ルーティングを受け付けるページの[id]リストを生成)
export async function getStaticPaths() {
  // idとしてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

// 静的データの生成
export async function getStaticProps({ params }) {
  // params.idを使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)
  if (!postData) {
    return {
      notFound: true,  // pages/404.jsを自動で出力
    }
  }

  return {
    props: {
      postData
    },
    revalidate: 1,
  }
}