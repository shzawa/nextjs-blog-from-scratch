import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { siteTitle, HomeLayout, TagsLayout } from '../../components/layout';
import { Date } from '../../components/date';
import layoutStyles from '../../components/layout.module.css';
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsByTag, getUniqueAllTags } from '../../lib/posts';
import { PostSummary } from '../../types/post';

interface Props {
  posts: PostSummary[],
  tag: string
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export const getStaticPaths = async () => {
  const paths = getUniqueAllTags()
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params: { tag } }) => {
  const posts = getSortedPostsByTag(tag)

  // FIXME: 404ページに飛ばない & 404ページをこのページ用に別途用意したい
  if (!posts) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      posts,
      tag
    },
    revalidate: 5,
  }
}

const TagListPage = ({ posts, tag }: Props) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <HomeLayout>
        <Head>
          <title>{tag}タグで絞り込み - {siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>
            ども
          </p>
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

  return (
    <HomeLayout>
      <Head>
        <title>{tag}タグで絞り込み - {siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          ども
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Articles - Filter by {tag}</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
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