import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { TagPageLayout } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsByTag, getUniqueAllTags } from '../../lib/posts'
import { PostSummary } from '../../types/post'
import { PostLi } from '../../components/postLi'

interface Props {
  posts: PostSummary[]
  tag: string
}

interface Params extends ParsedUrlQuery {
  tag: string
}

const setTitle = (tag: string) => `${tag} - タグで絞り込み`
const setHeadline = (tag: string) => `Posts - Filter by “${tag}”`

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = getUniqueAllTags()
  return {
    paths: tags.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const posts = getSortedPostsByTag(params.tag)

  if (!posts.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts,
      tag: params.tag,
    },
    revalidate: 1,
  }
}

const TagListPage: FunctionComponent<Props> = ({ posts, tag }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <TagPageLayout title={setTitle(tag)}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>{setHeadline(tag)}</h2>
          Now Loading...
        </section>
      </TagPageLayout>
    )
  }

  return (
    <TagPageLayout title={setTitle(tag)}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{setHeadline(tag)}</h2>
        <ul className={utilStyles.list}>
          {posts.map((post) => (
            <PostLi post={post} key={post.id} />
          ))}
        </ul>
      </section>
    </TagPageLayout>
  )
}

export default TagListPage
