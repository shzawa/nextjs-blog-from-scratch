import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { HomeLayout, siteTitle, TagsLayout } from '../components/layout'
import { Date } from '../components/date'
import utilStyles from '../styles/utils.module.css'
import layoutStyles from '../components/layout.module.css'
import { getSortedPostsData } from '../lib/posts'
import type { Posts } from '../lib/post';

export const getStaticProps: GetStaticProps =
  async (): Promise<GetStaticPropsResult<Posts>> => {
    const posts = getSortedPostsData()
    return {
      props: {
        posts
      }
    }
}

const HomePage = ({ posts }: Posts) => (
  <HomeLayout>
    <Head>
      <title>{siteTitle}</title>
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
      <h2 className={utilStyles.headingLg}>Blog</h2>
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

export default HomePage