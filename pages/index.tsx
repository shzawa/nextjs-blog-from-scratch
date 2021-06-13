import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { AboutPageLayout } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPosts } from '../lib/posts'
import { Date } from '../components/date'
import { PostSummary } from '../types/post'
import { Tags } from '../components/tags'
import layoutStyles from '../components/layout.module.css'

interface Props {
  posts: PostSummary[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getSortedPosts()
  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

const AboutPage: FunctionComponent<Props> = ({ posts }) => {
  const PostsComponent = (
    <ul className={utilStyles.list}>
      {posts.length <= 5
        ? posts.map(({ id, date, title, tags }) => (
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
          ))
        : posts
            .filter((_, index) => index < 5)
            .map(({ id, date, title, tags }) => (
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
      {posts.length > 5 ? (
        <small>
          …or you can find more in the{' '}
          <Link href="/posts">
            <a>posts</a>
          </Link>
          .
        </small>
      ) : (
        <></> // FIXME: これいらんくない?
      )}
    </ul>
  )

  return (
    <AboutPageLayout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recent Posts</h2>
        {PostsComponent}
      </section>
    </AboutPageLayout>
  )
}

export default AboutPage
