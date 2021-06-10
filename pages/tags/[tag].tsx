import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import {
  HomeLayout,
  TagsLayout,
  TitleWithSiteTitle,
} from '../../components/layout'
import { Date } from '../../components/date'
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

export const getStaticPaths: GetStaticPaths = async () => {
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
  params: { tag },
}) => {
  const posts = getSortedPostsByTag(tag)

  if (!posts.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts,
      tag,
    },
    revalidate: 5,
  }
}

const TagsPageTitle: FunctionComponent<{ tag: string }> = ({ tag }) => (
  <TitleWithSiteTitle>{tag}タグで絞り込み</TitleWithSiteTitle>
)

const TagListPage: FunctionComponent<Props> = ({ posts, tag }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <HomeLayout>
        <TagsPageTitle tag={tag} />
        <section className={utilStyles.headingMd}>
          <p>ども</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Articles - Filter by {tag}</h2>
          Now Loading...
        </section>
      </HomeLayout>
    )
  }

  // 戻るページほしいっす
  return (
    <HomeLayout>
      <TagsPageTitle tag={tag} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Articles - Filter by {tag}</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <TagsLayout
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
    </HomeLayout>
  )
}

export default TagListPage
