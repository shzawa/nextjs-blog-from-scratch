import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
  PostPageLayout,
  TitleWithSiteTitle,
  TagsLayout,
} from '../../components/layout'
import { Date } from '../../components/date'
import layoutStyles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import { markdownToHtml } from '../../lib/markdown'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { PostDetail } from '../../types/post'

interface Props {
  post: PostDetail
}

interface Params extends ParsedUrlQuery {
  id: string
}

// 動的ルーティング対応(ルーティングを受け付けるページの[id]リストを生成)
export const getStaticPaths: GetStaticPaths = async () => {
  // idとしてとりうる値のリストを返す
  const postIds = getAllPostIds()
  return {
    paths: postIds.map((postId) => ({
      params: {
        id: postId,
      },
    })),
    fallback: true,
  }
}

// 静的データの生成
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params: { id },
}) => {
  // params.idを使用して、ブログの投稿に必要なデータを取得する
  const post = await getPostData(id)
  if (!post) {
    return {
      notFound: true, // pages/404.jsを自動で出力
    }
  }

  post.content = await markdownToHtml(post.content)

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}

const PostPage: FunctionComponent<Props> = ({
  post: { title, date, tags, id, content },
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <PostPageLayout>
        <TitleWithSiteTitle>Now Loading...</TitleWithSiteTitle>
        <h1>Now Loading...</h1>
      </PostPageLayout>
    )
  }

  return (
    <PostPageLayout>
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
    </PostPageLayout>
  )
}

export default PostPage
