import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getSortedPosts } from '../lib/posts'
import { AboutPageLayout } from '../components/layout'
import { PostLi } from '../components/postLi'
import utilStyles from '../styles/utils.module.css'
import { PostSummary } from '../../types/post'

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
        ? posts.map((post) => <PostLi post={post} key={post.id} />)
        : posts
            .filter((_, index) => index < 5)
            .map((post) => <PostLi post={post} key={post.id} />)}
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
