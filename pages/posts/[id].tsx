import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { PostPageLayout } from '../../components/layout'
import { Date } from '../../components/date'
import { Tags } from '../../components/tags'
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

export const getStaticPaths: GetStaticPaths<Params> = async () => {
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

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = await getPostData(params.id)
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

// 分割代入のネスト深すぎるとbuild落ちる...
const PostPage: FunctionComponent<Props> = ({ post }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <PostPageLayout title={`Now Loading...`} router={router}>
        <h1>Now Loading...</h1>
      </PostPageLayout>
    )
  }

  return (
    <PostPageLayout title={post.title} router={router}>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <Tags
          tags={post.tags}
          key={post.id}
          className={layoutStyles.tags}
          tagClassName={layoutStyles.tagPostDetail}
        />
        <div className={utilStyles.lightText}>
          <Date dateStr={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </PostPageLayout>
  )
}

export default PostPage
