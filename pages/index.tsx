import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { HomePageLayout, siteTitle } from '../components/layout'
import { Date } from '../components/date'
import { Tags } from '../components/tags'
import layoutStyles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { getSortedPosts } from '../lib/posts'
import { PostSummary } from '../types/post'

interface Props {
  posts: PostSummary[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getSortedPosts()
  return {
    props: {
      posts,
    },
  }
}

const HomePage: FunctionComponent<Props> = ({ posts }) => (
  <HomePageLayout>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Articles</h2>
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
  </HomePageLayout>
)

export default HomePage
