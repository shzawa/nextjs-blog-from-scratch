import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { TagPageLayout } from '../../components/layout'
import { Date } from '../../components/date'
import { Tags } from '../../components/tags'
import layoutStyles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsByTag, getUniqueAllTags } from '../../lib/posts'
import { PostSummary } from '../../types/post'

interface Props {
  posts: PostSummary[]
  tag: string
}

interface Params extends ParsedUrlQuery {
  tag: string
}

const setTitle = (title: string) => `${title} - タグで絞り込み`

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
          <h2 className={utilStyles.headingLg}>
            Posts - Filter by {`“`}
            {tag}
            {`”`}
          </h2>
          Now Loading...
        </section>
      </TagPageLayout>
    )
  }

  return (
    <TagPageLayout title={setTitle(tag)}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Posts - Filter by {`“`}
          {tag}
          {`”`}
        </h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <Tags
                tags={tags}
                key={id}
                className={layoutStyles.tags}
                tagClassName={layoutStyles.tagPostSummary}
              />
              <small className={utilStyles.lightText}>
                <Date dateStr={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </TagPageLayout>
  )
}

export default TagListPage
