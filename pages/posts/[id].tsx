import { useRouter } from 'next/router'
import { PostLayout, TitleWithSiteTitle, TagsLayout } from '../../components/layout';
import { Date } from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { markdownToHtml } from '../../lib/markdown'
import utilStyles from '../../styles/utils.module.css'
import layoutStyles from '../../components/layout.module.css'
import type { Post } from '../../lib/post'

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
  const post = await getPostData(params.id)
  if (!post) {
    return {
      notFound: true,  // pages/404.jsを自動で出力
    }
  }

  post.content = await markdownToHtml(post.content)

  return {
    props: {
      post
    },
    revalidate: 1,
  }
}

const PostPage = ({ post: { title, date, tags, id, content } }: Post) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <PostLayout>
        <TitleWithSiteTitle>Now Loading...</TitleWithSiteTitle>
        <h1>Now Loading...</h1>
      </PostLayout>
    )
  }

  return (
    <PostLayout>
      <TitleWithSiteTitle>{title}</TitleWithSiteTitle>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <TagsLayout
          tags={tags}
          key={id}
          className={layoutStyles.tags}
          tagClassName={layoutStyles.tagPostDetail}
        />
        <div className={utilStyles.lightText}>
          <Date dateStr={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </PostLayout>
  )
}

export default PostPage