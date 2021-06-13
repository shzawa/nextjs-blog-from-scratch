import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PostsPageLayout } from '../components/layout'
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
    revalidate: 1,
  }
}

const PostsPage: FunctionComponent<Props> = ({ posts }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <PostsPageLayout>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Articles</h2>
          Now Loading...
        </section>
      </PostsPageLayout>
    )
  }

  return (
    <PostsPageLayout>
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
    </PostsPageLayout>
  )
}

export default PostsPage
